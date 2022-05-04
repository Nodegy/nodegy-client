<template>
  <b-card :bg-variant="value ? 'success' : 'warning'">
    <b-row align-v="center">
      <b-col>
        Status:
        <span class="font-weight-bolder">
          {{ value ? "ACTIVE" : "NOT ACTIVE" }}
        </span>
      </b-col>
      <b-col>
        <div
          :class="
            value
              ? 'd-flex'
              : `d-flex font-weight-bolder ${
                  allPayloadsReady ? 'text-info' : 'text-danger'
                }`
          "
        >
          {{ numReady }} Payloads Ready

          <InfoTooltip
            id="active-edit-payloads-ready-tooltip"
            tip="Use the 'Payloads' tab to prepare the incoming payloads for this
          strategy."
          />
        </div>
      </b-col>
      <b-col>
        <request-limiter-button
          id="strategy-active-edit"
          :isBlock="true"
          :disabled="!allPayloadsReady"
          size="sm"
          :variant="allPayloadsReady ? (value ? 'danger' : 'success') : ''"
          v-on:click="onToggleActive"
        >
          {{ value ? "Deactivate" : "Activate" }}
        </request-limiter-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { BCard, BCol, BRow } from "bootstrap-vue";
import { InfoTooltip, RequestLimiterButton } from "@/components/index";

export default {
  name: "ActiveEdit",
  components: {
    InfoTooltip,
    "b-card": BCard,
    "b-col": BCol,
    "b-row": BRow,
    "request-limiter-button": RequestLimiterButton,
  },

  props: {
    value: {
      type: Boolean,
    },
    conditionsReady: {
      type: Array,
      required: true,
    },
  },

  computed: {
    numPayloads() {
      return this.conditionsReady.length;
    },

    numReadyPayloads() {
      return this.conditionsReady.filter((item) => item.ready == true).length;
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
      this.$emit("toggleActive");
    },
  },
};
</script>