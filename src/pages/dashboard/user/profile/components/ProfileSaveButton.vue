<template>
  <b-row class="m-0 p-3">
    <b-col cols="4" />
    <b-col cols="4">
      <b-button-group>
        <b-button
          :variant="invalid ? null : 'primary'"
          size="sm"
          @click.prevent="$emit('save')"
          :disabled="invalid"
        >
          Save
        </b-button>

        <b-button
          variant="danger"
          size="sm"
          @click.prevent="$emit('cancelEdit')"
        >
          Cancel
        </b-button>
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
import { BButton, BButtonGroup, BCol, BRow } from "bootstrap-vue";

export default {
  name: "ProfileSaveButton",
  components: {
    "b-button": BButton,
    "b-button-group": BButtonGroup,
    "b-col": BCol,
    "b-row": BRow,
  },

  props: {
    invalid: {
      type: Boolean,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
