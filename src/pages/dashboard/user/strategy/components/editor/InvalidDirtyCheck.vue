<template>
  <b-form-invalid-feedback
    v-if="isEditing"
    class="auth-invalid-feedback text-center"
    :state="false"
  >
    <b>{{ dirty ? "Unsaved changes" : null }}</b>
    <br />
    <b>{{
      invalid ? "Complete requirements before saving or adding" : null
    }}</b>
  </b-form-invalid-feedback>
</template>
 
<script>
import { BFormInvalidFeedback } from "bootstrap-vue";

export default {
  name: "InvalidDirtyCheck",
  components: {
    "b-form-invalid-feedback": BFormInvalidFeedback,
  },

  props: {
    dirty: {
      type: Boolean,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
