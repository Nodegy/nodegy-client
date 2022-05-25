<template>
  <div class="mx-1">
    <i class="material-icons md-18 md-hover text-info" :id="id">info_outline</i>
    <b-tooltip :target="id" triggers="hover">
      {{ tip }}
    </b-tooltip>
  </div>
</template>

<script>
import { BTooltip } from "bootstrap-vue";

export default {
  name: "InfoTooltip",
  components: {
    "b-tooltip": BTooltip,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    tip: {
      type: String,
      default: "tip unavailable",
    },
  },
};
</script>
<style></style>
