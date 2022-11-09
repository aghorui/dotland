<script lang="ts">
	import DebugPane from './lib/DebugPane.svelte';
	import Hud from './lib/Hud.svelte'
	import Viewport from './lib/Viewport.svelte';

	let debugVisible = false
	let gridVisible = false

	function handleKeypress(e: KeyboardEvent): void {
		switch (e.code) {
			case 'Backquote':
				console.log("Toggling debug window")
				debugVisible = !debugVisible
				break;

			case 'Digit1':
				console.log("Toggling grid")
				gridVisible = !gridVisible
		}
	}
</script>

<main>
	<DebugPane bind:visible={debugVisible}/>
	<Viewport bind:debugGridVisible={gridVisible}/>
	<Hud />
</main>

<svelte:window on:keydown={handleKeypress} />