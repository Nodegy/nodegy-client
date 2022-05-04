<template>
  <b-row class="td-hover m-0 px-2 pl-2" align-v="center">
    <b-col cols="4" sm="5" class="text-left p-2">Notes:</b-col>
    <b-col>
      <template v-if="isEditing">
        <ValidationProvider
          name="Notes"
          rules="min:3|max:256"
          v-slot="{ errors }"
        >
          <b-form-text-area
            name="notes"
            :value="value"
            class="form-control"
            :placeholder="'Click here to add notes for your ' + label"
            @change="updateInput"
          ></b-form-text-area>

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
import { BCol, BFormInvalidFeedback, BFormTextarea, BRow } from "bootstrap-vue";

export default {
  name: "NotesEdit",
  components: {
    "b-col": BCol,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-form-text-area": BFormTextarea,
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
  },

  methods: {
    updateInput(val) {
      this.$emit("input", val);
    },
  },
};
</script>
