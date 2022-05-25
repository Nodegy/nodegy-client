<template>
  <AlertEditor
    v-if="selected && show"
    :selected="selected"
    :isEditing="isEditing"
    v-on:onSave="onSave"
    v-on:onDelete="onDelete"
    v-on:onToggleEdit="onToggleEdit"
    :label="label"
    :cid="cid"
  />
</template>

<script>
import Alert from "@/models/alert";
import AlertEditor from "@/pages/dashboard/user/strategy/components/AlertEditor";
import AlertService from "@/services/usr/alert-service";
import { errorHandler } from "@/services/_utils/index";
import { checkForChanges, formatTime } from "@/helpers/index";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ManageAlerts",
  components: {
    AlertEditor,
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
      label: "Alert",
      cid: null,
      message: null,
      isEditing: false,
    };
  },
  mounted() {
    this.cid = `${this.label}-${this._uid}`;

    const tableFields = [
      {
        key: "name",
        label: "Alert Name",
        sortable: true,
      },
      {
        key: "type",
        label: "Type",
        sortable: true,
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

    onCreateAlert() {
      this.setSelected({
        item: new Alert(),
        cid: this.cid,
      });
      this.isEditing = true;
    },

    async onToggleEdit(isEditing) {
      const cancelEdit = async () => {
        this.isEditing = false;
        const item = this.selected.isNew ? null : this.unedited;
        await this.setSelected({ item: item, cid: this.cid });
        this.$emit("reselectTableRow");
      };
      if (!this.isEditing) {
        this.setEditing({ item: new Alert(this.selected), cid: this.cid });
      } else {
        await cancelEdit();
      }

      this.isEditing = isEditing;
    },

    async onSave() {
      this.loading = true;
      const changeCheck = checkForChanges(this.unedited, this.selected);
      let confirm;
      try {
        if (changeCheck.hasChanges) {
          const changes = changeCheck.changes;
          confirm = this.selected.isNew
            ? await AlertService.create(changes, this.cid)
            : await AlertService.update(this.selected._id, changes, this.cid);

          if (confirm) {
            await this.setSelected({ item: confirm, cid: this.cid });
          }
        }

        this.isEditing = !confirm ? true : false;
        if (!this.isEditing) {
          this.$emit("reselectTableRow");
        }
      } catch (err) {
        this.$emit("isErr");
      }
      this.loading = false;
    },

    async onDelete() {
      try {
        this.loading = true;
        const id = this.selected._id;
        await AlertService.delete(id);
        this.$emit("updateAlertsChange");
      } catch (err) {
        this.$emit("isErr");
      }
      this.loading = false;
    },
  },
};
</script>