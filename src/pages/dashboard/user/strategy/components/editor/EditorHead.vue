<template>
  <b-row align-v="center" class="mx-0 editor-row-header">
    <b-col class="text-left">{{ header }}:</b-col>
    <b-col v-if="showButtons" class="text-right">
      <b-button-group>
        <b-button
          v-if="isEditing"
          class="my-1"
          :variant="invalid ? null : 'success'"
          size="sm"
          :disabled="invalid"
          @click.prevent="$emit('onSave')"
          >Save</b-button
        >
        <b-button
          v-if="showEditButton"
          class="my-1"
          :variant="disabled ? null : isEditing ? 'danger' : 'primary'"
          :disabled="disabled"
          size="sm"
          @click.prevent="$emit('toggleEdit', !isEditing)"
          >{{ isEditing ? "Cancel" : editLabel }}</b-button
        >
        <DeleteButton
          v-if="showDeleteButton && !isEditing"
          class="my-1"
          v-on:onDelete="$emit('onDelete')"
          :deleteMsg="deleteMsg"
          :label="label"
          :id="label + '-editor-delete-button'"
          :disabled="disabled"
        />
        <b-button
          v-if="showResetButton && !isEditing"
          class="my-1"
          size="sm"
          :disabled="isEditing || disabled"
          :variant="isEditing || disabled ? '' : 'danger'"
          @click.prevent="$emit('onReset')"
          >Reset</b-button
        >
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
import { BButton, BButtonGroup, BCol, BRow } from "bootstrap-vue";
import DeleteButton from "@/components/buttons/DeleteButton";

export default {
  name: "EditorHead",
  components: {
    DeleteButton,
    "b-button": BButton,
    "b-button-group": BButtonGroup,
    "b-col": BCol,
    "b-row": BRow,
  },

  props: {
    deleteMsg: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    editLabel: {
      type: String,
      default: "Edit",
    },
    header: {
      type: String,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    showButtons: {
      type: Boolean,
      default: false,
    },
    showDeleteButton: {
      type: Boolean,
      default: false,
    },
    showEditButton: {
      type: Boolean,
      default: false,
    },
    showResetButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
