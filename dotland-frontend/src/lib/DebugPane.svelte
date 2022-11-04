<script lang="ts">
	import debugMessages from './DebugVariables'
	export let visible = true
</script>

<div class="debug_pane" style:display={visible ? "inline-block" : "none"}>
	<div id="debug_messages">
		{#each Object.keys($debugMessages) as msg}
			<div class="debug_message_item"> {msg} : {$debugMessages[msg]} </div>
		{/each}
	</div>
	<button class="debug_close_button" on:click={() => visible = false}>close</button>
</div>

<style>
	.debug_pane {
		font-family: monospace;
		font-size: 12px;
		min-width: 200px;
		min-height: 100px;
		position: fixed;
		left: 0;
		top: 0;
		background: #505050;
		color: white;
		opacity: 70%;
	}

	.debug_message_item:nth-child(2n) {
		background: #727272;
	}

	.debug_close_button {
		position: absolute;
		right: 2px;
		bottom: 2px;
	}
</style>