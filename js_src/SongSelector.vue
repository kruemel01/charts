<style>

</style>

<template>
  <a v-on:click="select(song)">{{name}} - {{interpret}}</a>
</template>

<script>
  import { selectSong } from "./actions";
	export default {
    props: ["name", "interpret"],
    computed: {
			song() {
        return {
          name: this.name,
          interpret: this.interpret
        }
      }
		},
    vuex: {
      actions: {
        select: selectSong
      }
    }
	};
</script>
