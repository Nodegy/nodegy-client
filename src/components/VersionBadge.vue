<template>
  <div class="version-badge">{{ `build: ${version}` }}</div>
</template>

<script>
import config from "@/config/config";

export default {
  name: "version-badge",
  components: {},
  data() {
    return {};
  },

  computed: {
    version() {
      return config.DEPLOY_ENV;
    },
  },
};
</script>

<style scoped>
.version-badge {
  color: #56cc9d;
  z-index: 10;
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 150px;
}
</style>
    