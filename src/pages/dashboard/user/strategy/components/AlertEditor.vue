<template>
  <b-row v-if="selected" :class="isEditing ? '' : 'mt-4'">
    <b-col>
      <ValidationObserver ref="observer" v-slot="{ invalid, dirty }">
        <b-card v-if="selected" body-class="p-0">
          <template #header>
            <EditorHead
              deleteMsg="Deleting alert will remove this alert from applicable strategies."
              :header="
                isEditing
                  ? `${
                      Object.keys(selected).includes('isNew') && selected.isNew
                        ? 'Creating New'
                        : 'Editing'
                    } ${label}`
                  : `${label} Details`
              "
              :invalid="invalid"
              :isEditing="isEditing"
              :label="label"
              showButtons
              showDeleteButton
              showEditButton
              v-on:toggleEdit="onToggleEdit"
              v-on:onSave="$emit('onSave')"
              v-on:onDelete="$emit('onDelete')"
            />
          </template>

          <NameEdit
            :label="label"
            v-model="selected.name"
            :isEditing="isEditing"
            :uneditedName="unedited ? unedited.name : null"
            :allNames="allAlertNames"
          />

          <TypeEdit
            v-model="selected.type"
            :isEditing="isEditing"
            :label="label"
          />

          <AddressEdit
            v-model="selected.address"
            :isEditing="isEditing"
            :label="label"
          />

          <NotesEdit
            :label="label"
            v-model="selected.notes"
            :isEditing="isEditing"
          />

          <AlertPosMessagesEdit
            v-model="selected.messages"
            :selected="selected"
            :isEditing="isEditing"
            :label="label"
            :invalid="invalid"
            ref="messEdit"
          />

          <InvalidDirtyCheck
            :dirty="dirty"
            :invalid="invalid"
            :isEditing="isEditing"
          />
        </b-card>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>

<script>
import {
  AddressEdit,
  AlertPosMessagesEdit,
  EditorHead,
  InvalidDirtyCheck,
  NameEdit,
  NotesEdit,
  TypeEdit,
} from "@/pages/dashboard/user/strategy/components/editor/index";
import { BCard, BCol, BRow } from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "AlertEditor",
  components: {
    AddressEdit,
    AlertPosMessagesEdit,
    EditorHead,
    InvalidDirtyCheck,
    NameEdit,
    NotesEdit,
    TypeEdit,
    "b-card": BCard,
    "b-col": BCol,
    "b-row": BRow,
  },

  props: {
    cid: {
      type: String,
      required: true,
      unique: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
      unique: true,
    },
    selected: {
      type: Object,
      default: () => {},
      required: true,
    },
  },

  provide() {
    return {
      $validator: this.$validator,
    };
  },

  computed: {
    ...mapGetters({
      getUnedited: "selected/getUnedited",
      allAlertNames: "stratStore/allAlertNames",
    }),

    unedited() {
      return this.getUnedited(this.cid);
    },
  },

  methods: {
    onToggleEdit(isEditing) {
      this.$emit("onToggleEdit", isEditing);
    },
  },
};
</script>
