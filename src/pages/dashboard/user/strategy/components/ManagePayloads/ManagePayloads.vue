<template>
  <div>
    
    <EndpointContainer :eid="selected.eid" ref="endpointContainerRef" />
    <div class="d-flex">
      <InfoTooltip
        id="payloads-tooltip-1"
        tip="Place the below payloads in an alert that triggers the specified
        variable."
      />
      <h5>
        <span>
          Payloads for: <b> {{ selected.name || null }}</b>
        </span>
      </h5>
    </div>
    <div
      :v-if="payloads"
      v-for="(payload, idx) in payloads"
      :key="'pl-collapse-' + idx"
    >
      <PayloadContainer
        :conditions="payload.conditions"
        :isActive="selected.active"
        :pIdx="idx"
        :ready="payload.ready"
        :stratId="selected._id"
        :stratName="selected.name"
        :symbol="selected.symbol"
        v-on:toggleReady="toggleReady"
      />
    </div>

    <div style="height: 18px">
      <b-form-invalid-feedback
        v-if="selected.active"
        class="auth-invalid-feedback text-center"
        :state="false"
      >
        <b
          >Ready toggles are disabled while Strategy Status is Active.
          (deactivate to toggle)</b
        >
      </b-form-invalid-feedback>
    </div>
    <ActivateContainer
      :payloads="payloads"
      :isActive="selected.active"
      v-on:toggleActive="toggleActive"
    />
  </div>
</template>

<script>
import {
  ActivateContainer,
  EndpointContainer,
  PayloadContainer,
} from "@/pages/dashboard/user/strategy/components/ManagePayloads/components/index";
import StrategyService from "@/services/usr/strategy-service";
import { BFormInvalidFeedback } from "bootstrap-vue";
import { errorHandler } from "@/services/_utils/index";
import { mapGetters } from "vuex";
import { InfoTooltip } from "@/components/index";

export default {
  name: "ManagePayloads",
  components: {
    ActivateContainer,
    EndpointContainer,
    InfoTooltip,
    PayloadContainer,
    "b-form-invalid-feedback": BFormInvalidFeedback,
  },

  props: {
    cid: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      getSelected: "selected/getSelected",
      getUnedited: "selected/getUnedited",
    }),

    selected() {
      return this.getSelected(this.cid);
    },

    payloads() {
      let payloads = [];
      this.selected.conditionsReady.forEach((cond) => {
        payloads.push({
          ready: cond.ready,
          conditions: [{ name: cond.name, val: cond.val }],
        });
      });
      return payloads;
    },
  },

  methods: {
    async toggleReady(val) {
      this.selected.conditionsReady[val.idx].ready = val.ready;
      try {
        const confirm = await StrategyService.updateActiveDetails(
          { conditionsReady: this.selected.conditionsReady },
          this.selected,
          this.cid
        );
      } catch (err) {
        await errorHandler("ManagePayloads", "toggleReady", err);
      }
    },

    async toggleActive(val) {
      try {
        const confirm = await StrategyService.updateActiveDetails(
          { active: val },
          this.selected,
          this.cid
        );
      } catch (err) {
        await errorHandler("ManagePayloads", "toggleActive", err);
      }
    },
  },
};

//TODO: Add verification for posCons being the same across pos
</script>

