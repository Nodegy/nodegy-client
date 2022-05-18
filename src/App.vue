<template>
  <div id="app">
    <template v-if="siteDisabled">Under Construction</template>
    <template v-else>
      <div v-if="!currentUser || !isConfirmed">
        <router-view name="header" />
        <div class="wrapper">
          <router-view />
        </div>
      </div>
      <template v-else>
        <component :is="layout">
          <transition name="fade" mode="out-in">
            <Loader v-if="loggedIn && !appReady" :loggedIn="loggedIn" />
            <router-view v-else />
          </transition>
        </component>
      </template>
    </template>
    <version-badge />
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import intercept from "@/services/intercept";
import Loader from "@/pages/loader/Loader";
import SseHandlerService from "@/services/sse/sse-handler-service";
import config from "@/config/config";
import { VersionBadge } from "@/components";

export default {
  components: {
    Loader,
    VersionBadge,
  },

  computed: {
    ...mapGetters({
      currentUser: "auth/getUser",
      loggedIn: "auth/getIsLoggedIn",
      isConfirmed: "auth/getIsConfirmed",
      appReady: "initApp/getIsAppReady",
    }),

    layout() {
      return (
        (this.appReady ? this.$route.meta.layout || "default" : "nonav") +
        "-layout"
      );
    },
    siteDisabled() {
      return config.SITE_DISABLED;
    },
  },
  watch: {
    loggedIn: {
      handler(isLoggedIn) {
        if (!isLoggedIn) {
          SseHandlerService.close();
          this.$router.push("/login");
        } else if (this.appReady && isLoggedIn) {
          SseHandlerService.init();
        }
      },
    },
    appReady: {
      immediate: true,
      handler(isReady) {
        if (isReady && this.loggedIn) {
          SseHandlerService.init();
        }
      },
    },
  },
};
</script>