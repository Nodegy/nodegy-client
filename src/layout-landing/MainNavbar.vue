<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link :to="{ name: 'landing' }" @click.native="scrollToId('home')">
        <div class="navbar-brand">
          <div class="nav-brand-logo">
            <img src="img/logo/logo-black.png" alt="nodegy header logo icon" />
          </div>
          <div class="nav-brand-text">
            <img src="img/logo/brand-text.png" alt="nodegy header logo text" />
          </div>
        </div>
      </router-link>
    </template>

    <template slot="navbar-menu">
      <li
        v-bind:class="[
          this.$route.name == 'landing' && this.$route.hash == '#signup'
            ? 'nav-item active'
            : 'nav-item',
        ]"
      >
        <router-link
          class="nav-link"
          :to="{ name: 'landing' }"
          @click.native="scrollToId('signup')"
        >
          Sign Up
        </router-link>
      </li>
      <RouteComponent linkName="login" label="Login" />
    </template>
  </navbar>
</template>

<script>
import { mapGetters } from "vuex";
import { DropDown, Navbar, NavLink } from "@/components";
import RouteComponent from "@/layout-landing/components/RouteLinks";

export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    Navbar,
    RouteComponent,
  },

  methods: {
    scrollToId(id) {
      document.getElementById(id).scrollIntoView();
    },
  },
};
</script>