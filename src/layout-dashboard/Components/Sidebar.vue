<template>
  <div
    class="app-sidebar sidebar-shadow"
    @mouseover="toggleSidebarHover('add', 'closed-sidebar-open')"
    @mouseleave="toggleSidebarHover('remove', 'closed-sidebar-open')"
  >
    <div class="app-header__logo">
      <div class="logo-src" />
      <div class="header__pane ml-auto">
        <button
          type="button"
          class="hamburger close-sidebar-btn hamburger--elastic"
          v-bind:class="{ 'is-active': isOpen }"
          @click="toggleBodyClass('closed-sidebar')"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="app-sidebar-content">
      <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
        <sidebar-menu :menu="menu" />
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapState } from "vuex";
import ModRoutes from "@/router/routes/mod";
import UserRoutes from "@/router/routes/user";

export default {
  components: {
    SidebarMenu,
    VuePerfectScrollbar,
  },

  data() {
    return {
      isOpen: false,
      sidebarActive: false,
      user: this.$store.state.auth.user,
      username: this.$store.state.auth.user.username,
      menu: [],
      collapsed: true,
      windowWidth: 0,
      authorized: false,
      authRoles: ["moderator", "admin"],
    };
  },
  props: {
    sidebarbg: String,
  },

  created() {
    this.authRoles.forEach((role) => {
      this.authorized = this.user.roles.includes(role) ? true : this.authorized;
    });

    const menuHeader = [
      {
        header: true,
        title: "Navigation",
      },
    ];

    const userMenuHeader = [
      {
        header: true,
        title: "User",
      },
    ];
    const userRoutes = UserRoutes.map((route) => {
      return {
        title: route.title,
        icon: route.icon,
        href: {
          name: route.name,
          params: { user: this.username },
        },
      };
    });
    const userMenu = [...userMenuHeader, ...userRoutes];

    this.menu = [...this.menu, ...menuHeader, ...userMenu];

    if (this.authorized) {
      let modMenuHeader = [
        {
          header: true,
          title: "Mod",
        },
      ];
      let modRoutes = ModRoutes.map((route) => {
        return {
          title: route.title,
          icon: route.icon,
          href: {
            name: route.name,
            params: { user: this.username },
          },
        };
      });
      let modMenu = [...modMenuHeader, ...modRoutes];
      this.menu = [...this.menu, ...modMenu];
    }
  },

  mounted() {
    this.$nextTick(function () {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },

  methods: {
    toggleBodyClass(className) {
      const el = document.body;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    toggleSidebarHover(add, className) {
      const el = document.body;
      this.sidebarActive = !this.sidebarActive;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth > "992") {
        if (add === "add") {
          el.classList.add(className);
        } else {
          el.classList.remove(className);
        }
      }
    },
    getWindowWidth() {
      const el = document.body;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth < "1350") {
        el.classList.add("closed-sidebar", "closed-sidebar-md");
      } else {
        el.classList.remove("closed-sidebar", "closed-sidebar-md");
      }
    },
  },
};
</script>

