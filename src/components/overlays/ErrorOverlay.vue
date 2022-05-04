<template>
  <b-overlay class="error-overlay" :show="isErr" rounded="sm" @shown="onShown">
    <slot></slot>
    <template #overlay>
      <div class="error-overlay-container">
        <b-row align-v="center" class="text-center">
          <b-col>
            <b-spinner type="grow" variant="info" />
          </b-col>
        </b-row>
        <b-row align-v="center" class="text-center">
          <b-col cols="1">
            <i class="material-icons md-36 text-danger">error_outline</i>
          </b-col>
          <b-col>
            <h4 class="mt-1">Oops! An error occured.</h4>
            <p class="error-text">
              We apologize for the inconvenience!
              <br />
              A ticket has been created to address the issue.
            </p>
            <p class="error-text">
              Please refresh the page before trying again.
            </p>
          </b-col>
          <b-col cols="0" sm="1" />
        </b-row>
        <b-row class="text-center">
          <b-col>
            <b-button
              ref="cancel"
              variant="outline-danger"
              size="sm"
              aria-describedby="cancel-label"
              @click="$emit('close')"
            >
              Close Error
            </b-button>
          </b-col>
        </b-row>
      </div>
    </template>
  </b-overlay>
</template>


<script>
import { BButton, BCol, BOverlay, BSpinner, BRow } from "bootstrap-vue";

export default {
  name: "ErrorOverlay",
  components: {
    "b-button": BButton,
    "b-col": BCol,
    "b-overlay": BOverlay,
    "b-row": BRow,
    "b-spinner": BSpinner,
  },
  props: {
    isErr: Boolean,
  },
  methods: {
    onShown() {
      // Focus the cancel button when the overlay is showing
      this.$refs.cancel.focus();
    },
    // onHidden() {
    //   // Focus the show button when the overlay is removed
    //   this.$refs.show.focus();
    // },
  },
};
</script>
