<template>
  <div>
    <ModTable
      :dataTableItems="[{ label: 'Total Used Keys', data: numberOfUsedKeys }]"
      :inputFields="fields"
      :items="signupKeys"
      label="Signup Keys"
      v-on:delete="onDelete"
      v-on:refresh="loadSignupKeys"
      ref="manageSignupKeysModTable"
    >
      <div class="text-left" style="max-width: 400px">
        <span> Generate Signup Keys: </span>
        <div style="width: 400px" class="d-flex">
          <b-form-input
            v-model="form.numKeysToGenerate"
            placeholder="# keys to generate"
          />
          <b-button
            :disabled="!form.numKeysToGenerate || loading"
            size="sm"
            @click.prevent="generateSignupKeys"
          >
            Submit
          </b-button>
        </div>
      </div>

      <div class="text-left" style="max-width: 400px">
        <span> Send Signup Key: </span>
        <div style="width: 400px" class="d-flex">
          <b-form-input
            v-model="form.sendToEmail"
            placeholder="email address"
          />
          <b-button
            :disabled="!form.sendToEmail || loading"
            size="sm"
            @click.prevent="sendSignupKey"
          >
            Send
          </b-button>
        </div>
      </div>
    </ModTable>
  </div>
</template>

<script>
import AdmSignupKeysService from "@/services/adm/signup-keys-service";
import { BButton, BFormInput } from "bootstrap-vue";
import { mapGetters } from "vuex";
import { ModTable } from "./components/index";

export default {
  name: "ModManageWebhooks",
  components: {
    ModTable,
    "b-button": BButton,
    "b-form-input": BFormInput,
  },
  data() {
    return {
      loading: false,
      fields: [
        "key",
        { key: "isAvailable", sortable: true },
        { key: "isUsed", sortable: true },
        { key: "createdAt", sortable: true },
      ],
      form: {
        numKeysToGenerate: null,
        sendToEmail: null,
      },
      selected: null,
    };
  },

  computed: {
    ...mapGetters({
      signupKeys: "signupKeys/getSignupKeys",
    }),

    numberOfUsedKeys() {
      return this.signupKeys.filter((key) => key.isUsed).length;
    },
  },

  methods: {
    async loadSignupKeys() {
      try {
        const allKeys = await AdmSignupKeysService.getSignupKeys();
        if (allKeys) {
          this.allKeys = allKeys.data.payload;
        }
      } catch (err) {
        // console.log("err: ", err);
      }
    },

    async onDelete(selected) {
      this.loading = true;
      let deleteIds = selected.map((key) => key._id);
      const confirm = await AdmSignupKeysService.delete(deleteIds);
      if (confirm && this.signupKeys.length > 0) {
        this.$refs.manageSignupKeysModTable.clearSelected();
      }
      this.loading = false;
    },

    async generateSignupKeys() {
      this.loading = true;
      let numKeys;
      if (this.form.numKeysToGenerate) {
        numKeys = parseInt(this.form.numKeysToGenerate);
      }

      if (numKeys) {
        const confirm = await AdmSignupKeysService.generateSignupKeys(numKeys);
      }
      this.loading = false;
    },

    async sendSignupKey() {
      this.loading = true;
      if (this.form.sendToEmail) {
        const selected = this.$refs.manageSignupKeysModTable.onGetSelected();
        if (selected && selected.isAvailable) {
          const returnedKey = await AdmSignupKeysService.sendSignupKey(
            selected._id,
            this.form.sendToEmail,
            selected.key
          );
        }
      }
      this.loading = false;
    },
  },
};
</script>
