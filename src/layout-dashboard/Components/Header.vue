<template>
  <div class="app-header header-shadow">
    <button
      type="button"
      class="hamburger close-sidebar-btn hamburger--elastic mx-3"
      v-bind:class="{ 'is-active': isOpen }"
      @click="toggleMobile('closed-sidebar-open')"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>

    <Notifications class="ml-auto" />

    <UserArea />
  </div>
</template>

<script>
import { BButton, BCol, BPopover, BRow } from "bootstrap-vue";
import Notifications from "./Header/NotificationsArea";
import UserArea from "./Header/HeaderUserArea";

export default {
  name: "Header",
  components: {
    Notifications,
    UserArea,
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    passTheme(value) {
      this.$emit("selectedTheme", value);
    },
    toggleMobile(className) {
      const el = document.body;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
  },
};
</script>
