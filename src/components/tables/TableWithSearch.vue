<template>
  <div class="mt-4">
    <b-row v-if="viewHeader" align-h="center">
      <b-col md="3" sm="6">
        <h5>
          <b>{{ label.plural }}</b>
        </h5>
      </b-col>
    </b-row>

    <b-table
      v-if="inputData.length"
      sticky-header
      :items="inputData"
      :fields="inputFields"
      :select-mode="selectMode"
      :stacked="stacked"
      :outlined="outlined"
      hover
      responsive
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
      <!-- <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong> Loading...</strong>
          </div>
        </template> -->

      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>

    <h5 v-else class="text-center">
      {{
        `No ${label.plural}.${
          viewCreateNewButton
            ? ` Use the 'Create New ${label.singular}' button to get started!`
            : ""
        }`
      }}
    </h5>

    <b-row v-if="viewFooter" align-v="center">
      <b-col v-if="viewCreateNewButton" class="text-left">
        <b-button @click.prevent="$emit('createNew')" variant="primary">
          Create New {{ label.singular }}
        </b-button>
      </b-col>

      <b-col class="text-right"
        ><b>Total </b><b>{{ label.plural }}</b
        ><b>: </b>{{ inputData ? inputData.length : 0 }}</b-col
      >
    </b-row>

    <p v-if="showSelected">
      Selected Row:<br />
      {{ selected }}
    </p>

    <b-button
      v-if="showClearSelected"
      :disabled="this.selected === null"
      align-h="center"
      @click="clearSelected"
      >Clear selected</b-button
    >
  </div>
</template>

<script>
import { BButton, BCol, BRow, BTable } from "bootstrap-vue";
import { findIdx } from "@/helpers/index";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TableWithSearch",
  components: {
    "b-row": BRow,
    "b-col": BCol,
    "b-table": BTable,
    "b-button": BButton,
  },
  props: {
    cid: {
      required: true,
      unique: true,
    },
    inputData: {
      type: Array,
    },
    inputFields: {
      type: Array,
    },
    stacked: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showSelected: {
      type: Boolean,
      default: false,
    },
    showClearSelected: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    viewCreateNewButton: {
      type: Boolean,
      default: false,
    },
    viewFooter: {
      type: Boolean,
      default: false,
    },
    viewHeader: {
      type: Boolean,
      default: false,
    },
    label: {
      type: Object,
      default: () => ({ singuler: "Item", plural: "Items" }),
    },
  },
  data() {
    return {
      keyword: "",
      selectMode: "single",
      computedReselect: false,
    };
  },

  computed: {
    ...mapGetters({
      getSelected: "selected/getSelected",
      getIsLoading: "selected/getIsLoading",
    }),

    selected: {
      get() {
        return this.getSelected(this.cid);
      },
      set(val) {
        this.setSelected({ item: val, cid: this.cid });
      },
    },

    isLoading: {
      get() {
        return this.getIsLoading();
      },
    },
  },
  methods: {
    ...mapActions("selected", ["setSelected"]),

    onRowSelected(item) {
      if (!this.computedReselect) {
        this.selected = this.isLoading
          ? this.selected
          : item && item.length > 0
          ? item[0]
          : null;
        if (this.isLoading) {
          this.computedReselect = true;
          this.selectRow();
        }
        return;
      }
      this.computedReselect = false;
    },

    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },

    selectRow() {
      if (this.selected) {
        const idx = findIdx(this.selected, this.inputData);
        this.$refs.selectableTable.selectRow(idx);
      }
    },

    reselectRow() {
      if (this.selected) {
        const selected = this.selected;
        this.clearSelected();
        this.$nextTick(() => {
          this.selectRow(selected);
        });
      }
    },
  },
};
</script>

