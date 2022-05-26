<template>
  <request-limiter-button
    :id="id"
    inputClass="mr-3 p-0"
    size="sm"
    variant="link"
    v-on:click="onSendPayload"
  >
    <div class="material-icons md-30 md-hover text-info">
      <i class="material-icons">webhook</i>
      <i class="material-icons">arrow_right_alt</i>
    </div>
  </request-limiter-button>
</template>
 
<script>
import Positions from "@/models/positions";
import Webhook from "@/models/webhook";
import WebhookService from "@/services/usr/webhook-service";
import { RequestLimiterButton } from "@/components/index";

export default {
  name: "SendPayloadButton",
  components: {
    "request-limiter-button": RequestLimiterButton,
  },
  data() {
    return {};
  },
  props: {
    condition: Object,
    eid: String,
    id: String,
    stratId: String,
    stratSymbol: String,
  },

  methods: {
    async onSendPayload() {
      const conditions = [
        { name: this.condition.name, val: this.condition.val },
      ];
      try {
        const confirm = await WebhookService.create(
          conditions,
          this.eid,
          this.stratId,
          this.stratSymbol
        );
      } catch (err) {
        this.$emit("isErr");
      }
    },
  },
};
</script>
