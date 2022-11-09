import { tweened } from 'svelte/motion'
import Constants from './Constants.js'


/**
 * Generic Vector class for returning vectors to the user. Probably will go
 * unused
 */
export class Vec {
	x: number = 0;
	y: number = 0;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
};


/**
 * The standard error class for the client.
 */
export class DLError extends Error {
	message: string = '';

	constructor(message: string) {
		super(message);
		this.message = message;
		/* !important Add code to send remote error notification */
	}
}

/**
 * Unexported storage class for singleton.
 */
var _gameinfo = {

}


/**
 * Stores the metadata about the game itself. This is useful for things like
 * checking the server version and compatibility. In general, we expect the game
 * to not break with previous versions and maybe keep a local compatible
 * version list or something. Ideally, client.version === server.version.
 *
 * This class acts like a singleton along with the unexported _gameinfo
 * dictionary.
 */

export class Game {
	static isCompatibleWith(serverVersion: string): boolean {
		let vals: string = serverVersion.split(".");
	}
}

/**
 * An item from the item database. The client will have a list of predefined
 * objects as a database (or maybe download it from the server if we want to
 * make it extensible without bumping version numbers. Is that really good for
 * management?)
 */
export class Item {
	id: number = -1;
	name: string = "";
	stackable: boolean = false;
	maxCapacity?: number;
};


/**
 * An item that is actually in the world. It contains a reference to an item and
 * a count that may or may not be null depending on whether the item is stackab
 * -le or not.
 */
export class ItemInstance {
	ref: Item = null;
	count?: number = 1;
}

/**
 * The player inventory. Contains the item list of the playe and the number of
 * items the player can hold.
 */
export class PlayerInventory {
	items: ItemInstance[];
	itemsMaxCapacity: number;
};

/**
 * The player. Contains current position, health and the inventory.
 */
export class Player {
	x: number = 0;
	y: number = 0;
	health: number = 100;
	inventory: PlayerInventory;
};

/**
 * The viewport camera. Contains currently only the position
 */
export class Camera {
	x: number = 0;
	y: number = 0;
	zoom: number = 1;
};



/**
 * The type of the cell based on the cell database. Similar to Item, the client
 * will have a list of predefined cells.
 */
export class CellType {
	debugName: string;
	drawId: string;
}


/**
 * An instance of a cell. Contains a reference to Celltype. This should also
 * contain a reference to the appropriate SVG element.
 */
export class Cell {
	type: CellType;
};

/**
 * The grid that we put the player on. Contains an array of cells to do stuff
 * in.
 */
export class Map {
	data: Cell[];
	width: number;
	height: number;

	/**
	 * Gets the requested cell. throws an exception if out of bounds
	 */
	get(x: number, y: number): Cell {
		if (x < 0 || y < 0 || x > (this.width - 1) || y > (this.height - 1)) {
			throw new DLError(`BUG: required coordinates are out of bounds (${x}, ${y}).`);
		}
		return data[x * this.width + this.height];
	}

	/**
	 * Reports if the requested Cell is valid or not.
	 */
	isValidPos(x: number, y: number): bool {
		if (x < 0 || y < 0 || x > (this.width - 1) || y > (this.height - 1)) {
			return false;
		}
		return true;
	}

	/**
	 * Reports if the requested Cell is a free cell or not, that is, if the
	 * player can put itself into that cell. This does bounds checking as
	 * well.
	 */
	isFree(x: number, y: number): bool {
		if (x < 0 || y < 0 || x > (this.width - 1) || y > (this.height - 1)) {
			return false;
		}

		// TODO add condition here to check for obstructions.
		if (this.get(x,y) !== undefined) {
			return false;
		}

		return true;
	}

	constructor(width: number = 20, height: number = 50) {
		// The array is populated using the Array constructor currently. This
		// provides us with an array with blank items. It might be a better
		// idea to use some sort of sparse matrix-aware implementation but let's
		// just get the the thing going for now.
		// We will use undefined for representing an empty cell.
		this.data = Array(width * height);
		this.width = width;
		this.height = height;
	}
};

/**
 * The main object that the client will write to.
 */
export class ClientGameState {
	gameInfo: Game = new Game();
	player: Player = new Player();
	camera: Camera = new Camera();
	map: Map = new Map();

	constructor() {

	}
};


/**
 * GENERAL IDEA FOR THE NETCODE
 * ============================
 *
 *                              Sends Update
 *           +---Client---+  ----------------->  +---Server---+
 *           |Client State|                      |Server State|
 *           |            |  <-----------------  +------------+
 *           |Client View |     Sends back           |    ^
 *           +------------+     canonical state      |    |
 *              |    ^                               |    |
 *              |    |                               |    |
 *              +----+                               +----+
 *     Updates Client view/state          Updates server state based on
 *     based on player input and when     player input command, and then
 *     canonical state is received        broadcasts resulting state to
 *                                        all parties.
 *
 * We consider the state that is stored on the server as the canonical version
 * of the current game state. We send updates to the server in the form of
 * commands. We update the client's state independently of the serve. Then when
 * we receive the server state, and the two do not match, we change the client's
 * state to match the server's.
 *
 * This somewhat imitates what Minetest does with SAOs and CAOs, at least from
 * what I understood and experienced.
 *
 * Modern, fast paced and detailed network games such as FPSes and MMORPGs need
 * to make the compromise between latency, peformance and inconsistent network
 * state (that can lead to exploits, and in turn cheating).
 *
 * Dotland's scope of gameplay, graphics and responsivenes is kept simple, and
 * therefore it shouldn't be much of a problem if we try to optimise for a
 * consistent network game state.
 *
 * Minetest seems to perform quite poorly on a bad network connection. For
 * example, Moving around items in inventory is kept on hold till the server
 * state is updated. Blocks disappear, reappear for a moment and then disappear
 * again when the client syncs with the server state and so on. In Dotland
 * however, I don't think this should be a problem because of low network
 * overhead.
 *
 * We will keep a local "delta" of changes that we will sync with the server
 * response as a sparse table.
 *
 */