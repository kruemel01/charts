<style>
	#selector {
		width: 50%;
		padding: 15px;
	}
</style>

<template>
	<div id="selector">
		<h1>Select Song</h1>
		<ul>
			<li v-for="song in songs">
				<song-selector :name="song.name" :interpret="song.interpret"></song-selector>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		vuex: {
			getters: {
				songs: state => state.songs
			}
		}
  }
</script>
