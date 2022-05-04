<template>
  <b-row class="td-hover m-0 px-2 pl-2" align-v="center">
    <b-col cols="4" sm="5" class="p-2">{{ label }} Name:</b-col>
    <b-col>
      <template v-if="isEditing">
        <ValidationProvider
          :name="label + ' Name'"
          :rules="{
            required: true,
            min: 3,
            max: 32,
            noDupNames: {
              inputArr: allNames,
              unedited: uneditedName,
            },
          }"
          v-slot="{ errors }"
        >
          <b-form-input
            :value="value"
            :placeholder="label + ' Name'"
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
import { BCol, BFormInput, BFormInvalidFeedback, BRow } from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "NameEdit",
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
    },
    uneditedName: {
      type: String,
    },
    allNames: {
      type: Array,
    },
  },

  methods: {
    updateInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>
