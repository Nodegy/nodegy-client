<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <template v-if="!hasBetaKey">
      <div>
        NOTICE: General signup is currently unavailable while Nodegy is
        undergoing initial testing. If you'd like to be notified when signup is
        available, join our mailing list!
      </div>
      <ValidationProvider
        name="Email"
        rules="required|email"
        v-slot="{ errors }"
      >
        <fg-input
          class="no-border mt-4"
          v-model="form.email"
          type="email"
          placeholder="email"
          addon-left-icon="pe-7s-mail"
          v-on:enter="$refs.joinMailingListButton.handleClick()"
        />
        <b-form-invalid-feedback class="signup-invalid-feedback" :state="false">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </ValidationProvider>

      <div class="text-center">
        <RequestLimiterButton
          :disabled="invalid"
          id="join-mailing-list-button"
          v-on:click="addToMailingList"
          inputStyle="background-color: #ffffff; color: #00838F"
          rounded
          :loading="loading"
          ref="joinMailingListButton"
        >
          Join Mailing List!
        </RequestLimiterButton>
      </div>
    </template>
    <template v-if="hasBetaKey">
      <div class="text-center">
        <p>Enter beta signup key:</p>
      </div>
      <ValidationProvider
        name="Key"
        rules="required|min:3|max:16"
        v-slot="{ errors }"
      >
        <fg-input
          class="no-border"
          v-model="form.signupKey"
          type="text"
          placeholder="key"
          addon-left-icon="pe-7s-key"
          v-on:enter="$refs.signupKeyButton.handleClick()"
        />
        <b-form-invalid-feedback class="signup-invalid-feedback" :state="false">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </ValidationProvider>

      <div class="text-center">
        <RequestLimiterButton
          :disabled="invalid"
          id="signup-key-button"
          v-on:click="handleSignupKey"
          inputStyle="background-color: #ffffff; color: #00838F"
          size="lg"
          rounded
          :loading="loading"
          ref="signupKeyButton"
        >
          Sumbit
        </RequestLimiterButton>
      </div>
    </template>
  </ValidationObserver>
</template>

<script>
import SignupKeysService from "@/services/auth/signup-keys-service";
import MailingListService from "@/services/auth/mailing-list-service";
import { BFormInvalidFeedback } from "bootstrap-vue";
import { FormGroupInput, RequestLimiterButton } from "@/components";

export default {
  name: "signup-not-allowed",
  components: {
    [FormGroupInput.name]: FormGroupInput,
    RequestLimiterButton,
    "b-form-invalid-feedback": BFormInvalidFeedback,
  },
  props: {
    hasBetaKey: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        email: "",
        signupKey: "",
      },
      loading: false,
    };
  },

  methods: {
    async addToMailingList() {
      this.loading = true;
      try {
        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
          this.loading = false;
          return;
        }
        const confirm = await MailingListService.add(this.form.email);
        if (confirm) {
          this.$emit("setMsg", {
            success: true,
            msg: "Email address added to mailing list!",
          });
        }
      } catch (err) {
        if (err.response.status === 400) {
          this.$emit("setMsg", {
            success: false,
            msg: "Email is already on the mailing list.",
          });
        }
      } finally {
        this.loading = false;
      }
    },
    async handleSignupKey() {
      this.loading = true;
      try {
        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
          this.loading = false;
          return;
        }
        const verified = await SignupKeysService.verifySignupKey(
          this.form.signupKey
        );
        if (verified) {
          this.$emit("setMsg", {
            success: true,
            msg: "Signup unlocked with key",
          });
          this.$emit("toggleSignupsAllowed", this.form.signupKey);
        }
      } catch (err) {
        if (err.response.status === 400) {
          this.$emit("setMsg", {
            success: false,
            msg: "Invalid Key.",
          });
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
