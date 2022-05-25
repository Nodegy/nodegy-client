<template>
  <div>
    <ValidationObserver v-if="!showResetPw" ref="observer" v-slot="{ invalid }">
      <span>
        Please Input the email address associated to your account to receive a
        verification code for Password Reset
      </span>
      <ValidationProvider
        name="Email"
        rules="required|email"
        v-slot="{ errors }"
      >
        <fg-input
          type="text"
          v-model="form.email"
          class="no-border input-lg"
          addon-left-icon="pe-7s-mail"
          placeholder="Email"
          :state="null"
          v-on:enter="$refs.inputEmailSendCodeButton.handleClick()"
        />
        <b-form-invalid-feedback class="auth-invalid-feedback" :state="false">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </ValidationProvider>

      <RequestLimiterButton
        :disabled="invalid"
        id="input-email-send-code"
        v-on:click="onSendCode"
        isBlock
        rounded
        variant="primary"
        :loading="loading"
        ref="inputEmailSendCodeButton"
      >
        Send Code
      </RequestLimiterButton>

      <RequestLimiterButton
        :disabled="invalid"
        id="input-email-have-code"
        v-on:click="onHaveCode"
        isBlock
        rounded
        variant="success"
        :loading="loading"
      >
        Already have Code?
      </RequestLimiterButton>
    </ValidationObserver>

    <ResetPassword
      v-if="showResetPw"
      :email="form.email"
      v-on:setMsg="onSetMsg"
      v-on:complete="onComplete"
    />
  </div>
</template>

<script>
import EmailService from "@/services/auth/email-service";
import { ResetPassword } from "@/pages/auth/login/components";
import { Card, FormGroupInput, RequestLimiterButton } from "@/components";
import { BFormInvalidFeedback } from "bootstrap-vue";

export default {
  name: "InputEmail",
  components: {
    ResetPassword,
    RequestLimiterButton,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    [FormGroupInput.name]: FormGroupInput,
  },

  data() {
    return {
      form: {
        email: "",
      },
      loading: false,
      message: null,
      showResetPw: false,
    };
  },

  methods: {
    async onSendCode() {
      try {
        this.loading = true;
        const isValid = await this.$refs.observer.validate();

        if (!isValid) {
          return;
        }
        const email = this.form.email.toLowerCase();
        const confirm = await EmailService.sendPwResetVCode(email);

        if (confirm) {
          this.$emit("setMsg", {
            msg: "New code sent successfully!",
            isErr: false,
          });
          this.showResetPw = true;
        }
      } catch (err) {
        this.$emit("setMsg", { msg: err.response.data.message, isErr: true });
      } finally {
        this.loading = false;
      }
    },

    async onHaveCode() {
      try {
        let exists = await EmailService.checkEmailExists(this.form.email);
        if (exists) {
          this.showResetPw = true;
          return;
        }
      } catch (err) {
        this.$emit("setMsg", {
          msg: err.response.data.message,
          isErr: true,
        });
      }
    },

    onComplete() {
      this.$emit("complete");
      this.showResetPw = false;
      this.form.email = "";
    },

    onSetMsg(msg) {
      this.$emit("setMsg", msg);
    },
  },
};
</script>
<style>
</style>
