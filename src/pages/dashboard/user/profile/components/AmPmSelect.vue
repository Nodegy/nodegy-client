<template>
  <b-row class="td-hover" align-v="center">
    <b-col cols="4" sm="3" class="text-right">Time Format:</b-col>
    <b-col>
      <b-form-select
        v-if="selected"
        :value="selected"
        :options="options"
        @input="setFormat"
      >
      </b-form-select>
    </b-col>
    <b-col cols="" sm="3" />
  </b-row>
</template>

<script>
import { BCol, BFormSelect, BRow } from "bootstrap-vue";
import UserService from "@/services/usr/user-service";

export default {
  name: "AmPmSelect",
  components: {
    "b-col": BCol,
    "b-form-select": BFormSelect,
    "b-row": BRow,
  },
  data() {
    return {
      selected: null,
      options: ["12 Hour", "24 Hour"],
    };
  },

  mounted() {
    this.selected =
      this.$store.state.prefs.timeFormat == 12 ? "12 Hour" : "24 Hour";
  },

  computed: {
    prefs() {
      return this.$store.state.prefs;
    },
  },

  methods: {
    async setFormat(op) {
      try {
        if (this.selected !== op) {
          let val = op == "12 Hour" ? 12 : 24;
          await UserService.updatePrefs("timeFormat", val);
          this.$emit("changeAmPm");
        }
        this.selected = op;
      } catch (err) {
        // console.log(`Error in AmPmSelect: ${err}`);
        this.$emit("setMsg", err.response);
      }
    },
  },
};
</script>
    
    