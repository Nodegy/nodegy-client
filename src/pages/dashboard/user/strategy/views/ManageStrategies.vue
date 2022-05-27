<template>
  <b-tabs
    v-if="selected && show"
    align="center"
    :class="isEditing ? '' : 'mt-4'"
  >
    <b-tab title="Strategy" :title-item-class="isEditing ? 'd-none' : ''">
      <StrategyEditor
        style="margin-top: -1px"
        :selected="selected"
        :isEditing="isEditing"
        :isEditingActiveDetails="isEditingActiveDetails"
        :loading="loading"
        v-on:onSave="onSave"
        v-on:onSaveActive="onSaveActive"
        v-on:onSaveActiveDetails="onSaveActiveDetails"
        v-on:onDelete="onDelete"
        v-on:onToggleEdit="onToggleEdit"
        v-on:onToggleEditActiveDetails="onToggleEditActiveDetails"
        v-on:onResetActiveDetails="onResetActiveDetails"
        :label="label"
        :cid="cid"
        ref="editor"
      />
    </b-tab>
    <b-tab title="Payloads" v-if="selected && !isEditing" lazy>
      <ManagePayloads :cid="cid" />
    </b-tab>
  </b-tabs>
</template>

<script>
import { checkForChanges, findIdx, formatTime } from "@/helpers/index";
import { BTab, BTabs } from "bootstrap-vue";
import ManagePayloads from "@/pages/dashboard/user/strategy/components/ManagePayloads/ManagePayloads";
import Strategy from "@/models/strategy";
import StrategyEditor from "@/pages/dashboard/user/strategy/components/StrategyEditor";
import StrategyService from "@/services/usr/strategy-service";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ManageStrategies",
  components: {
    "b-tab": BTab,
    "b-tabs": BTabs,
    ManagePayloads,
    StrategyEditor,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
      label: "Strategy",
      cid: null,
      isEditing: false,
      isEditingActiveDetails: false,
    };
  },

  mounted() {
    this.cid = `${this.label}-${this._uid}`;

    const tableFields = [
      {
        key: "name",
        label: "Name",
        sortable: true,
      },
      {
        key: "notes",
        label: "Notes",
        sortable: true,
        formatter(val) {
          if (val !== null) {
            let showString = val.substr(0, 64);
            if (val.length > 64) {
              showString += "...";
            }
            return showString;
          }
        },
      },
      {
        key: "active",
        label: "Status",
        sortable: true,
        formatter(val) {
          return val ? "active" : "inactive";
        },
      },
      {
        key: "createdAt",
        label: "Created",
        sortable: true,
        default: null,
        formatter: (val) =>
          formatTime(
            val,
            this.$store.state.prefs.timezone,
            this.$store.state.prefs.timeFormat
          ),
      },
    ];
    this.$emit("setCid", this.cid);
    this.$emit("setTableFields", tableFields);
  },

  computed: {
    ...mapGetters({
      getSelected: "selected/getSelected",
      getUnedited: "selected/getUnedited",
    }),

    selected: {
      get() {
        return this.getSelected(this.cid);
      },
      set(val) {
        this.setSelected({ item: val, cid: this.cid });
      },
    },

    unedited() {
      return this.getUnedited(this.cid);
    },
  },

  watch: {
    isEditing(val) {
      if (val) {
        this.$emit("toggleEdit", true);
        return;
      }
      this.$emit("toggleEdit", false);
    },
  },

  methods: {
    ...mapActions({
      setSelected: "selected/setSelected",
      setEditing: "selected/setEditing",
    }),

    onCreateStrat() {
      this.setSelected({ item: new Strategy(), cid: this.cid });
      this.isEditing = true;
    },

    async cancelEdit() {
      const item = this.selected.isNew ? null : this.unedited;
      await this.setSelected({ item: item, cid: this.cid });
      this.$emit("reselectTableRow");
    },

    async onToggleEdit(isEditing) {
      this.isEditing = isEditing;
      if (isEditing) {
        this.setEditing({ item: new Strategy(this.selected), cid: this.cid });
      } else {
        await this.cancelEdit();
      }
    },

    async onToggleEditActiveDetails(isEditing) {
      this.isEditingActiveDetails = isEditing;
      if (isEditing) {
        this.setEditing({ item: new Strategy(this.selected), cid: this.cid });
      } else {
        await this.cancelEdit();
      }
    },

    async onSave(skipValidation) {
      this.loading = true;
      let confirm;
      let changeCheck = { hasChanges: false };
      let isValid;

      try {
        if (!skipValidation) {
          isValid = await this.$refs.editor.validateAll();
          if (!isValid) {
            return;
          }

          isValid = this.selected.alerts.length > 0;
          if (!isValid) {
            return;
          }
        }

        changeCheck = checkForChanges(this.unedited, this.selected);
        if (!changeCheck.hasChanges) {
          return;
        }

        const changes = changeCheck.changes;
        confirm = this.selected.isNew
          ? await StrategyService.create(changes, this.cid)
          : await StrategyService.update(changes, this.selected, this.cid);
      } catch (err) {
        this.$emit("isErr");
      }
      this.isEditing = !confirm && changeCheck.hasChanges && !isValid;

      this.loading = false;
      if (!this.isEditing) {
        this.$emit("reselectTableRow");
      }
    },

    async onSaveActive(newActive) {
      try {
        this.loading = true;
        await this.onToggleEdit(true);
        this.selected.active = newActive;
        await this.onSave(true);
      } catch (err) {
        // console.log("err: ", err);
      }
    },

    async onSaveActiveDetails() {
      this.loading = true;
      const changeCheck = checkForChanges(this.unedited, this.selected);
      this.isEditingActiveDetails = false;
      try {
        if (changeCheck.hasChanges) {
          const changes = changeCheck.changes;
          await StrategyService.updateActiveDetails(
            changes,
            this.selected,
            this.cid
          );
          this.$emit("reselectTableRow");
        }
      } catch (err) {
        this.$emit("isErr");
      }
      this.loading = false;
    },

    async onResetActiveDetails() {
      this.setEditing({ item: new Strategy(this.selected), cid: this.cid });
      this.selected.activeStratData.positionState = null;
      this.selected.activeStratData.conditions.forEach(
        (cond) => (cond.val = null)
      );
      await this.onSaveActiveDetails();
    },

    async onDelete() {
      this.loading = true;
      const stratId = this.selected._id;
      try {
        await StrategyService.delete(stratId, this.cid);
      } catch (err) {
        this.$emit("isErr");
      }
      this.loading = false;
    },

    updateAlertsChange() {
      if (this.selected && !this.isEditing) {
        this.$emit("reselectTableRow");
      }
    },
  },
};
</script>
