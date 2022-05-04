<template>
  <b-button-group style="width: 100%">
    <b-button
      v-if="!isReady"
      size="sm"
      @click.prevent="$emit('copyToClipboard')"
    >
      <i class="pe-7s-copy-file" />
      <span style="font-weight: 450"> Copy</span></b-button
    >
    <b-button
      id="ready-button-request-limiter-target"
      :disabled="isActive"
      size="sm"
      :variant="isReady ? 'success' : 'info'"
      @click.prevent="toggleReady"
    >
      <b-overlay :show="!requestsAllowed" variant="" opacity="0.85">
        <b-form-checkbox
          :id="'payload-ready-checkbox-' + pIdx"
          :checked="isReady"
          :disabled="isActive || !requestsAllowed"
        >
          <span
            class="align-middle"
            :style="
              'font-weight: 450;' +
              `${isReady ? 'color: black' : 'color: white'}`
            "
          >
            Ready</span
          >
        </b-form-checkbox>
      </b-overlay>
    </b-button>

    <b-tooltip
      v-if="!requestsAllowed"
      target="ready-button-request-limiter-target"
      triggers="hover"
    >
      Request limiter applied. Please wait a few seconds then try again.
    </b-tooltip>
  </b-button-group>
</template>

<script>
import {
  BButton,
  BButtonGroup,
  BFormCheckbox,
  BOverlay,
  BTooltip,
} from "bootstrap-vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ready-button-request-limiter",
  components: {
    "b-button": BButton,
    "b-button-group": BButtonGroup,
    "b-form-checkbox": BFormCheckbox,
    "b-overlay": BOverlay,
    "b-tooltip": BTooltip,
  },

  props: {
    isActive: Boolean,
    isReady: Boolean,
    pIdx: Number,
  },
  computed: {
    ...mapGetters({
      getRequestsAllowed: "requestLimiter/getRequestsAllowed",
    }),

    requestsAllowed() {
      return this.getRequestsAllowed();
    },

    targetId() {
      return `request-limiter-target-${this.id}`;
    },
  },

  methods: {
    ...mapActions({
      documentRequest: "requestLimiter/documentRequest",
    }),

    async toggleReady() {
      if (this.requestsAllowed) {
        await this.documentRequest();
        this.$emit("toggleReady");
      }
    },
  },
};
</script>
