<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <ValidationProvider
      name="Username"
      rules="required|min:6|max:30"
      v-slot="{ errors }"
    >
      <fg-input
        type="text"
        v-model="user.username"
        class="no-border"
        placeholder="Username"
        addon-left-icon="pe-7s-user"
      />
      <b-form-invalid-feedback class="signup-invalid-feedback" :state="false">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </ValidationProvider>

    <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
      <fg-input
        class="no-border"
        v-model="user.email"
        type="email"
        placeholder="Email"
        addon-left-icon="pe-7s-mail"
      />
      <b-form-invalid-feedback class="signup-invalid-feedback" :state="false">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </ValidationProvider>

    <ValidationProvider
      name="Password"
      rules="required|min:6|max:30"
      vid="confirmation"
      v-slot="{ errors }"
    >
      <fg-input
        class="no-border"
        v-model="user.password"
        type="password"
        placeholder="Password"
        addon-left-icon="pe-7s-lock"
      />
      <b-form-invalid-feedback class="signup-invalid-feedback" :state="false">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </ValidationProvider>

    <ValidationProvider
      name="Password"
      rules="required|confirmed:confirmation"
      v-slot="{ errors }"
    >
      <fg-input
        class="no-border"
        v-model="form.confirmPassword"
        type="password"
        placeholder="Confirm Password"
        addon-left-icon="pe-7s-lock"
      />
      <b-form-invalid-feedback class="signup-invalid-feedback" :state="false">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </ValidationProvider>

    <div class="card-footer text-center">
      <RequestLimiterButton
        :disabled="invalid"
        id="join-mailing-list-button"
        v-on:click="handleRegister"
        inputStyle="background-color: #ffffff; color: #00838F"
        rounded
        :loading="loading"
      >
        Get Started
      </RequestLimiterButton>
    </div>
  </ValidationObserver>
</template>

<script>
import User from "@/models/user";
import { FormGroupInput, RequestLimiterButton } from "@/components";
import { BFormInvalidFeedback } from "bootstrap-vue";
import { getTimezone } from "@/helpers/index";
import { errorHandler } from "@/services/_utils/index";
import Preferences from "@/models/preferences";
import config from "@/config/config";

export default {
  name: "signup-allowed",
  components: {
    [FormGroupInput.name]: FormGroupInput,
    RequestLimiterButton,
    "b-form-invalid-feedback": BFormInvalidFeedback,
  },
  props: {
    signupKey: {
      type: String,
    },
  },
  data() {
    return {
      form: {
        confirmPassword: "",
      },
      loading: false,
      successful: false,
      user: new User("", "", "", "", ""),
    };
  },

  methods: {
    async handleRegister() {
      this.loading = true;
      this.message = "";
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      this.user.timezone = getTimezone();

      const signupsAllowed = config.ALLOW_SIGNUPS;
      if (!signupsAllowed) {
        this.user.key = this.signupKey;
      }

      try {
        const res = await this.$store.dispatch("auth/register", this.user);
        if (res && !res.isAxiosError) {
          this.successful = true;
          this.$store.dispatch("prefs/init", res.preferences);
          this.$router.push("/login").catch(() => {});
        }
      } catch (err) {
        const msg =
          "An error occured during signup.  Please refresh the page and try again, or contact support if the issue persists.";
        this.$emit("setMsg", {
          success: false,
          msg: msg,
        });
        errorHandler("Signup", "handleRegister", err);
        this.successful = false;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
