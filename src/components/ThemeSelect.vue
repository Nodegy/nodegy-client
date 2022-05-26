<template>
  <b-form-checkbox
    v-model="checked"
    name="theme-select-switch'\"
    switch
    @change="setTheme($event)"
  />
</template>

<script>
import { BFormCheckbox } from "bootstrap-vue";
import UserService from "@/services/usr/user-service";
import { mapGetters } from "vuex";

export default {
  name: "ThemeSelect",
  components: {
    "b-form-checkbox": BFormCheckbox,
  },
  data() {
    return {
      checked: false,
    };
  },

  mounted() {
    this.checked = this.getTheme == "dark" ? true : false;
  },

  computed: {
    ...mapGetters({
      getTheme: "prefs/getTheme",
    }),
  },

  methods: {
    async setTheme(val) {
      try {
        const theme = val ? "dark" : "white";
        let changeElement = document.getElementsByClassName("app-container");
        this.$emit("selectedTheme", theme);
        await UserService.updatePrefs("theme", theme);
      } catch (err) {
        this.$emit("isErr");
      }
    },
  },
};
</script>
    