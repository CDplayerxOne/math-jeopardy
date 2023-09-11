<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Katex from 'svelte-katex';

	export let title: string;
	export let question: string;
	export let open: boolean;
	export let answer: string | string[] | number[];
	export let answerImage: string | undefined;
	export let math: string | undefined;
	export let image: string | undefined;
	export let effects: number | undefined;
	export let teams: any;
	export let turn: any;
	export let id: number;
	const dispatch = createEventDispatcher();

	let showAnswer = false;
	let showSteal = false;
	let isActive = false;
	let hasStolen = false;
	let solved: any = [false, null];

	let steal: any = null;

	function toggleOpen() {
		showAnswer = false;
		showSteal = false;
		hasStolen = false;
		steal = null;
		isActive = false;
		dispatch('message');
	}

	function clicked() {
		showAnswer = false;
		showSteal = false;
		hasStolen = false;
		steal = null;
		isActive = false;
		dispatch('finished', {
			solved: solved[0],
			scorer: solved[1],
			problem: id
		});
		dispatch('message');
		solved = [false, null];
	}
</script>

<div class={`modal ${open && 'is-active'}`}>
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{title}</p>
			<button class="delete" aria-label="close" on:click={toggleOpen} />
		</header>
		<section class="modal-card-body overflow-visible">
			<!-- Content ... -->
			{#if !showAnswer}
				{#if effects === 3}
					<p class="font-bold text-2xl mb-2 text-orange-500">Double Points!!!</p>
				{/if}
				<p class="font-bold text-xl">When You have an Answer, Check if it is Correct With Chang</p>
				<p>{question}</p>
				{#if math}
					<Katex>{math}</Katex>
				{/if}
				{#if image}
					<a href={image} target="_blank">
						<img src={image} alt={question} />
					</a>
				{/if}
			{/if}
			{#if showAnswer && !showSteal}
				<p>Answer:</p>
				{#if typeof answer === 'string' && answer.length > 0}
					<p>{answer}</p>
				{:else if typeof answer != 'string' && answer.length > 0}
					{#each answer as ans}
						<div>
							<Katex>{ans}</Katex>
						</div>
					{/each}
				{/if}
				{#if answerImage}
					<a href={answerImage} target="_blank"><img src={answerImage} alt="answer" /></a>
				{/if}
			{/if}
			{#if showSteal && !showAnswer}
				<h1 class="text-xl font-bold mb-2">Steal!</h1>
				<div class={`dropdown ${isActive && 'is-active'}`}>
					<div class="dropdown-trigger">
						<button
							class="button"
							aria-haspopup="true"
							aria-controls="dropdown-menu"
							on:click={() => {
								isActive = !isActive;
							}}
						>
							<span>{steal ? steal.name : 'Choose Team'}</span>
						</button>
					</div>
					<div class="dropdown-menu" id="dropdown-menu" role="menu">
						<div class="dropdown-content">
							{#if teams.length > 0}
								{#each teams as team}
									{#if team.id != turn}
										<button
											class="dropdown-item"
											on:click={() => {
												steal = team;
											}}
										>
											{team.name}
										</button>
									{/if}
								{/each}
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</section>
		<footer class="modal-card-foot">
			{#if !showAnswer}
				<button
					class="button is-success"
					on:click={() => {
						showAnswer = true;
						showSteal = false;
						solved[0] = true;
						if (hasStolen && steal) {
							solved[1] = steal.id;
						}
					}}>Correct</button
				>
				<div class="flex-grow" />
				<button
					class="button is-danger"
					on:click={() => {
						if (hasStolen) {
							showSteal = false;
							showAnswer = true;
							solved[1] = null;
						} else {
							showSteal = true;
							hasStolen = true;
						}
					}}>Incorrect</button
				>
			{:else}
				<button class="is-info button" on:click={clicked}>Finish</button>
			{/if}
		</footer>
	</div>
</div>
