<template>
  <div class="p-3">
    <template v-if="loading">
      <b-spinner label="Loading..."></b-spinner>
    </template>
    <template v-else>
      <span v-if="isDeleting">
        <h5>
          Deleting the account will remove all of your data from Nodegy. Upon
          deleting you will be signed out and have 7 days to request recovering
          your account by emailing
          <span class="email">{{ contactEmail }}</span>
          before all data is permanently deleted.
          <br />
          <br />
          Please confirm below that you'd like to delete your account.
        </h5>
      </span>
      <b-button-group :size="isDeleting ? '' : 'sm'">
        <b-button v-if="isDeleting" variant="danger" @click.prevent="onDelete"
          >Delete</b-button
        >
        <b-button
          :variant="isDeleting ? 'primary' : 'danger'"
          @click.prevent="toggleIsDeleting"
        >
          <div class="d-flex">
            <i v-if="!isDeleting" class="material-icons md-18">delete</i>
            {{ isDeleting ? "Cancel" : "Delete Account" }}
          </div>
        </b-button>
      </b-button-group>
    </template>
  </div>
</template>

<script>
import UserService from "@/services/usr/user-service";
import { BButton, BButtonGroup, BSpinner } from "bootstrap-vue";
import Config from "@/config/config";

export default {
  name: "DeleteAccount",
  bodyClass: "delete-account",
  components: {
    "b-button": BButton,
    "b-button-group": BButtonGroup,
    "b-spinner": BSpinner,
  },

  data() {
    return {
      contactEmail: null,
      loading: false,
    };
  },

  props: {
    isDeleting: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.contactEmail = Config.NODEGY_CONTACT_EMAIL;
  },

  methods: {
    async onDelete() {
      try {
        const confirm = await UserService.deleteAccount();
        if (confirm) {
          this.$router.push("/");
        }
      } catch (err) {
        const msg = err.response;
        this.$emit("setMsg", err.response, true);
      }
    },

    toggleIsDeleting() {
      this.$emit("toggleIsDeleting");
    },
  },
};
</script>

<style scoped>
.loader-view {
  width: 50%;
}
</style>
    
    