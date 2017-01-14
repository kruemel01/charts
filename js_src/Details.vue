<style>
  #details {
    width: 50%;
    padding: 15px;
  }
</style>

<template>
  <div id="details">
    <chart></chart>
  </div>
</template>

<script>
	export default {
    vuex: {
      getters: {
        song: state => state.selectedSong
      }
    }
  }
</script>
