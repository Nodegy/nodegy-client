<template>
  <div>
    <b-button
      :id="targetId"
      :block="isBlock"
      :class="inputClass"
      :disabled="disabled"
      :size="size"
      :style="inputStyle"
      :variant="variant"
      :pill="rounded"
      @click.prevent="handleClick"
    >
      <b-overlay :show="!requestsAllowed || loading" variant="" opacity="0.85">
        <slot></slot>
      </b-overlay>
    </b-button>
    <b-tooltip v-if="!requestsAllowed" :target="targetId" triggers="hover">
      Request limiter applied. Please wait a few seconds then try again.
    </b-tooltip>
  </div>
</template>

<script>
import { BButton, BOverlay, BTooltip } from "bootstrap-vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "request-limiter-button",
  components: {
    "b-button": BButton,
    "b-overlay": BOverlay,
    "b-tooltip": BTooltip,
  },
  props: {
    id: String,
    inputClass: String,
    isBlock: Boolean,
    disabled: Boolean,
    size: String,
    inputStyle: String,
    variant: String,
    loading: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
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

    async handleClick() {
      if (this.requestsAllowed) {
        this.$emit("click");
        await this.documentRequest();
      }
    },
  },
};
</script>
