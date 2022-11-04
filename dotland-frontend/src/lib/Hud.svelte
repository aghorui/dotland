<script type="ts">
	export let dots: number = 0;
</script>

<div class="hud-container">
	<div class="hud">
		<button class="hud-button"> Chat <span class="hotkey-hint">c</span> </button>
		<button class="hud-button"> Bag <span class="hotkey-hint">b</span> </button>
		<button class="hud-button"> Help <span class="hotkey-hint">h</span> </button>
		<button class="hud-button"> Settings <span class="hotkey-hint">s</span> </button>
		<div class="hud-counter"> Dots: {dots} </div>
	</div>
</div>

<style>
	.hud {
		width: 50%;
		margin-left: auto;
		margin-right: auto;
		background-color: #AEC9FF;
		box-sizing:  border-box;
		border-top: 1px solid #85ADFF;
		border-right: 1px solid #85ADFF;
		border-left: 1px solid #85ADFF;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
		min-height: 5vh;
		padding: 10px;
		user-select: none;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		box-shadow: 0px 3px 8px 4px rgba(0, 0, 0, 0.2);
	}

	.hud-container {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.hud-button {
		background: #B7CFFF;
		border: 1px solid #095C9C;
		border-radius: 3px;
		padding: 10px;
		margin: 10px;
		box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: 0.2s;
	}

	.hud-button:hover {
		background: #CFDFFF;
		box-shadow: 0px 2px 6px 3px rgba(0, 0, 0, 0.2);
	}

	.hud-button:active {
		background: #6196FF;
		box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
		transition: 0.05s;
	}

	.hotkey-hint {
		background-color: #004580;
		font-weight: bold;
		vertical-align: middle;
		border-radius: 2px;
		color: #EEEEEE;
		padding-right: 4px;
		padding-left: 4px;
		margin-left: 2px;
		margin-right: 2px;
	}
</style>