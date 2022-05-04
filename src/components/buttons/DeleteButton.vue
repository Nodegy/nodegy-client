<template>
  <b-button
    :id="id"
    :variant="disabled ? null : 'danger'"
    :disabled="disabled"
    size="sm"
  >
    <i class="pe-7s-trash" />
    <b-popover
      v-if="!disabled"
      :target="id"
      triggers="click blur"
      :show.sync="popoverDelete"
      placement="leftbottom"
      :container="id"
      custom-class="delete-popover-content"
    >
      <b-alert show class="small text-center" variant="danger">
        <span v-if="deleteMsg"
          >{{ deleteMsg }}
          <br />
          <br />
        </span>
        Confirm Delete
        <span :v-if="label"> {{ label }}</span
        >?
      </b-alert>

      <b-row>
        <b-col class="pr-1">
          <b-button block @click="onDelete" size="sm" variant="danger"
            >Ok</b-button
          >
        </b-col>
        <b-col class="pl-1">
          <b-button block @click="onClose" size="sm">Cancel</b-button>
        </b-col>
      </b-row>
    </b-popover>
  </b-button>
</template>   

<script>
import { BAlert, BButton, BCol, BPopover, BRow } from "bootstrap-vue";

export default {
  name: "DeleteButton",
  components: {
    "b-alert": BAlert,
    "b-button": BButton,
    "b-col": BCol,
    "b-popover": BPopover,
    "b-row": BRow,
  },
  props: {
    deleteMsg: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
      default: "",
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      popoverDelete: null,
    };
  },
  methods: {
    onClose() {
      this.popoverDelete = null;
    },

    onDelete() {
      this.$emit("onDelete");
    },
  },
};
</script>
<style>
.delete-popover-content {
  width: 500px;
}
</style>
