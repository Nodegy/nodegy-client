<template>
  <div class="mr-3">
    <b-button id="user-header-menu-1" variant="link">
      <i
        :class="`material-icons md-30 md-light ${
          menuActive ? 'md-selected' : 'md-hover'
        }`"
        >settings</i
      >
    </b-button>
    <b-popover
      custom-class="overflow-auto"
      target="user-header-menu-1"
      placement="bottomleft"
      triggers="click blur"
      @shown="menuActive = true"
      @hidden="menuActive = false"
    >
      <template #title>
        <div class="text-center">{{ capFirstLetter(username) }}</div>
      </template>

      <div class="mx-1">
        <b-row align-v="center" class="p-2 td-hover" @click="pushToProfile">
          <b-col cols="2">
            <span class="material-icons mr-2">badge</span>
          </b-col>
          <b-col>Profile settings</b-col>
        </b-row>

        <b-row align-v="center" class="p-2">
          <b-col cols="2" />
          <b-col cols="7" style="padding-left: 16px">Dark theme</b-col>
          <b-col cols="3" class="pl-1">
            <ThemeSelect />
          </b-col>
        </b-row>

        <b-row
          align-v="center"
          class="td-hover p-2"
          @click="logOut"
          style="border-top: 1px solid #ebebeb"
        >
          <b-col cols="2">
            <span class="material-icons mr-2">logout</span>
          </b-col>
          <b-col> Logout </b-col>
        </b-row>
      </div>
    </b-popover>
  </div>
</template>

<script>
import { BButton, BCol, BPopover, BRow } from "bootstrap-vue";
import { capFirstLetter } from "@/mixins/index";
import ThemeSelect from "@/components/ThemeSelect";
import { mapGetters } from "vuex";

export default {
  mixins: [capFirstLetter],
  components: {
    ThemeSelect,
    "b-button": BButton,
    "b-col": BCol,
    "b-popover": BPopover,
    "b-row": BRow,
  },

  data() {
    return {
      menuActive: false,
    };
  },

  computed: {
    ...mapGetters({
      username: "auth/getUsername",
    }),
  },

  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
    },
    pushToProfile() {
      this.$router.push(`/dashboard/${this.username}/profile`);
    },
  },
};
</script>