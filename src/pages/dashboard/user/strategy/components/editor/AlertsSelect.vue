<template>
  <b-card body-class="p-0">
    <b-row align-v="center" class="editor-row-header mx-0 py-2">
      <b-col>Alerts:</b-col>
    </b-row>
    <div v-if="!isEditing">
      <template v-if="value.length > 0">
        <template v-for="(alert, alertIdx) in value">
          <b-row
            align-v="center"
            class="mx-0 py-2"
            style="
              background-color: #b8daff;
              border-bottom: 1px solid white;
              font-weight: bold;
            "
            :key="'alertSelect-tr1-' + alertIdx"
          >
            <b-col cols="6">
              <span>{{ capFirstLetter(headers[alertIdx].type) }}</span>
              <span v-if="!visible[alertIdx]"> / {{ alert.name }}</span>
            </b-col>

            <b-col cols="6" class="text-right py-0">
              <b-button
                size="sm"
                variant="primary"
                @click.prevent="toggleVisible(alertIdx)"
              >
                {{ visible[alertIdx] ? "Hide" : "Show" }}
              </b-button>
            </b-col>
          </b-row>

          <template v-if="visible[alertIdx]">
            <b-row
              align-v="center"
              class="td-hover mx-0 py-2"
              :key="'alertsSelect-tr2' + alertIdx"
            >
              <b-col cols="3">Name:</b-col>
              <b-col cols="9">
                {{ headers[alertIdx].name }}
              </b-col>
            </b-row>

            <b-row
              align-v="center"
              class="td-hover mx-0 py-2"
              :key="'alertsSelect-tr3-' + alertIdx"
            >
              <b-col cols="3">Address:</b-col>
              <b-col cols="9">{{ alert.address }}</b-col>
            </b-row>

            <b-row
              class="td-hover mx-0 py-2"
              align-v="center"
              :key="'alertsSelect-tr4-' + alertIdx"
            >
              <b-col>Messages:</b-col>
            </b-row>

            <b-row
              v-for="(msg, msgIdx) in alert.messages"
              :key="'message-' + alertIdx + msgIdx"
              class="td-hover mx-0 py-2"
              align-v="center"
            >
              <b-col cols="1" sm="3"></b-col>
              <b-col cols="3" sm="2">{{ msg.position }}: </b-col>
              <b-col cols="7" sm="7">
                {{ msg.message.text }}
              </b-col>
            </b-row>
          </template>
        </template>
      </template>

      <b-row v-else align-v="center" class="td-hover mx-0 py-2">
        <b-col> This strategy has no alerts. Select Edit to add alerts. </b-col>
      </b-row>
    </div>

    <div v-else>
      <b-row align-v="center" class="td-hover mx-0 py-2">
        <template v-if="alerts.length > 0">
          <b-col cols="3">Select Alerts:</b-col>
          <b-col cols="9">
            <b-form-group v-slot="{ ariaDescribedby }">
              <ValidationProvider
                name="At least one Alert is"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-checkbox-group
                  v-model="selectedAlerts"
                  :options="alerts"
                  :aria-describedby="ariaDescribedby"
                  switches
                  stacked
                  value-field="data"
                  @input="updateInput"
                />
                <b-form-invalid-feedback
                  class="auth-invalid-feedback"
                  :state="false"
                >
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </ValidationProvider>
            </b-form-group>
          </b-col>
        </template>
        <template v-else>
          <b-col>
            <p>
              There are no configured alerts, please select the "Manage Alerts"
              tab to setup at least one alert.
            </p>
          </b-col>
        </template>
      </b-row>
    </div>
  </b-card>
</template>

<script>
import capFirstLetter from "@/mixins/capFirstLetter";
import {
  BButton,
  BCard,
  BCol,
  BFormCheckboxGroup,
  BFormGroup,
  BFormInvalidFeedback,
  BRow,
} from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "AlertsSelect",
  mixins: [capFirstLetter],
  components: {
    "b-button": BButton,
    "b-card": BCard,
    "b-col": BCol,
    "b-form-checkbox-group": BFormCheckboxGroup,
    "b-form-group": BFormGroup,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-row": BRow,
  },

  inject: ["$validator"],

  props: {
    value: {
      type: Array,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      selectedAlerts: [],
      visible: {},
      headers: [],
    };
  },

  mounted() {
    this.resetVisible();
  },

  computed: {
    ...mapGetters({
      getAlerts: "stratStore/getAlerts",
    }),
    alerts() {
      return this.getAlerts.map((alert) => {
        return {
          text: alert.name,
          value: alert._id,
          data: alert,
        };
      });
    },
  },

  watch: {
    alerts: {
      immediate: true,
      handler(val) {
        this.updateSelectedAlerts();
        this.updateHeaders();
      },
    },
    isEditing: {
      immediate: true,
      handler(val) {
        if (val) {
          this.updateSelectedAlerts();
        }
      },
    },
    value: {
      handler(val) {
        this.updateSelectedAlerts();
        this.updateHeaders();
        this.resetVisible();
      },
    },
  },

  methods: {
    resetVisible() {
      this.value.forEach((alert, idx) => {
        this.visible[idx] = false;
      });
    },
    toggleVisible(idx) {
      const visible = { ...this.visible };
      visible[idx] = !visible[idx];
      this.visible = visible;
    },
    updateInput(val) {
      this.$emit("input", val);
    },
    updateHeaders() {
      this.headers = this.selectedAlerts.map((alert) => {
        return { name: alert.name, type: alert.type };
      });
    },
    updateSelectedAlerts() {
      this.selectedAlerts = this.value;
    },
  },
};
</script>