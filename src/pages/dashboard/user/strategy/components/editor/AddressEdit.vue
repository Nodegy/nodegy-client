<template>
  <b-row class="td-hover m-0 px-2 pl-2" align-v="center">
    <b-col cols="4" sm="5" class="p-2">Address:</b-col>
    <b-col>
      <template v-if="isEditing">
        <ValidationProvider
          :name="label + ' Address'"
          rules="required|min:3|max:512"
          v-slot="{ errors }"
        >
          <b-form-input
            :value="value"
            :placeholder="label + ' Address'"
            type="text"
            class="form-control"
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
import { BCol, BFormInvalidFeedback, BFormInput, BRow } from "bootstrap-vue";

export default {
  name: "AddressEdit",
  components: {
    "b-col": BCol,
    "b-form-input": BFormInput,
    "b-form-invalid-feedback": BFormInvalidFeedback,
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

  methods: {
    updateInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>
