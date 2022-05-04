<template>
  <div :id="id + '-container'">
    <b-button :id="id" variant="primary"> Change Active </b-button>

    <b-card title="Returned values:" v-if="inputReturn">
      <p class="card-text" style="max-width: 20rem">
        Name: <strong>{{ inputReturn }}</strong>
      </p></b-card
    >

    <b-popover
      :target="id"
      triggers="click"
      :show.sync="popoverShow"
      placement="auto"
      :container="id + '-container'"
      @show="onShow"
    >
      <template #title>
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
        Interactive Content
      </template>

      <div>
        <b-form-group
          label="Color"
          label-for="popover-input-1"
          label-cols="3"
          :state="inputState"
          class="mb-1"
          invalid-feedback="This field is required"
        >
          <b-form-select
            id="popover-input-2"
            v-model="input"
            :state="inputState"
            :options="options"
            size="sm"
          ></b-form-select>
        </b-form-group>

        <b-alert show class="small">
          <strong>Current Values:</strong><br />
          Name: <strong>{{ input }}</strong>
        </b-alert>

        <b-button @click="onClose" size="sm" variant="danger">Cancel</b-button>
        <b-button @click="onConfirm" size="sm" variant="primary">Ok</b-button>
      </div>
    </b-popover>
  </div>
</template>   

<script>
import {
  BAlert,
  BButton,
  BCard,
  BFormGroup,
  BFormSelect,
  BPopover,
} from "bootstrap-vue";

export default {
  name: "ButtonWithPopover",
  components: {
    "b-alert": BAlert,
    "b-card": BCard,
    "b-button": BButton,
    "b-form-group": BFormGroup,
    "b-form-select": BFormSelect,
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
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: "primary",
    },
    confirmMessage: {
      type: String,
      default: "Confirm?",
    },
    options: {
      type: Array,
      default: () => {
        [];
      },
    },
  },
  data() {
    return {
      input: null,
      inputState: null,
      inputReturn: "",
      popoverShow: false,
    };
  },

  watch: {
    editFrom(val) {
      if (val) {
        this.editFromState = true;
      }
    },
    editTo(val) {
      if (val) {
        this.editToState = true;
      }
    },
    editRole(val) {
      if (val) {
        this.editState = true;
      }
    },
  },

  methods: {
    onClose() {
      this.popoverShow = null;
    },

    onConfirm() {
      if (!this.input) {
        this.inputstate = false;
      }

      if (this.input) {
        this.onClose();
        // Return our popover form results
        this.inputReturn = this.input;
      }

      this.$emit("onConfirm");
    },

    onShow() {
      this.input = "";
      this.inputState = null;
      this.inputReturn = "";
    },
  },
};
</script>
<style></style>
