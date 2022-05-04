<template>
  <div>
    <b-row align-v="center" class="pt-1">
      <b-col>Active Conditions:</b-col>
    </b-row>

    <b-row class="px-2">
      <b-table-lite
        :items="selected.activeStratData.conditions"
        :fields="fields"
        hover
        small
      >
        <template #cell(val)="row">
          <template v-if="!isEditing">{{
            row.value.length === 0 ? "null" : row.value
          }}</template>
          <template v-else>
            <b-form-select
              size="sm"
              :value="selected.activeStratData.conditions[row.index].val"
              :options="bools"
              @input="updateInput($event, row.index)"
            />
          </template>
        </template>
      </b-table-lite>
    </b-row>
  </div>
</template>
 
<script>
import { BCol, BFormSelect, BRow, BTableLite } from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "ActiveConditionsEdit",
  components: {
    "b-col": BCol,
    "b-form-select": BFormSelect,
    "b-table-lite": BTableLite,
    "b-row": BRow,
  },

  inject: { $validator: "$validator" },

  props: {
    cid: {
      type: String,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      bools: [{ text: "n/a", value: null }, true, false],
      fields: [
        { key: "name", label: "Condition" },
        { key: "val", label: "Value" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      getSelected: "selected/getSelected",
    }),

    selected: {
      get() {
        return this.getSelected(this.cid);
      },
      set(val) {
        this.setSelected({ item: val, cid: this.cid });
      },
    },
  },

  methods: {
    updateInput(val, idx) {
      this.selected.activeStratData.conditions[idx].val = val;
    },
  },
};
</script>
