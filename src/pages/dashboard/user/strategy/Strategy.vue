<template>
  <div class="strategy-view">
    <page-title
      heading="Strategy"
      subheading=""
      icon="pe-7s-graph3"
    ></page-title>

    <ErrorOverlay :isErr="isResErr" v-on:close="isResErr = false">
      <b-card>
        <b-tabs align="center" @input="onSaveActiveTab($event)">
          <b-tab title="Strategies">
            <TableWithSearch
              v-if="!strategiesIsEditing"
              :inputData="strategies"
              :inputFields="strategiesTableFields"
              outlined
              :viewCreateNewButton="!strategiesIsEditing"
              viewFooter
              viewHeader
              :label="{ singular: 'Strategy', plural: 'Strategies' }"
              :cid="strategiesCid"
              v-on:createNew="$refs.manageStrategies.onCreateStrat()"
              ref="stratsTable"
            />
          </b-tab>
          <b-tab title="Alerts">
            <TableWithSearch
              v-if="!alertsIsEditing"
              :inputData="alerts"
              :inputFields="alertsTableFields"
              outlined
              :viewCreateNewButton="!alertsIsEditing"
              viewFooter
              viewHeader
              :label="{ singular: 'Alert', plural: 'Alerts' }"
              :cid="alertsCid"
              v-on:createNew="$refs.manageAlerts.onCreateAlert()"
              ref="alertsTable"
            />
          </b-tab>
          <b-tab title="Webhooks">
            <ActionsDropdown
              label="Webhooks"
              showDeleteAll
              :disableDeleteAll="webhooks.length < 1"
              v-on:deleteAll="$refs.manageWebhooks.onDeleteAll()"
            />

            <TableWithSearch
              v-if="webhooks"
              v-bind:inputData="webhooks"
              v-bind:loading="webhooksLoading"
              :inputFields="webhooksTableFields"
              outlined
              viewFooter
              :label="{ singular: 'Webhook', plural: 'Webhooks' }"
              :cid="webhooksCid"
            />
            <span v-else>No Webhooks</span>
          </b-tab>
        </b-tabs>
      </b-card>

      <ManageStrategies
        :show="activeTab == 0"
        v-on:reselectTableRow="onSelectStrategiesTableRow"
        v-on:setCid="onSetStrategiesCid"
        v-on:setTableFields="onSetStrategiesTableFields"
        v-on:toggleEdit="onToggleStrategiesEdit"
        ref="manageStrategies"
      />

      <ManageAlerts
        :show="activeTab == 1"
        v-on:reselectTableRow="onSelectAlertTableRow"
        v-on:updateAlertsChange="$refs.manageStrategies.updateAlertsChange()"
        v-on:setCid="onSetAlertsCid"
        v-on:setTableFields="onSetAlertsTableFields"
        v-on:toggleEdit="onToggleAlertsEdit"
        ref="manageAlerts"
      />
      <ManageWebhooks
        :show="activeTab == 2"
        v-on:setCid="onSetWebhooksCid"
        v-on:setTableFields="onSetWebhooksTableFields"
        ref="manageWebhooks"
      />
    </ErrorOverlay>
    <RequestResponseArea v-on:isErr="isResErr = true" />
  </div>
</template>

<script>
import ActionsDropdown from "@/pages/dashboard/user/strategy/components/ActionsDropdown";
import ManageAlerts from "./views/ManageAlerts";
import ManageStrategies from "./views/ManageStrategies";
import ManageWebhooks from "./views/ManageWebhooks";
import PageTitle from "@/layout-dashboard/Components/PageTitle.vue";
import TableWithSearch from "@/components/tables/TableWithSearch";
import { BCard, BTab, BTabs } from "bootstrap-vue";
import { mapGetters } from "vuex";
import { ErrorOverlay, RequestResponseArea } from "@/components/index";

export default {
  name: "Strategy",
  components: {
    ActionsDropdown,
    ErrorOverlay,
    ManageAlerts,
    ManageStrategies,
    ManageWebhooks,
    PageTitle,
    RequestResponseArea,
    TableWithSearch,
    "b-card": BCard,
    "b-tab": BTab,
    "b-tabs": BTabs,
  },
  data() {
    return {
      activeTab: 0,
      isResErr: false,

      alertsCid: null,
      alertsIsEditing: false,
      alertsTableFields: null,

      strategiesCid: null,
      strategiesIsEditing: false,
      strategiesTableFields: null,

      webhooksCid: null,
      webhooksLoading: false,
      webhooksTableFields: null,
    };
  },

  computed: {
    ...mapGetters({
      strategies: "stratStore/getStrategies",
      alerts: "stratStore/getAlerts",
      webhooks: "stratStore/getWebhooks",
    }),
  },
  methods: {
    onSetStrategiesCid(val) {
      this.strategiesCid = val;
    },
    onSetStrategiesTableFields(val) {
      this.strategiesTableFields = val;
    },
    onSelectStrategiesTableRow() {
      this.$nextTick(() => {
        if (this.strategies.length > 0) {
          this.$refs.stratsTable.selectRow();
        }
      });
    },
    onToggleStrategiesEdit(val) {
      this.strategiesIsEditing = val;
    },

    onSetAlertsCid(val) {
      this.alertsCid = val;
    },
    onSetAlertsTableFields(val) {
      this.alertsTableFields = val;
    },
    onSelectAlertTableRow() {
      this.$nextTick(() => {
        if (this.alerts.length > 0) {
          this.$refs.alertsTable.selectRow();
        }
      });
    },
    onToggleAlertsEdit(val) {
      this.alertsIsEditing = val;
    },

    onSetWebhooksCid(val) {
      this.webhooksCid = val;
    },
    onSetWebhooksTableFields(val) {
      this.webhooksTableFields = val;
    },

    onSaveActiveTab(val) {
      this.activeTab = val;
    },
  },
};
</script>
