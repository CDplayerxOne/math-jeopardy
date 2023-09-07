<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let title: string;
	export let open: boolean;
	const dispatch = createEventDispatcher();

	function toggleOpen() {
		dispatch('message');
	}
</script>

<div class={`modal ${open && 'is-active'}`}>
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{title}</p>
			<button class="delete" aria-label="close" on:click={toggleOpen} />
		</header>
		<section class="modal-card-body">
			<!-- Content ... -->
			<p>What is the answer?</p>
		</section>
		<footer class="modal-card-foot">
			<button class="button is-success" on:click={toggleOpen}>Submit</button>
		</footer>
	</div>
</div>
