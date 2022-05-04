<template>
  <b-row align-v="center" class="td-hover py-1">
    <b-col cols="7" sm="5">Active Position:</b-col>
    <b-col class="text-left">
      <template v-if="isEditing">
        <b-form-select
          size="sm"
          :value="selected.activeStratData.positionState"
          :options="options"
          @input="updateInput"
        />
      </template>
      <template v-else>
        {{
          selected.activeStratData.positionState
            ? capFirstLetter(selected.activeStratData.positionState)
            : "null"
        }}
      </template>
    </b-col>
  </b-row>
</template>

<script>
import Positions from "@/models/positions";
import { capFirstLetter } from "@/mixins/index";
import { BCol, BFormSelect, BRow } from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "ActivePosEdit",
  mixins: [capFirstLetter],
  components: {
    "b-col": BCol,
    "b-form-select": BFormSelect,
    "b-row": BRow,
  },

  props: {
    cid: {
      type: String,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      options: new Positions({ text: "null", value: null }).states,
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
    updateInput(value) {
      this.selected.activeStratData.positionState = value;
    },
  },
};
</script>
