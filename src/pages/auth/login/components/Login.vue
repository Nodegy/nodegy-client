<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <ValidationProvider
      name="Email or Username"
      rules="required|min:3"
      v-slot="{ errors }"
    >
      <fg-input
        type="text"
        v-model="user.username"
        class="no-border input-lg"
        addon-left-icon="pe-7s-user"
        placeholder="Email or Username"
        v-on:enter="$refs.loginButton.handleClick()"
      />
      <b-form-invalid-feedback class="auth-invalid-feedback" :state="false">
        <span v-if="showErrors">
          {{ errors[0] }}
        </span>
      </b-form-invalid-feedback>
    </ValidationProvider>

    <ValidationProvider
      name="Password"
      rules="required|min:6"
      v-slot="{ errors }"
    >
      <fg-input
        type="password"
        v-model="user.password"
        class="no-border input-lg"
        addon-left-icon="pe-7s-lock"
        placeholder="Password"
        :state="null"
        v-on:enter="$refs.loginButton.handleClick()"
      />
      <b-form-invalid-feedback class="auth-invalid-feedback" :state="false">
        <span v-if="showErrors">
          {{ errors[0] }}
        </span>
      </b-form-invalid-feedback>
    </ValidationProvider>
    <b-form-checkbox
      id="save-un-checkbox"
      v-model="saveUsername"
      name="save-un-checkbox"
      @input="onSaveUn"
      >Save Email/Username</b-form-checkbox
    >
    <RequestLimiterButton
      :disabled="invalid"
      id="login-button-1"
      v-on:click="handleLogin"
      rounded
      :isBlock="true"
      :loading="loading"
      variant="primary"
      ref="loginButton"
    >
      Login
    </RequestLimiterButton>
  </ValidationObserver>
</template>

<script>
import User from "@/models/user";
import AuthService from "@/services/auth/auth-service";
import { FormGroupInput, RequestLimiterButton } from "@/components";
import { BFormInvalidFeedback, BFormCheckbox } from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "LoginWindow",
  components: {
    "b-form-checkbox": BFormCheckbox,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    [FormGroupInput.name]: FormGroupInput,
    RequestLimiterButton,
  },

  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: null,
      saveUsername: false,
      showErrors: false,
    };
  },

  mounted() {
    const prefs = this.$store.state.prefs;
    if (prefs && prefs.saveUn && prefs.saveUn.save && prefs.saveUn.un) {
      this.saveUsername = true;
      this.user.username = prefs.saveUn.un;
    }
  },

  methods: {
    async handleLogin() {
      if (this.loading) {
        return;
      }
      this.showErrors = true;
      this.loading = true;

      try {
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
          this.$router.push(`/dashboard/${this.user.username}/strategy`);
        }
      } catch (err) {
        const status = err.response.status;
        let msg;
        if (status === 401) {
          msg = "Invalid Password";
        } else if (status === 404) {
          msg = "User doesn't exist";
        } else {
          err.response.data.message || err.message || err.toString();
        }
        this.loading = false;
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
