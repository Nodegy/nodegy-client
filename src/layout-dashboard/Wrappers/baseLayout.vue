<template>
  <div class="app-container">
    <div :class="getTheme">
      <transition name="fade" mode="out-in" appear>
        <Header />
      </transition>
      <transition name="fade" mode="out-in" appear>
        <Sidebar />
      </transition>
      <div class="app-main__outer">
        <div class="app-main__inner">
          <slot></slot>
        </div>
        <transition name="fade" mode="out-in" appear>
          <Footer />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Header,
    Sidebar,
    Footer,
  },

  computed: {
    getTheme() {
      return `app-container app-theme-${this.$store.state.prefs.theme}`;
    },
  },
};
</script>