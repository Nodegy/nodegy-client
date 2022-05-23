<template>
  <div
    class="section section-signup"
    style="background-image: url('img/landing/signup/hold-graph-up.jpg')"
  >
    <div class="container">
      <div class="col">
        <div class="row">
          <card class="card-signup" header-classes="text-center" color="orange">
            <template slot="header">
              <h3 class="card-title title-up">Sign Up</h3>
            </template>
            <SignupAllowed
              v-if="signupsAllowed"
              :signupKey="form.signupKey"
              v-on:setMsg="setMsg"
            />

            <SignupNotAllowed
              v-else
              :hasBetaKey="hasBetaKey"
              v-on:toggleSignupsAllowed="toggleSignupsAllowed"
              v-on:showSignupWithKey="showSignupWithKey = true"
              v-on:setMsg="setMsg"
            />

            <div style="min-height: 60px">
              <div
                v-if="message"
                class="alert"
                :class="success ? 'alert-success' : 'alert-danger'"
              >
                {{ message }}
              </div>
            </div>
            <div class="text-center">
              <div v-if="showSignupWithKey" class="d-flex mx-auto text-center">
                <p v-if="!hasBetaKey" class="ml-5">have beta key?</p>
                <a
                  :class="hasBetaKey ? 'mx-auto' : 'ml-2'"
                  style="color: blue; cursor: pointer"
                  @click.prevent="toggleHasBetaKey"
                >
                  {{ hasBetaKey ? "Cancel" : "Signup with Key" }}
                </a>
              </div>
              <div class="d-flex mx-auto">
                <p class="ml-5">Already have an account?</p>
                <router-link to="/login" style="color: blue" class="ml-2">
                  Sign In
                </router-link>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components";
import { SignupAllowed, SignupNotAllowed } from "./components/index";
import config from "@/config/config";

export default {
  name: "Signup",
  components: {
    Card,
    SignupAllowed,
    SignupNotAllowed,
  },
  data: () => ({
    form: {
      signupKey: null,
    },
    hasBetaKey: false,
    message: "",
    signupsAllowed: false,
    showSignupWithKey: false,
    success: false,
  }),

  mounted() {
    this.signupsAllowed = !config.REQUIRE_SIGNUP_KEY;
    if (!this.signupsAllowed) {
      this.showSignupWithKey = true;
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    toggleHasBetaKey() {
      this.hasBetaKey = !this.hasBetaKey;
      this.showSignupWithKey = this.hasBetaKey ? false : true;
    },
    toggleSignupsAllowed(signupKey) {
      this.form.signupKey = signupKey;
      this.signupsAllowed = true;
    },
    setMsg(msg) {
      this.message = msg.msg;
      this.success = msg.success;

      setTimeout(() => {
        this.message = null;
      }, 5000);
    },
  },
};
</script>
<style></style>