<template>
  <b-row class="td-hover m-0 px-2 pl-2" align-v="center">
    <b-col cols="4" sm="5" class="p-2">{{ label }} Type:</b-col>
    <b-col>
      <template v-if="isEditing">
        <ValidationProvider
          :name="label + ' Type'"
          rules="required"
          v-slot="{ errors }"
        >
          <b-form-select
            :value="value"
            :options="typeOptions"
            @input="updateInput"
          />
          <b-form-invalid-feedback class="auth-invalid-feedback" :state="false">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </ValidationProvider>
      </template>
      <template v-else>
        {{ value }}
      </template>
    </b-col>
  </b-row>
</template>

<script>
import { BCol, BFormSelect, BFormInvalidFeedback, BRow } from "bootstrap-vue";

export default {
  name: "TypeEdit",
  components: {
    "b-col": BCol,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-form-select": BFormSelect,
    "b-row": BRow,
  },

  inject: ["$validator"],

  props: {
    value: {
      type: String,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      typeOptions: [
        { text: "Select One", value: null },
        "bot",
        "email",
        "discord",
      ],
    };
  },

  methods: {
    updateInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>
