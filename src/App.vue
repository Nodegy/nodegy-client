<template>
  <div id="app">
    {{ configTest }}
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
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import intercept from "@/services/intercept";
import Loader from "@/pages/loader/Loader";
import SseHandlerService from "@/services/sse/sse-handler-service";
import config from "@/config/config";

export default {
  components: {
    Loader,
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
    configTest() {
      return config.API_URL;
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