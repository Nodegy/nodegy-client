<template>
  <b-row>
    <b-col cols="0" sm="1" />
    <b-col>
      <b-card v-if="selected && show" class="mt-4" body-class="p-0">
        <EditorHead
          header="Selected Webhook"
          label="Webhook"
          showButtons
          showDeleteButton
          v-on:onDelete="onDeleteOne"
        />

        <b-row class="td-hover m-0 px-2 pl-2" align-v="center">
          <b-col cols="4" sm="5" class="p-2">Symbol:</b-col>
          <b-col>
            {{ selected.symbol }}
          </b-col>
        </b-row>

        <b-row class="td-hover m-0 px-2 pl-2" align-v="center">
          <b-col cols="4" sm="5" class="p-2">Received At:</b-col>
          <b-col>
            {{ selected.createdAt }}
          </b-col>
        </b-row>

        <b-row class="td-hover m-0 px-2 pl-2" align-v="center">
          <b-col cols="4" sm="5" class="p-2">Conditions: </b-col>

          <b-col>
            <b-table-lite
              class="m-0"
              :items="selected.conditions"
              :fields="conditionFields"
              hover
              small
            />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col cols="0" sm="1" />
  </b-row>
</template>

<script>
import { BCard, BCol, BRow, BTableLite } from "bootstrap-vue";
import { formatTime } from "@/helpers/index";
import { mapGetters } from "vuex";
import { EditorHead } from "@/pages/dashboard/user/strategy/components/editor/index";
import { errorHandler } from "@/services/_utils/index";
import WebhookService from "@/services/usr/webhook-service";

export default {
  name: "ManageWebhooks",
  components: {
    EditorHead,
    "b-col": BCol,
    "b-card": BCard,
    "b-row": BRow,
    "b-table-lite": BTableLite,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      label: "Webhooks",
      cid: null,
      conditionFields: [
        { key: "name", label: "Condition", tdClass: "align-middle py-1" },
        { key: "val", label: "Value", tdClass: "align-middle py-1" },
      ],
      timer: null,
    };
  },
  mounted() {
    this.cid = `${this.label}-${this._uid}`;
    const tableFields = [
      {
        key: "symbol",
        sortable: true,
      },
      {
        key: "stratId",
        label: "Strat Name",
        sortable: true,
        default: null,
        formatter: (val) => this.getStratNameFromId(val),
      },
      {
        key: "createdAt",
        label: "Received",
        sortable: true,
        default: null,
        formatter: (val) => this.formatTime(val),
      },
    ];

    this.$emit("setCid", this.cid);
    this.$emit("setTableFields", tableFields);
  },

  computed: {
    ...mapGetters({
      getSelected: "selected/getSelected",
      getStratNameFromId: "stratStore/getStratNameFromId",
    }),

    selected: {
      get() {
        return this.getSelected(this.cid);
      },
      set(val) {
        this.setSelected({ item: val, cid: this.cid });
      },
    },
  },

  watch: {
    selected: {
      handler(val) {
        if (val) {
          this.selected.createdAt = this.formatTime(val.createdAt);
        }
      },
    },
  },

  methods: {
    formatTime(val) {
      return formatTime(
        val,
        this.$store.state.prefs.timezone,
        this.$store.state.prefs.timeFormat
      );
    },

    async onDeleteOne() {
      try {
        const webhookId = this.selected._id;
        await WebhookService.deleteOne(webhookId, this.cid);
      } catch (err) {
        await errorHandler("ManageWebhooks", "onDeleteOne", err);
      }
    },

    async onDeleteAll() {
      try {
        await WebhookService.deleteAll(this.cid);
      } catch (err) {
        await errorHandler("ManageWebhooks", "onDeleteAll", err);
      }
    },
  },
};
</script>