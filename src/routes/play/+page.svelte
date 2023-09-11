<script lang="ts">
	import Modal from './Modal.svelte';
	import '../app.css';

	export let data;

	let items: category[] = [
		'Functions',
		'Polynomials',
		'Rationals',
		'Exponential and Logs',
		'Trigonometry'
	];

	let buttons: questionType[] = [];
	console.log(data.response.questions);
	data.response.questions.forEach((button: any) => {
		buttons.push({ ...button, effects: Math.ceil(Math.random() * 3) });
	});

	type category =
		| 'Functions'
		| 'Polynomials'
		| 'Rationals'
		| 'Exponential and Logs'
		| 'Trigonometry';

	type teamsType = {
		id: number;
		name: string;
		points: number;
	};

	let teams: teamsType[] = [];

	interface ModalProps {
		id: number;
		title: string;
		open: boolean;
		question: string;
		math?: string;
		image?: string;
		effects?: number;
		answer: string | string[] | number[];
		answerImage?: string;
		completed?: boolean;
	}
	type questionType = {
		id: number;
		category: category;
		question: string;
		math?: string;
		image?: string;
		value: number;
		// 1 = Double Points, 2 = Gamble, 3 = Steal
		effects?: number;
		answer: string | string[] | number[];
		answerImage?: string;
		completed: boolean;
	};

	let ModalValues: ModalProps = {
		id: 0,
		title: '',
		question: '',
		answer: [],
		answerImage: '',
		math: '',
		effects: 1,
		image: undefined,
		open: false,
		completed: false
	};
	let hasStarted: boolean = false;
	let hasEnded: boolean = false;
	let value: string = '';
	let turn: number = 0;
	let isActive: boolean = false;
	let { title, question, answer, math, image, answerImage, open, completed, id, effects } =
		ModalValues;

	function toggleOpen(
		head: string,
		q: string,
		a: string | string[] | number[],
		m: string | undefined,
		i: string | undefined,
		ai: string | undefined,
		c: boolean,
		n: number,
		e: number | undefined
	) {
		title = head;
		question = q;
		answer = a;
		math = m;
		image = i;
		open = !open;
		answerImage = ai;
		completed = c;
		id = n;
		effects = e;
	}

	function close() {
		open = false;
	}

	function onFinished(e: any) {
		if (e.detail.solved) {
			if (e.detail.scorer) {
				teams[e.detail.scorer].points += buttons[e.detail.problem].value;
			} else {
				teams[turn].points += buttons[e.detail.problem].value;
			}
		}
		buttons[e.detail.problem].completed = true;
		if (turn === teams.length - 1) {
			turn = 0;
		} else {
			turn++;
		}
	}

	async function onAdd(e: any) {
		if (e.key === 'Enter' && value.length > 0) {
			teams = [...teams, { id: teams.length, name: value, points: 0 }];
			value = '';
		}
	}
</script>

<svelte:head>
	<title>Play</title>
	<meta name="description" content="math jeopardy" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
		integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="bg-blue-100">
	{#if !hasStarted && !hasEnded}
		<div class="min-h-screen container flex justify-center pt-8">
			<div>
				<div class="mb-8">
					<h1 class="title">Teams</h1>
					<p>
						First, we need to make teams. You can add teams below by entering the each team name
					</p>
				</div>
				<div class="mb-8 px-8">
					<ul class="list-disc">
						{#each teams as team}
							<li>{team.name}</li>
						{/each}
					</ul>
				</div>
				<div class="flex items-center">
					<div>
						<h3 class="subtitle">Team Name</h3>
					</div>
					<input type="text" class="p-2 mx-8 rounded-md" bind:value on:keydown={onAdd} />
					<button
						class="button is-success"
						on:click={() => {
							teams = [...teams, { id: teams.length, name: value, points: 0 }];
							value = '';
						}}>Add Team</button
					>
				</div>
				<button
					class="button is-info mt-8"
					on:click={() => {
						if (teams.length > 1) {
							hasStarted = true;
						}
					}}>Start Game!</button
				>
			</div>
		</div>
	{/if}

	{#if hasStarted && !hasEnded}
		<div class="grid container">
			{#each items as item}
				<div class="item box is-link bg-blue-200 font-bold">
					<p>{item}</p>
				</div>
			{/each}

			{#each buttons as { category, value, question, completed, effects, math, answer, image, id, answerImage }}
				<button
					class={`item box is-link ${completed ? 'bg-slate-300' : 'bg-blue-200'}`}
					disabled={completed}
					on:click={() =>
						toggleOpen(
							`${category} ${value}`,
							question,
							answer,
							math,
							image,
							answerImage,
							completed,
							id,
							effects
						)}>${value}</button
				>
			{/each}

			<div class="score flex">
				<div class="flex flex-grow flex-wrap">
					{#each teams as team}
						<div
							class={`flex flex-grow align-center box m-2 ${team.id === turn && 'bg-orange-400'}`}
						>
							<div class="w-1/2 flex items-center">
								<div class="wrap w-full">
									<h1 class="font-bold text-2xl w-full text-ellipse">{team.name}</h1>
								</div>
							</div>
							<div class="ml-4 w-1/2 items-center">
								<h1 class="">Score:</h1>
								<div class="flex">
									<button
										class="w-8 h-8 button"
										on:click={() => {
											if (teams[team.id].points >= 100) {
												teams[team.id].points -= 100;
											} else {
												teams[team.id].points = 0;
											}
										}}>-</button
									>
									<p class="text-2xl mx-4">$ {team.points}</p>
									<button
										class="w-8 h-8 button"
										on:click={() => {
											teams[team.id].points += 100;
										}}>+</button
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
				<div>
					<div class={`dropdown is-up ${isActive && 'is-active'}`}>
						<div class="dropdown-trigger">
							<button
								class="button"
								aria-haspopup="true"
								aria-controls="dropdown-menu"
								on:click={() => {
									isActive = !isActive;
								}}
							>
								<span>Turn</span>
							</button>
						</div>
						<div class="dropdown-menu" id="dropdown-menu" role="menu">
							<div class="dropdown-content">
								{#each teams as team}
									<button
										class="dropdown-item"
										on:click={() => {
											turn = team.id;
										}}
									>
										{team.name}
									</button>
								{/each}
							</div>
						</div>
					</div>
					<div class="mt-12">
						<button class="button is-danger" on:click={() => (hasEnded = true)}>End Game</button>
					</div>
				</div>
			</div>
			<div />
		</div>
	{/if}
	{#if hasEnded}
		<div class="container min-h-screen min-w-screen flex justify-center items-center">
			<div>
				<div class="flex justify-center">
					<h1 class="font-bold text-5xl">Game Over</h1>
				</div>
				<div class="flex m-4">
					{#each teams as team}
						<div class="card py-2 px-6 m-4">
							<h3 class="font-bold">{team.name}</h3>
							<p>Score: {team.points}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<Modal
	{open}
	{answer}
	{answerImage}
	{question}
	{title}
	{math}
	{image}
	{id}
	{teams}
	{turn}
	{effects}
	on:message={close}
	on:finished={onFinished}
/>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(7, 1fr);
		min-height: 100vh;
		max-height: 100vh;
		max-width: 100vw;
	}

	.item {
		display: flex;
		margin: 1em;
		justify-content: center;
		align-items: center;
	}

	.score {
		grid-column-start: 1;
		grid-column-end: 6;
	}

	.wrap {
		overflow-wrap: break-word;
	}
</style>
