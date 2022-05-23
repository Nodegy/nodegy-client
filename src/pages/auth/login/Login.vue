<template>
  <div class="page-header clear-filter">
    <div
      class="page-header-image"
      style="background-image: url('img/login/login.jfif')"
    ></div>

    <div class="container">
      <div class="col-md-5 ml-auto mr-auto">
        <card type="login" plain>
          <div slot="header" class="logo-container">
            <img v-lazy="'img/logo/logo.png'" alt="" />
          </div>
          <ConfirmAccount v-if="waitingVerification" v-on:setMsg="setMsg" />

          <template v-else>
            <Login v-if="!showVerify" v-on:setMsg="setMsg" />

            <InputEmail
              v-if="showVerify"
              v-on:complete="showVerify = false"
              v-on:setMsg="setMsg"
            />

            <template v-if="!showVerify">
              <div class="pull-left">
                <h6>
                  <router-link
                    class="link footer-link"
                    :to="{ name: 'landing', hash: '#signup' }"
                  >
                    Create Account
                  </router-link>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a
                    href="#"
                    class="link footer-link"
                    @click.prevent="(showVerify = true), (msg = null)"
                    >Forgot Password?</a
                  >
                </h6>
              </div>
            </template>
            <template v-else>
              <div class="text-center">
                <h6>
                  <a
                    href="#"
                    class="link footer-link"
                    @click.prevent="(showVerify = false), (msg = null)"
                    >Cancel</a
                  >
                </h6>
              </div>
            </template>
          </template>
        </card>
        <div :class="`text-center ${msgClr} my-2`">
          <b>{{ msg }}</b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import User from "@/models/user";
import {
  ConfirmAccount,
  Login,
  InputEmail,
} from "@/pages/auth/login/components";
import { Card } from "@/components";
import { mapGetters } from "vuex";

export default {
  name: "login",
  bodyClass: "login-page",
  components: {
    ConfirmAccount,
    Login,
    InputEmail,
    Card,
  },

  data() {
    return {
      msg: null,
      showVerify: false,
      msgClr: null,
    };
  },

  computed: {
    ...mapGetters({
      waitingVerification: "auth/getIsWaitingVerification",
    }),
  },

  methods: {
    setMsg(msg) {
      this.msgClr = msg.isErr ? "text-danger" : "text-success";
      this.msg = msg.msg;
      setTimeout(() => (this.msg = null), 10000);
    },
  },
};
</script>
<style>
</style>
