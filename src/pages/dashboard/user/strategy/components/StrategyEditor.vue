<template>
  <loading-overlay :show="loading">
    <b-row v-if="selected">
      <b-col>
        <ValidationObserver ref="observer" v-slot="{ invalid, dirty }">
          <ActiveEdit
            v-if="!isEditing"
            :conditionsReady="selected.conditionsReady"
            v-model="selected.active"
            v-on:toggleActive="$emit('onSaveActive', !selected.active)"
          />

          <ActiveDetailsEdit
            v-if="!isEditing"
            :cid="cid"
            :isActive="selected.active"
            :isEditing="isEditing"
            :isEditingActiveDetails="isEditingActiveDetails"
            :invalid="invalid"
            :label="label"
            v-on:toggleEdit="onToggleEditActiveDetails"
            v-on:onSave="$emit('onSaveActiveDetails')"
            v-on:onReset="$emit('onResetActiveDetails')"
          />

          <b-form-invalid-feedback
            v-if="!isEditing"
            class="auth-invalid-feedback text-center"
            :state="false"
          >
            <b>{{
              selected.active || isEditingActiveDetails
                ? `Edit options are disabled while ${
                    selected.active
                      ? "Strategy Status is Active. (deactivate to edit)"
                      : "Managing Active Details. (submit or cancel to edit)"
                  }.`
                : null
            }}</b>
          </b-form-invalid-feedback>

          <b-card body-class="p-0">
            <template #header>
              <b-card body-class="p-0">
                <EditorHead
                  :disabled="selected.active || isEditingActiveDetails"
                  :header="
                    isEditing
                      ? `${
                          Object.keys(selected).includes('isNew') &&
                          selected.isNew
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

                <NameEdit
                  :label="label"
                  v-model="selected.name"
                  :isEditing="isEditing"
                  :uneditedName="unedited ? unedited.name : null"
                  :allNames="allStratNames"
                />

                <SymbolEdit
                  v-model="selected.symbol"
                  :isEditing="isEditing"
                  :uneditedSymbol="unedited ? unedited.symbol : null"
                />

                <NotesEdit
                  :label="label"
                  v-model="selected.notes"
                  :isEditing="isEditing"
                />
              </b-card>
            </template>

            <PositionConditionsEdit
              v-if="selected.stratData && selected.stratData.length > 0"
              v-model="selected.stratData"
              :activeConditions="selected.activeStratData.conditions"
              :cid="cid"
              :eid="selected.eid"
              :isActive="selected.active"
              :isEditing="isEditing"
              :invalid="invalid"
              :stratId="selected._id"
              :stratSymbol="selected.symbol"
              v-on:validateInputs="validatePositionSelect()"
              ref="posCondsEdit"
            />
            <template #footer>
              <AlertsSelect v-model="selected.alerts" :isEditing="isEditing" />
            </template>
          </b-card>
          <InvalidDirtyCheck
            :dirty="dirty"
            :invalid="invalid"
            :isEditing="isEditing"
          />
        </ValidationObserver>
      </b-col>
    </b-row>
  </loading-overlay>
</template>

<script>
import {
  ActiveDetailsEdit,
  ActiveEdit,
  AlertsSelect,
  EditorHead,
  InvalidDirtyCheck,
  NameEdit,
  NotesEdit,
  PositionConditionsEdit,
  SymbolEdit,
} from "@/pages/dashboard/user/strategy/components/editor/index";
import { BCard, BCol, BFormInvalidFeedback, BRow } from "bootstrap-vue";
import { mapGetters } from "vuex";
import { LoadingOverlay } from "@/components/index";

export default {
  name: "StrategyEditor",
  components: {
    ActiveDetailsEdit,
    ActiveEdit,
    AlertsSelect,
    EditorHead,
    InvalidDirtyCheck,
    NameEdit,
    NotesEdit,
    PositionConditionsEdit,
    SymbolEdit,
    "b-card": BCard,
    "b-col": BCol,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-row": BRow,
    "loading-overlay": LoadingOverlay,
  },

  props: {
    cid: {
      required: true,
      unique: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    isEditingActiveDetails: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
      unique: true,
    },
    loading: {
      type: Boolean,
      default: false,
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
      allStratNames: "stratStore/allStratNames",
    }),

    unedited() {
      return this.getUnedited(this.cid);
    },
  },

  methods: {
    onToggleEdit(isEditing) {
      this.$emit("onToggleEdit", isEditing);
    },

    onToggleEditActiveDetails(isEditing) {
      this.$emit("onToggleEditActiveDetails", isEditing);
    },

    async validateAll() {
      try {
        let posValidCheck =
          await this.$refs.posCondsEdit.validatePositionSelect();
        if (!posValidCheck) {
          return false;
        }
        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
          return false;
        }
        return true;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .editor-card {
    max-width: 80%;
    margin: auto;
  }
}
</style>