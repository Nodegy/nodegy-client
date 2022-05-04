<template>
  <li
    type="button"
    v-bind:class="[
      this.$route.name == linkName ? 'nav-item active' : 'nav-item',
    ]"
  >
    <router-link
      class="nav-link"
      :to="{ name: linkName, params: { user: username } }"
      custom
      v-slot="{ navigate }"
    >
      <span @click="navigate" @keypress.enter="navigate" role="link">{{
        label
      }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "Route-Links",
  props: {
    linkName: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "temp",
    },
    username: {
      type: String,
      default: "invalid",
    },
  },
};
</script>


