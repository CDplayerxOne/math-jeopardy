<script lang="ts">
	import Modal from './Modal.svelte';
	import './app.css';

	let items: string[] = [
		'Functions',
		'Polynomials',
		'Rationals',
		'Exponential and Logs',
		'Trigonometry',
		'Other'
	];

	let buttons: number[] = [];
	[100, 200, 300, 400, 500].forEach((number) => {
		for (let i = 0; i < 6; i++) {
			buttons.push(number);
		}
	});

	export let title: string = '';
	export let open: boolean = false;

	function toggleOpen(head: number) {
		title = head.toString();
		open = !open;
	}

	function close() {
		open = false;
	}
</script>

<svelte:head>
	<title>Play</title>
	<meta name="description" content="math jeopardy" />
</svelte:head>

<div class="bg-blue-100">
	<div class="grid container">
		{#each items as item}
			<div class="item box is-link bg-blue-200 font-bold">
				<p>{item}</p>
			</div>
		{/each}

		{#each buttons as button}
			<button class="item box is-link bg-blue-200" on:click={() => toggleOpen(button)}
				>${button}</button
			>
		{/each}
		<div />
	</div>
</div>

<Modal {title} {open} on:message={close} />

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-template-rows: repeat(6, 1fr);
		min-height: 100vh;
	}

	.item {
		display: flex;
		margin: 1em;
		justify-content: center;
		align-items: center;
	}
</style>
