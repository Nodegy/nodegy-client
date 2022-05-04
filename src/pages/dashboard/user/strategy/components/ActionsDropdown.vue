<template>
  <b-row align-v="center">
    <b-col class="text-right">
      <b-dropdown lazy right variant="primary" size="sm" no-caret class="mt-3">
        <template #button-content variant="link">
          <i class="material-icons">more_horiz</i>
        </template>
        <p class="text-center mb-0">{{ label }}</p>
        <b-dropdown-divider />
        <b-dropdown-item
          :disabled="disableDeleteAll"
          variant="danger"
          @click="$emit('deleteAll')"
        >
          <b-row align-v="center">
            <b-col cols="3">
              <i class="material-icons">delete</i>
            </b-col>
            <b-col cols="9"> Delete all </b-col>
          </b-row>
        </b-dropdown-item>
      </b-dropdown>
    </b-col>
  </b-row>
</template>

<script>
import {
  BCol,
  BDropdown,
  BDropdownDivider,
  BDropdownItem,
  BRow,
} from "bootstrap-vue";

export default {
  name: "ActionsDropdown",
  components: {
    "b-col": BCol,
    "b-dropdown": BDropdown,
    "b-dropdown-divider": BDropdownDivider,
    "b-dropdown-item": BDropdownItem,
    "b-row": BRow,
  },

  props: {
    label: {
      type: String,
      required: true,
    },
    showDeleteAll: {
      type: Boolean,
      default: false,
    },
    disableDeleteAll: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
