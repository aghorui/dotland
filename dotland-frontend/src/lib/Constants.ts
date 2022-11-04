/**
 * This file is meant to hold all the versioning constants that:
 * 1. Define the version of the client code (CLIENT_VERSION)
 * 2. Define a compatible API Version. (API_VERSION)
 */

export default {

	API_VERSION_MAJOR: "0",
	API_VERSION_MINOR: "1",
	API_VERSION_PATCH: "0",

	CLIENT_VERSION_MAJOR: "0",
	CLIENT_VERSION_MINOR: "1",
	CLIENT_VERSION_PATCH: "0",

	/**
	 * The distance that the camera covers in 1 unit.
	 */
	CAMERA_UNIT_INCREMENT_LENGTH: 10,

	/**
	 * Duration of the position change animation.
	 */
	CAMERA_TRANSITION_DURATION_MS: 200,
	PLAYER_TRANSITION_DURATION_MS: 200,

	/**
	 * Distance between the dots of the grid
	 */
	GRID_UNIT_SEPARATION_LENGTH: 200,

	GRID_CELL_SIZE_PX: 100

} as const;

