<template>
  <b-card body-class="px-3" class="mb-3">
    <template #header>
      <EditorHead
        :disabled="isEditing || isActive"
        editLabel="Manage"
        header="Active Details"
        :isEditing="isEditingActiveDetails"
        showButtons
        showEditButton
        showResetButton
        v-on:toggleEdit="onToggleEdit"
        v-on:onDelete="$emit('onDelete')"
        v-on:onSave="$emit('onSave')"
        v-on:onReset="$emit('onReset')"
      />
    </template>

    <ActivePosEdit
      :cid="cid"
      :label="label"
      :isEditing="isEditingActiveDetails"
    />

    <ActiveConditionsEdit
      :cid="cid"
      :isEditing="isEditingActiveDetails"
      :invalid="invalid"
    />
  </b-card>
</template>

<script>
import Positions from "@/models/positions";
import EditorHead from "../EditorHead";
import { ActiveConditionsEdit, ActivePosEdit } from "./components/index";
import { BCard } from "bootstrap-vue";

export default {
  name: "ActiveDetailsEdit",
  components: {
    ActiveConditionsEdit,
    ActivePosEdit,
    EditorHead,
    "b-card": BCard,
  },

  props: {
    cid: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    isEditingActiveDetails: {
      type: Boolean,
      required: true,
    },
    invalid: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },

  provide() {
    return {
      $validator: this.$validator,
    };
  },

  methods: {
    onToggleEdit(isEditing) {
      this.$emit("toggleEdit", isEditing);
    },
  },
};
</script>
