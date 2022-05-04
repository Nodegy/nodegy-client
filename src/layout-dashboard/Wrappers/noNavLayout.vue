<template>
  <div class="app-container">
    <div :class="getTheme">
      <!-- <div class="app-main__outer"> -->
      <!-- <div class="app-main__inner"> -->
      <slot></slot>
      <!-- </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  components: {},

  computed: {
    getTheme() {
      return `app-container app-theme-${this.$store.state.prefs.theme}`;
    },
  },
};
</script>
