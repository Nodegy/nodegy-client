<template>
  <b-overlay spinner-variant="info" :show="show" variant="">
    <slot></slot>
  </b-overlay>
</template>

<script>
import { BOverlay } from "bootstrap-vue";

export default {
  name: "loading-overlay",
  components: {
    "b-overlay": BOverlay,
  },
  props: {
    show: Boolean,
  },
};
</script>
