<template>
  <b-button class="icon pe-7s-trash" :id="id" variant="danger"
    >Cancel
    <b-popover
      v-if="active"
      :target="id"
      triggers="click"
      :show.sync="popoverCancel"
      placement="top"
      :container="id"
    >
      <template #title>
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
      </template>

      <b-alert show class="small"> Any changes will be lost. Cancel? </b-alert>

      <b-button @click="onClose" size="sm">Cancel</b-button>
      <b-button @click="onCancel" size="sm" variant="danger">Ok</b-button>
    </b-popover>
  </b-button>
</template>   

<script>
import { BAlert, BButton, BPopover } from "bootstrap-vue";

export default {
  name: "CancelEditButton",
  components: {
    "b-alert": BAlert,
    "b-button": BButton,
    "b-popover": BPopover,
  },
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
    active: {
      type: Boolean,
    },
  },
  data() {
    return {
      popoverCancel: null,
    };
  },
  methods: {
    onClose() {
      this.popoverCancel = null;
    },

    onCancel() {
      this.$emit("onCancel");
    },
  },
};
</script>
<style></style>
