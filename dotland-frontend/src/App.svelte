<script lang="ts">
	import DebugPane from './lib/DebugPane.svelte';
	import Hud from './lib/Hud.svelte'
	import Viewport from './lib/Viewport.svelte';

	let debugVisible = false

	function handleKeypress(e: KeyboardEvent): void {
		switch (e.code) {
			case 'Backquote':
				console.log("Opening debug window")
				debugVisible = true
				break;
		}
	}
</script>

<main>
	<DebugPane bind:visible={debugVisible}/>
	<Viewport />
	<Hud />
</main>

<svelte:window on:keydown={handleKeypress} />