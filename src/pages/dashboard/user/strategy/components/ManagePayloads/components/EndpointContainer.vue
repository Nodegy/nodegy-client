<template>
  <b-row style="height: 110px" class="mb-3">
    <b-col cols="4" sm="2" align-self="end">
      <span class="py-0 my-0 d-flex">
        <InfoTooltip
          id="endpoint-tooltip-1"
          tip="This is your personal webhook-url. Keep secure."
        />
        <h5>Endpoint:</h5>
      </span>
    </b-col>
    <b-col align-self="end">
      <b-card
        style="background-color: rgb(247, 239, 239)"
        :no-body="visible ? false : true"
      >
        <b-col>
          <b-collapse id="collapse-endpoint-whurl" v-model="visible">
            <b-form-text-area
              class="text-center"
              plaintext
              type="hidden"
              :value="endpoint"
              id="to-copy-endpoint-whurl"
              size="sm"
              max-rows="2"
            >
              {{ endpoint }}
            </b-form-text-area>
          </b-collapse>
        </b-col>

        <b-row style="height: 0.05px" align-h="center">
          <span>{{ message }}</span>
        </b-row>

        <template #footer>
          <b-button-group style="width: 100%">
            <b-button
              v-if="visible"
              class="m-0"
              size="sm"
              @click.prevent="copyToClipboard"
            >
              <i class="pe-7s-copy-file" />
              <span style="font-weight: 450"> Copy</span></b-button
            >
            <b-button
              class="m-0"
              variant="primary"
              :aria-expanded="visible ? true : false"
              aria-controls="collapse-endpoint-whurl"
              @click="visible = !visible"
              ><span style="font-weight: 450">
                {{ visible ? "Hide" : "View" }}
              </span>
              <i v-if="!visible" class="pe-7s-look" />
            </b-button>
          </b-button-group>
        </template>
      </b-card>
    </b-col>
    <b-col cols="0" sm="2" />
  </b-row>
</template>


<script>
import {
  BButton,
  BCol,
  BRow,
  BFormTextarea,
  BCard,
  BCollapse,
  BButtonToolbar,
  BButtonGroup,
} from "bootstrap-vue";
import { copyToClipboard } from "@/helpers/index";
import { InfoTooltip } from "@/components/index";
import Webhook from "@/models/webhook";

export default {
  name: "EndpointContainer",
  components: {
    InfoTooltip,
    "b-button": BButton,
    "b-button-group": BButtonGroup,
    "b-collapse": BCollapse,
    "b-form-text-area": BFormTextarea,
    "b-col": BCol,
    "b-row": BRow,
    "b-card": BCard,
  },
  props: {
    eid: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      message: null,
      visible: false,
    };
  },

  mounted() {
    this.visible = false;
  },

  computed: {
    endpoint() {
      return new Webhook(null, null, this.eid, null).getEndpoint();
    },
  },

  methods: {
    copyToClipboard() {
      this.message = copyToClipboard("to-copy-endpoint-whurl");
      setTimeout(() => (this.message = null), 5000);
    },
    toggleVisible() {
      this.visible = false;
    },
  },
};
</script>