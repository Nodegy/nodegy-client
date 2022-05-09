<template>
  <b-row class="td-hover" align-v="center">
    <b-col cols="4" sm="3" class="text-right">Time Zone:</b-col>
    <b-col>
      <b-form-select v-if="selected" v-model="selected" @input="onTzSelect">
        <option
          v-for="(option, idx) in timezones"
          :value="option"
          :key="'TzOp-' + idx"
        >
          {{ option.formatted }}
        </option>
      </b-form-select>
    </b-col>
    <b-col cols="" sm="3" />
  </b-row>
</template>

<script>
import { BCol, BFormSelect, BRow } from "bootstrap-vue";
import UserService from "@/services/usr/user-service";

export default {
  name: "TimeZoneSelect",
  components: {
    "b-col": BCol,
    "b-form-select": BFormSelect,
    "b-row": BRow,
  },

  data() {
    return {
      selected: null,
      timezones: [
        { default: "GMT+0000", formatted: "GMT+0:00 (GMT)" },
        { default: "GMT+0100", formatted: "GMT+1:00 (ECT)" },
        { default: "GMT+0200", formatted: "GMT+2:00 (EET)" },
        // { default: "GMT+0330", formatted: "GMT+3:30 (MET)" },
        { default: "GMT+0400", formatted: "GMT+4:00 (NET)" },
        { default: "GMT+0500", formatted: "GMT+5:00 (PLT)" },
        // { default: "GMT+0530", formatted: "GMT+5:30 (IST)" },
        { default: "GMT+0600", formatted: "GMT+6:00 (BST)" },
        { default: "GMT+0700", formatted: "GMT+7:00 (VST)" },
        { default: "GMT+0800", formatted: "GMT+8:00 (CTT)" },
        { default: "GMT+0900", formatted: "GMT+9:00 (JST)" },
        // { default: "GMT+0930", formatted: "GMT+9:30 (ACT)" },
        { default: "GMT+1000", formatted: "GMT+10:00 (AET)" },
        { default: "GMT+1100", formatted: "GMT+11:00 (SST)" },
        { default: "GMT+1200", formatted: "GMT+12:00 (NST)" },
        { default: "GMT-1100", formatted: "GMT-11:00 (MIT)" },
        { default: "GMT-1000", formatted: "GMT-10:00 (HST)" },
        { default: "GMT-0900", formatted: "GMT-9:00 (AST)" },
        { default: "GMT-0800", formatted: "GMT-8:00 (PST)" },
        { default: "GMT-0700", formatted: "GMT-7:00 (MST)" },
        { default: "GMT-0600", formatted: "GMT-6:00 (CST)" },
        { default: "GMT-0500", formatted: "GMT-5:00 (EST)" },
        { default: "GMT-0400", formatted: "GMT-4:00 (PRT)" },
        // { default: "GMT-0330", formatted: "GMT-3:30 (CNT)" },
        { default: "GMT-0300", formatted: "GMT-3:00 (BET)" },
        { default: "GMT-0100", formatted: "GMT-1:00 (CAT)" },
      ],
    };
  },

  mounted() {
    let tz = this.getFormattedTz();
    this.selected = tz;
    this.$emit("updateTz", tz.default);
  },

  methods: {
    onTzSelect(val) {
      this.$emit("updateTz", val.default);
      this.setFormat(val.default);
    },

    getFormattedTz() {
      // returns TZ object from timezones,
      // ex. { default: "GMT-0500", formatted: "GMT-5:00 (EST)" },
      let storedTz = this.$store.state.prefs.timezone;
      let result;
      this.timezones.forEach((tz) => {
        if (tz.default === storedTz) {
          result = tz;
        }
      });
      return result;
    },

    async setFormat(tz) {
      try {
        let storedTz = this.$store.state.prefs.timezone;
        if (tz !== storedTz) {
          await UserService.updatePrefs("timezone", tz);
        }
      } catch (err) {
        // console.log(`Error in TimeZoneSelect: ${err}`);
      }
    },
  },
};
</script>
