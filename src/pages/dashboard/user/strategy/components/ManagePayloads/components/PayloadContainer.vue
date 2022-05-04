<template>
  <b-row style="height: 150px" align-v="center" class="my-3">
    <b-col cols="0" sm="2" />
    <b-col>
      <b-card
        style="background-color: rgb(247, 239, 239)"
        header-class="text-center"
        body-class="p-2"
      >
        <template #header>
          <template v-for="(item, idx) in conditions">
            <h5 :key="'label' + idx" style="border-bottom: 3px solid grey">
              condition: <b>{{ item.name }}</b> | value: <b>{{ item.val }}</b>
            </h5>
          </template>
        </template>
        <template v-if="!ready">
          <b-form-text-area
            plaintext
            class="text-center"
            type="hidden"
            :value="payloadStr"
            :id="'to-copy-whpayload-' + pIdx"
            size="sm"
            max-rows="6"
            no-auto-shrink
          />

          <b-row style="height: 0.05px" align-h="center">
            <span>{{ message }}</span>
          </b-row>
        </template>
        <template v-else>
          <b-row align-h="center">
            <span>
              <i class="pe-7s-check pe-3x" style="width: 100%"></i>
            </span>
          </b-row>
        </template>
        <template #footer>
          <ready-button-request-limiter
            :isActive="isActive"
            :isReady="ready"
            :pIdx="pIdx"
            v-on:copy="copyToClipboard"
            v-on:toggleReady="toggleReady"
          />
        </template>
      </b-card>
    </b-col>
    <b-col cols="0" sm="2" />
  </b-row>
</template>


<script>
import { BCol, BRow, BFormTextarea, BCard } from "bootstrap-vue";
import { copyToClipboard } from "@/helpers/index";
import Webhook from "@/models/webhook";
import ReadyButtonRequestLimiter from "./components/ReadyButtonRequestLimiter.vue";

export default {
  name: "PayloadContainer",
  components: {
    "b-form-text-area": BFormTextarea,
    "b-col": BCol,
    "b-row": BRow,
    "b-card": BCard,
    "ready-button-request-limiter": ReadyButtonRequestLimiter,
    ReadyButtonRequestLimiter,
  },
  props: {
    conditions: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    pIdx: {
      type: Number,
      required: true,
    },
    ready: {
      type: Boolean,
      required: true,
    },
    stratId: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      message: null,
    };
  },

  computed: {
    payloadStr() {
      return new Webhook(
        this.stratId,
        this.conditions,
        null,
        this.symbol
      ).getPayloadStr();
    },
  },

  methods: {
    copyToClipboard() {
      this.message = copyToClipboard(`to-copy-whpayload-${this.pIdx}`);
      setTimeout(() => (this.message = null), 5000);
    },

    toggleReady() {
      this.$emit("toggleReady", {
        ready: !this.ready,
        idx: this.pIdx,
      });
    },
  },
};
</script>


