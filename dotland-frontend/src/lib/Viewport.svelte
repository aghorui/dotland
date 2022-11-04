<script lang="ts">
	import debugMessages from './DebugVariables'
	import { tweened } from 'svelte/motion';
	import { quadOut } from 'svelte/easing';
	import Constants from './Constants';
	import { ClientGameState } from './Types';


	let cam_x = tweened(0, { duration: Constants.CAMERA_TRANSITION_DURATION_MS, easing: quadOut });
	let cam_y = tweened(0, { duration: Constants.CAMERA_TRANSITION_DURATION_MS, easing: quadOut });
	let cam_zoom = tweened(1, { duration: Constants.CAMERA_TRANSITION_DURATION_MS, easing: quadOut });

	let update_lock: boolean = false
	let player_x = tweened(50, { duration: Constants.PLAYER_TRANSITION_DURATION_MS, easing: quadOut });
	let player_y = tweened(50, { duration: Constants.PLAYER_TRANSITION_DURATION_MS, easing: quadOut });
	let player_fill = "transparent"


	// TODO: Update position only based as a function of player position
	// TODO: Make this Global
	var gs: ClientGameState = new ClientGameState();


	$: $debugMessages["player"] = [gs.player.x, gs.player.y]
	$: $debugMessages["cam"] = [gs.camera.x, gs.camera.y]

	function player2vis(c: number): number {
		return  50 + c * 100;
	}

	function cam2vis(c: number): number {
		return  c * 100;
	}

	// TEST BASIC WEBSOCKETS FIRST
	function handleKeypress(e: KeyboardEvent): void {
		console.log("Pressed " + e.key + " " + e.code);
		if (player_fill === "transparent") {
			player_fill = "green";
		}

		if (update_lock) {
			return;
		}

		switch (e.code) {
			case 'ArrowUp':
				gs.player.y -= 1;
				$player_y = player2vis(gs.player.y);
				break;
			case 'ArrowRight':
				gs.player.x += 1;
				$player_x = player2vis(gs.player.x);
				break;
			case 'ArrowDown':
				gs.player.y += 1;
				$player_y = player2vis(gs.player.y);
				break;
			case 'ArrowLeft':
				gs.player.x -= 1;
				$player_x = player2vis(gs.player.x);
				break;
			case 'KeyW':
				gs.camera.y += 1;
				$cam_y = cam2vis(gs.camera.y);
				break;
			case 'KeyS':
				gs.camera.y -= 1;
				$cam_y = cam2vis(gs.camera.y);
				break;
			case 'KeyA':
				gs.camera.x += 1;
				$cam_x = cam2vis(gs.camera.x);
				break;
			case 'KeyD':
				gs.camera.x -= 1;
				$cam_x = cam2vis(gs.camera.x);
				break;
			case 'Equal':
			case 'NumpadAdd':
				gs.camera.zoom += 0.15;
				$cam_zoom = gs.camera.zoom;
				break;
			case 'Minus':
			case 'NumpadSubtract':
				gs.camera.zoom -= 0.15;
				$cam_zoom = gs.camera.zoom;
				break;
		}
	}

	console.log(gs.map.width, Constants.GRID_CELL_SIZE_PX)
</script>

<div class="viewport">
	<svg xmlns="http://www.w3.org/2000/svg" id="svg-main-view">
		<defs>
			<pattern id="svg-bgtile" viewBox="0,0,100,100" width={Constants.GRID_CELL_SIZE_PX} height={Constants.GRID_CELL_SIZE_PX} patternUnits="userSpaceOnUse">
				<rect x="0" y="0" width="100" height="100" fill="#E5EEFA" />
				<circle cx="50" cy="50" r="10" fill="black" />
				<line x1="0" y1="50" x2="100" y2="50" stroke="#00000020" />
				<line x1="50" y1="0" x2="50" y2="100" stroke="#00000020" />
			</pattern>
		</defs>

		<g id="svg-root-view" transform="translate({$cam_x}, {$cam_y}),scale({$cam_zoom})">
			<rect
				id="svg-ground"
				x="0" y="0"
				width={gs.map.width * Constants.GRID_CELL_SIZE_PX}
				height={gs.map.height * Constants.GRID_CELL_SIZE_PX}
				fill="url(#svg-bgtile)" rx="10" ry="10"
			/>

			<circle id="svg-player" cx={$player_x} cy={$player_y} r="40" fill={player_fill} />

			<g id="svg-objects">

			</g>
		</g>
	</svg>

</div>

<style>
	.viewport {
		height: 100vh;
		width: 100vw;
		background-color: #005CB3;
	}

	#svg-main-view {
		width: 100%;
		height: 100%;
		margin: 0;
		border: 1px solid black;
		box-sizing:  border-box;
	}

	#svg-ground {
		filter: drop-shadow(0 0 20px rgb(0 0 0 / 0.6));
	}

	#svg-player {
		filter: drop-shadow(0 0 5px rgb(0 0 0 / 0.6));
	}

</style>

<svelte:window on:keydown={handleKeypress} />