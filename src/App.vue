<template>
  <div id="app">
    {{ testBool }}
    {{ typeof testBool }}
    {{ testStr }}
    {{ typeof testStr }}
    {{ testUnk }}
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

    testBool() {
      return process.env.VUE_APP_TEST_ENV_BOOL;
    },

    testStr() {
      return process.env.VUE_APP_TEST_ENV_STR;
    },

    testUnk() {
      return process.env.VUE_APP_SECONDS_CYCLE;
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