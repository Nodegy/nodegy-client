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
            v-model="numKeysToGenerate"
            placeholder="# keys to generate"
          />
          <b-button
            :disabled="!numKeysToGenerate"
            size="sm"
            @click.prevent="generateSignupKeys"
          >
            Submit
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
      fields: [
        "key",
        { key: "isUsed", sortable: true },
        { key: "createdAt", sortable: true },
      ],
      numKeysToGenerate: null,
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
      let deleteIds = selected.map((key) => key._id);
      const confirm = await AdmSignupKeysService.delete(deleteIds);
      if (confirm) {
        this.$refs.manageSignupKeysModTable.clearSelected();
      }
    },

    async generateSignupKeys() {
      let numKeys;
      if (this.numKeysToGenerate) {
        numKeys = parseInt(this.numKeysToGenerate);
      }

      if (numKeys) {
        const confirm = await AdmSignupKeysService.generateSignupKeys(numKeys);
      }
    },
  },
};
</script>
