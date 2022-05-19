<template>
  <div class="text-center">
    <div style="height: 300px">
      <i
        v-if="items.length < 1"
        style="margin: 100px 0"
        type="button"
        class="material-icons md-48"
        @click.prevent="$emit('refresh')"
      >
        refresh
      </i>

      <template v-else>
        <b-table
          class="mx-auto"
          style="height: 100%; max-width: 600px"
          striped
          hover
          :items="items"
          :fields="fields"
          sortable
          select-mode="range"
          responsive
          ref="selectableTable"
          selectable
          sticky
          @row-selected="onRowSelected"
        />
      </template>
    </div>
    <div class="mx-auto" style="width: fit-content">
      <b-button-toolbar aria-label="Toolbar with buttons">
        <b-button-group size="sm" class="mt-3">
          <b-button @click.prevent="selectAllRows" variant="primary"
            >Select All</b-button
          >
          <b-button
            :disabled="selected.length < 1"
            @click.prevent="clearSelected"
            >Clear</b-button
          >

          <b-button @click.prevent="$emit('refresh')">
            <i class="material-icons align-middle"> refresh </i></b-button
          >
        </b-button-group>

        <b-button-group size="sm" class="mt-3">
          <b-button
            @click.prevent="onDelete"
            variant="danger"
            :disabled="!selected.length"
            >Delete</b-button
          >
        </b-button-group>
      </b-button-toolbar>
    </div>
    <b-table-simple class="mx-auto" style="max-width: 200px">
      <b-tbody>
        <b-tr>
          <b-th>Total {{ label }}:</b-th>
          <b-td>{{ items.length }}</b-td>
        </b-tr>
        <b-tr>
          <b-th>Total Selected:</b-th>
          <b-td>{{ selected.length }}</b-td>
        </b-tr>
        <b-tr
          v-for="(item, idx) in dataTableItems"
          :key="'data-table-item-' + idx"
        >
          <b-th>{{ item.label }}</b-th>
          <b-td>{{ item.data }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <slot />
  </div>
</template>

<script>
import { formatTime } from "@/helpers/index";
import {
  BButton,
  BButtonGroup,
  BTable,
  BTableSimple,
  BTbody,
  BTr,
  BTh,
  BTd,
  BButtonToolbar,
} from "bootstrap-vue";

export default {
  name: "mod-table",
  components: {
    "b-button": BButton,
    "b-button-group": BButtonGroup,
    "b-button-toolbar": BButtonToolbar,
    "b-table": BTable,
    "b-table-simple": BTableSimple,
    "b-td": BTd,
    "b-th": BTh,
    "b-tr": BTr,
    "b-tbody": BTbody,
  },
  props: {
    dataTableItems: {
      type: Array,
      default: () => {
        return [{ label: null, data: null }];
      },
    },
    inputFields: {
      type: Array,
    },
    items: {
      type: Array,
    },
    label: {
      type: String,
      default: "items",
    },
  },
  data() {
    return {
      fields: [],
      selected: [],
    };
  },

  mounted() {
    this.inputFields.forEach((field) => {
      if (
        typeof field === "object" &&
        Object.keys(field).includes("key") &&
        field.key == "createdAt"
      ) {
        field = {
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
        };
      }
      this.fields.push(field);
    });
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    onDelete() {
      if (this.selected.length) {
        this.$emit("delete", this.selected);
      }
    },
    onGetSelected() {
      return this.selected.length ? this.selected[0] : null;
    },
  },
};
</script>
