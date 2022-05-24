<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <template v-if="!resendCode">
      <div class="pb-2">
        <h6 style="color: red">do not refresh page</h6>
        <h5>
          Please provide the verification code that was sent to your email
          address to finish setting up your account.
        </h5>
      </div>

      <ValidationProvider
        name="Verification Code"
        rules="required|min:6|max:6"
        v-slot="{ errors }"
      >
        <b-form-input
          type="text"
          v-model="vCode"
          placeholder="6 digit verification code"
          autofocus
        />
        <b-form-invalid-feedback class="auth-invalid-feedback" :state="false"
          >{{ errors[0] }}
        </b-form-invalid-feedback>
      </ValidationProvider>

      <RequestLimiterButton
        :disabled="invalid"
        id="confirm-account-confirm"
        v-on:click="onConfirm"
        isBlock
        rounded
        variant="primary"
        :loading="loading"
      >
        Confirm
      </RequestLimiterButton>
      <div class="d-flex justify-content-between">
        <h6>
          <a
            @click.prevent="onShowSendNew"
            class="btn bg-transparent link td-hover"
            >Send new verification code</a
          >
        </h6>
        <h6>
          <a
            @click.prevent="onCancel"
            style="color: #00ffff"
            class="btn bg-transparent link td-hover"
            >Cancel</a
          >
        </h6>
      </div>
    </template>
    <template v-if="resendCode">
      <div>
        <h5>
          Please confirm your email address to receive a new verification code.
        </h5>
      </div>
      <ValidationProvider
        name="Email"
        rules="required|email"
        v-slot="{ errors }"
      >
        <b-form-input
          type="text"
          v-model="email"
          placeholder="confirm email address"
          autofocus
        />
        <b-form-invalid-feedback class="auth-invalid-feedback" :state="false"
          >{{ errors[0] }}
        </b-form-invalid-feedback>

        <RequestLimiterButton
          :disabled="invalid"
          id="confirm-account-send-new-code"
          v-on:click="onSendNewCode"
          isBlock
          rounded
          variant="primary"
          :loading="loading"
        >
          Send New Code
        </RequestLimiterButton>

        <h6>
          <a
            @click.prevent="onShowSendNew"
            style="color: #00ffff"
            class="btn bg-transparent link td-hover"
            >Cancel</a
          >
        </h6>
      </ValidationProvider>
    </template>
  </ValidationObserver>
</template>
<script>
import AuthService from "@/services/auth/auth-service";
import EmailService from "@/services/auth/email-service";
import { getTimezone } from "@/helpers/index";
import { RequestLimiterButton } from "@/components";
import { BFormInvalidFeedback, BFormInput } from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "confirm-account",

  components: {
    RequestLimiterButton,
    "b-form-input": BFormInput,
    "b-form-invalid-feedback": BFormInvalidFeedback,
  },

  data() {
    return {
      vCode: null,
      email: null,
      loading: false,
      resendCode: false,
    };
  },

  computed: {
    ...mapGetters({
      currentUser: "auth/getUser",
    }),
  },

  methods: {
    async onConfirm() {
      this.loading = true;
      let confirm;
      let username;
      try {
        const isValid = await this.$refs.observer.validate();

        if (!isValid) {
          return;
        }

        username = this.currentUser.username;
        const timezone = getTimezone();
        confirm = await AuthService.confirm(
          this.currentUser.email,
          this.currentUser.signupKey,
          timezone,
          this.vCode
        );
      } catch (err) {
        this.$emit("setMsg", { msg: "Invalid Code", isErr: true });
      } finally {
        if (confirm) {
          const login = await AuthService.login({
            username: this.currentUser.email,
            password: this.currentUser.password,
          });
          if (login) {
            this.$nextTick(() => {
              this.$router.push(`/dashboard/${username}/strategy`);
            });
          }
        }
        this.loading = false;
      }
    },

    onCancel() {
      this.$store.dispatch("auth/cancelWaitingVerification");
    },

    onShowSendNew() {
      this.email = null;
      this.vCode = null;
      this.resendCode = !this.resendCode;
    },

    async onSendNewCode() {
      this.loading = true;
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      const newEmail = this.email.toLowerCase();
      const oldEmail = this.currentUser.email.toLowerCase();

      try {
        const confirmSend = await EmailService.sendVCode(newEmail, oldEmail);
        if (confirmSend) {
          this.$emit("setMsg", {
            msg: "New key successfully sent to the provided address.",
            isErr: false,
          });
          this.onShowSendNew();
        }
      } catch (err) {
        this.$emit("setMsg", {
          msg: err,
          isErr: true,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

