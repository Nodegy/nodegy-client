<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <span> Please check your email for the verification code. </span>
    <ValidationProvider
      name="Verification Code"
      rules="required|min:6|max:6"
      v-slot="{ errors }"
    >
      <fg-input
        type="text"
        v-model="form.vCode"
        class="no-border input-lg"
        addon-left-icon="pe-7s-lock"
        placeholder="Verification Code"
        :state="null"
      />
      <b-form-invalid-feedback class="auth-invalid-feedback" :state="false"
        >{{ errors[0] }}
      </b-form-invalid-feedback>
    </ValidationProvider>

    <ValidationProvider
      name="Password"
      rules="required|min:6|max:30"
      vid="confirmation"
      v-slot="{ errors }"
    >
      <fg-input
        type="password"
        v-model="form.password"
        class="no-border input-lg"
        addon-left-icon="pe-7s-lock"
        placeholder="New Password"
        :state="null"
      />
      <b-form-invalid-feedback class="auth-invalid-feedback" :state="false">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </ValidationProvider>

    <ValidationProvider
      name="Password"
      rules="required|confirmed:confirmation"
      v-slot="{ errors }"
    >
      <fg-input
        type="password"
        v-model="form.confirmPassword"
        class="no-border input-lg"
        addon-left-icon="pe-7s-lock"
        placeholder="Confirm Password"
        :state="null"
      />
      <b-form-invalid-feedback class="auth-invalid-feedback" :state="false">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </ValidationProvider>

    <RequestLimiterButton
      :disabled="invalid"
      id="reset-password-confirm"
      v-on:click="onResetPassword"
      isBlock
      rounded
      variant="primary"
      :loading="loading"
    >
      Confirm
    </RequestLimiterButton>
  </ValidationObserver>
</template>

<script>
import AuthService from "@/services/auth/auth-service";
import { Card, FormGroupInput, RequestLimiterButton } from "@/components";
import { BFormInvalidFeedback, BCard } from "bootstrap-vue";

export default {
  name: "ResetPassword",
  components: {
    RequestLimiterButton,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    [FormGroupInput.name]: FormGroupInput,
  },

  props: {
    email: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      form: {
        email: "",
        vCode: "",
        password: "",
        confirmPassword: "",
      },
      loading: false,
      message: null,
    };
  },

  created() {
    this.form.email = this.email;
  },

  methods: {
    async onResetPassword() {
      this.looading = true;
      try {
        let isValid = await this.$refs.observer.validate();
        if (!isValid) {
          return;
        }

        let confirmUpdate = await AuthService.resetPw(
          this.form.email,
          this.form.vCode,
          this.form.password
        );

        if (confirmUpdate) {
          this.$emit("setMsg", {
            msg: "Password updated successfully!",
            isErr: false,
          });
          this.onComplete();
        }
      } catch (err) {
        this.$emit("setMsg", {
          msg: `${err.response.data.message}. Please try again.`,
          isErr: true,
        });
      } finally {
        this.loading = false;
      }
    },

    onComplete() {
      this.$emit("complete");
      this.form = {
        email: "",
        vCode: "",
        password: "",
        confirmPassword: "",
      };
    },
  },
};
</script>
<style>
</style>
