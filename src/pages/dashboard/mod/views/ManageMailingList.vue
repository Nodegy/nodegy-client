<template>
  <div>
    <ModTable
      :dataTableItems="[{ label: null, data: null }]"
      :inputFields="fields"
      :items="mailingList"
      label="Addressess"
      v-on:delete="onDelete"
      v-on:refresh="loadMailingList"
      ref="manageMailingListModTable"
    >
      <div class="text-left" style="max-width: 400px">
        <span> Add to Mailing List: </span>
        <div style="width: 400px" class="d-flex">
          <b-form-input v-model="form.email" placeholder="email" />
          <b-button
            :disabled="!form.email"
            size="sm"
            @click.prevent="addToList"
          >
            Submit
          </b-button>
        </div>
      </div>
    </ModTable>
  </div>
</template>

<script>
import ModMailingListService from "@/services/mod/mailing-list-service";
import MailingListService from "@/services/auth/mailing-list-service";
import { mapGetters } from "vuex";
import { ModTable } from "./components/index";
import { BButton, BFormInput } from "bootstrap-vue";

export default {
  name: "mod-manage-mailing-list",
  components: {
    ModTable,
    "b-button": BButton,
    "b-form-input": BFormInput,
  },
  data() {
    return {
      fields: ["email", { key: "createdAt" }],
      form: {
        email: null,
      },
    };
  },

  computed: {
    ...mapGetters({
      mailingList: "mailingList/getMailingList",
    }),
  },

  methods: {
    async loadMailingList() {
      try {
        await ModMailingListService.getMailingList();
      } catch (err) {
        // console.log("err: ", err);
      }
    },

    async addToList() {
      try {
        await MailingListService.add(this.form.email);
      } catch (err) {
        // console.log("err: ", err);
      }
    },

    async onDelete(selected) {
      let deleteIds = selected.map((key) => key._id);
      const confirm = await ModMailingListService.deleteAddresses(deleteIds);
      if (confirm) {
        this.$refs.manageMailingListModTable.clearSelected();
      }
    },
  },
};
</script>
