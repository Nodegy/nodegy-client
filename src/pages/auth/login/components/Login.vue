<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <ValidationProvider name="Email or Username" rules="required|min:3">
      <fg-input
        type="text"
        v-model="user.username"
        class="no-border input-lg"
        addon-left-icon="pe-7s-user"
        placeholder="Email or Username"
        autofocus
        :disabled="loading"
      />
      <b-form-invalid-feedback class="auth-invalid-feedback" :state="false">
      </b-form-invalid-feedback>
    </ValidationProvider>

    <ValidationProvider name="Password" rules="required|min:6">
      <fg-input
        type="password"
        v-model="user.password"
        class="no-border input-lg"
        addon-left-icon="pe-7s-lock"
        placeholder="Password"
        :state="null"
        :disabled="loading"
      />
      <b-form-invalid-feedback class="auth-invalid-feedback" :state="false">
      </b-form-invalid-feedback>
    </ValidationProvider>
    <b-form-checkbox
      id="save-un-checkbox"
      v-model="saveUsername"
      name="save-un-checkbox"
      @input="onSaveUn"
      >Save Email/Username</b-form-checkbox
    >
    <b-button
      block
      :disabled="invalid"
      type="submit"
      pill
      variant="primary"
      @click.prevent="handleLogin"
    >
      <template v-if="loading">
        <b-spinner small />
      </template>
      <template v-else> Login </template>
    </b-button>
  </ValidationObserver>
</template>

<script>
import User from "@/models/user";
import AuthService from "@/services/auth/auth-service";
import { FormGroupInput } from "@/components";
import {
  BButton,
  BFormInvalidFeedback,
  BFormCheckbox,
  BSpinner,
} from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "LoginWindow",
  components: {
    "b-button": BButton,
    "b-form-checkbox": BFormCheckbox,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-spinner": BSpinner,
    [FormGroupInput.name]: FormGroupInput,
  },

  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: null,
      saveUsername: false,
    };
  },

  mounted() {
    const prefs = this.$store.state.prefs;
    if (prefs && prefs.saveUn && prefs.saveUn.save && prefs.saveUn.un) {
      this.saveUsername = true;
      this.user.username = prefs.saveUn.un;
    }
  },

  computed: {
    ...mapGetters({
      isConfirmed: "auth/getIsConfirmed",
    }),
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  created() {
    if (this.loggedIn && this.isConfirmed) {
      const username = this.$store.state.auth.user.username;
      this.$router.push(`/dashboard/${username}/strategy`);
    }
  },

  methods: {
    async handleLogin() {
      try {
        this.loading = true;

        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (!this.user.username && this.user.password) {
          return;
        }
        const confirm = await AuthService.login(this.user);
        if (confirm) {
          if (this.saveUsername) {
            this.$store.dispatch("prefs/saveUsername", {
              bool: true,
              un: this.user.username,
            });
          }
        }
      } catch (err) {
        this.loading = false;
        const msg = err.response.data.message || err.message || err.toString();
        this.$emit("setMsg", { msg: msg, isErr: true });
      }
    },

    onSaveUn(bool) {
      if (!bool) {
        this.$store.dispatch("prefs/saveUsername", {
          save: false,
          un: null,
        });
      }
    },

    onShowVerify() {
      this.$emit("showVerify");
    },
  },
};
</script>
<style>
</style>
