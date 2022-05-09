<template>
  <b-card class="text-center loader-view">
    <b-row>
      <b-col>
        <template v-if="attempts === 0">
          <b-spinner variant="primary" />
          <h4>Loading...</h4>
        </template>

        <template v-if="attempts > 0 && attempts < maxAttempts">
          <b-progress :value="counter" :max="retryTime" animated></b-progress>
          <h4>
            There was an error retrieving data.
            <br />
            please wait while we try again.
          </h4>
        </template>

        <h4 v-if="attempts === maxAttempts">
          There was an error retrieving data.
          <br />
          Please try reloading the page or come back later.
          <br />
          We apologize for the inconvenience!
        </h4>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import InitService from "@/services/initialize";
import { BCard, BCol, BProgress, BRow, BSpinner } from "bootstrap-vue";

export default {
  name: "Loader",
  components: {
    "b-card": BCard,
    "b-col": BCol,
    "b-progress": BProgress,
    "b-row": BRow,
    "b-spinner": BSpinner,
  },

  data() {
    return {
      counter: 0,
      timer: null,
      retryTime: 6,
      maxAttempts: 3,
      attempts: 0,
    };
  },

  props: {
    loggedIn: {
      type: Boolean,
      required: true,
    },
  },

  created() {
    this.initialize();
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },

  methods: {
    async initialize() {
      try {
        if (this.attempts < this.maxAttempts) {
          const loaded = await InitService.init(this.loggedIn);
          if (!loaded) {
            this.attempts += 1;
            this.$nextTick(() => {
              this.handleError();
            });
          }
        }
      } catch (err) {
        // console.log(err);
      }
    },

    handleError() {
      this.timer = setInterval(() => {
        this.counter += 0.5;
        if (this.counter === this.retryTime) {
          this.counter = 0;
          clearInterval(this.timer);
          this.timer = null;
          this.initialize();
        }
      }, 500);
    },
  },
};
</script>
<style scoped>
</style>