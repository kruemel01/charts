<style>
</style>

<template>
  <div id="chart">

  </div>
</template>

<script>
  import c3 from "../node_modules/c3/c3.min.js";
	export default {
    ready () {
      c3.generate({
        bindto: "#chart",
        data: {
          url: "/static/charts.csv",
          x: "time",
          y: "position"
        },
        axis: {
          x: {
            type: "timeseries",
            tick: {
              format: "%Y-%m-%d"
            }
          },
          y: {
            max: 100,
            min: 1,
            inverted: true
          }
        }
      });
    }
  }
</script>
