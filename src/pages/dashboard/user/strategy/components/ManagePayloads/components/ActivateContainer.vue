<template>
  <b-row class="mt-2">
    <b-col cols="4" sm="3" align-self="center" class="text-center">
      <h5>
        <span>
          # Payloads Ready: <b> {{ numReady }}</b>
        </span>
      </h5>
    </b-col>

    <b-col align-self="center">
      <request-limiter-button
        id="payloads-activate-container"
        :disabled="!isActive && !allPayloadsReady"
        inputStyle="width: 100%"
        :variant="allPayloadsReady ? (isActive ? 'danger' : 'success') : ''"
        size="lg"
        v-on:click="onToggleActive"
      >
        <span
          :style="
            'font-weight: 450;' +
            `${isActive ? 'color: white' : 'color: black'}`
          "
        >
          {{
            isActive
              ? "Deactivate"
              : allPayloadsReady
              ? "Activate!"
              : "ready all to activate"
          }}
        </span>
      </request-limiter-button>
    </b-col>

    <b-col cols="0" sm="3" />
  </b-row>
</template>


<script>
import { BCol, BRow } from "bootstrap-vue";
import { RequestLimiterButton } from "@/components/index";

export default {
  name: "ActivateContainer",
  components: {
    "request-limiter-button": RequestLimiterButton,
    "b-col": BCol,
    "b-row": BRow,
  },
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    payloads: {
      type: Array,
      required: true,
    },
  },

  computed: {
    numPayloads() {
      return this.payloads.length;
    },

    numReadyPayloads() {
      return this.payloads.filter((item) => item.ready == true).length;
    },

    numReady() {
      return `${this.numReadyPayloads}/${this.numPayloads}`;
    },

    allPayloadsReady() {
      return this.numReadyPayloads == this.numPayloads;
    },
  },

  methods: {
    onToggleActive() {
      this.$emit("toggleActive", !this.isActive);
    },
  },
};
</script>