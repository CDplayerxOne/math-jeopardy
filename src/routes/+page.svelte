<script>
	import Math from '../lib/images/math.jpg';
	import './app.css';
</script>

<svelte:head>
	<title>Jeopardy</title>
	<meta name="description" content="math jeopardy" />
</svelte:head>

<section class="min-w-screen min-h-screen relative">
	<img src={Math} alt="Math background" class="image" />
	<div class="w-full h-full absolute cover z-1" />
	<div class="z-2 w-full h-full absolute flex items-center justify-center">
		<div class="text-white">
			<p class="text-blue-400 font-extrabold">MHF4U0 2023-2024</p>
			<h1 class="font-bold text-9xl mb-8">Math Jeopardy</h1>
			<p class="mb-4">By Corey, Chang and Sam</p>
			<a href="/play">
				<button class="button is-link text-xl">Play 😀</button>
			</a>
		</div>
	</div>
</section>

<style>
	.image {
		height: 100%;
		width: 100%;
		position: absolute;
	}

	.cover {
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
