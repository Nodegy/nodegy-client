<template>
  <div class="strategy-view">
    <ErrorOverlay>
      <page-title
        heading="Mod Dashboard"
        subheading=""
        icon="pe-7s-graph3"
      ></page-title>

      <b-card class="admin-dash-card">
        <b-tabs content-class="mt-3" align="center">
          <b-tab title="Signup Keys">
            <ManageSignupKeys />
          </b-tab>

          <b-tab title="Mailing List">
            <ManageMailingList />
          </b-tab>

          <b-tab title="Feedback">
            <ManageFeedback />
          </b-tab>

          <b-tab title="Users">
            <ManageUsers />
          </b-tab>

          <b-tab title="Webhooks">
            <ManageWebhooks />
          </b-tab>
        </b-tabs>
      </b-card>
    </ErrorOverlay>
    <RequestResponseArea v-on:isErr="isResErr = true" />
  </div>
</template>

<script>
import {
  ManageFeedback,
  ManageMailingList,
  ManageSignupKeys,
  ManageUsers,
  ManageWebhooks,
} from "@/pages/dashboard/mod/views/index";
import PageTitle from "@/layout-dashboard/Components/PageTitle.vue";
import { BButton, BCard, BTab, BTabs } from "bootstrap-vue";
import StrategyService from "@/services/usr/strategy-service";
import { ErrorOverlay, RequestResponseArea } from "@/components/index";

export default {
  name: "Strategy",
  components: {
    ErrorOverlay,
    PageTitle,
    ManageFeedback,
    ManageMailingList,
    ManageSignupKeys,
    ManageUsers,
    ManageWebhooks,
    RequestResponseArea,
    "b-card": BCard,
    "b-tab": BTab,
    "b-tabs": BTabs,
  },
  data() {
    return {
      isResErr: false,
    };
  },

  methods: {},
};
</script>
