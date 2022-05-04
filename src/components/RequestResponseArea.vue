<template>
  <div class="request-response-alert">
    <b-alert
      v-if="newNotification"
      class="text-center"
      dismissible
      fade
      :show="dismissCountDown"
      :variant="newNotification.variant"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ newNotification.message }}
    </b-alert>
  </div>
</template>

<script>
import { BAlert } from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "RequestResponseArea",
  components: {
    "b-alert": BAlert,
  },

  data() {
    return {
      newNotification: null,
      dismissSecs: 8,
      dismissCountDown: 0,
    };
  },

  computed: {
    ...mapGetters({
      requestReponses: "notification/getRequestResponses",
    }),
  },

  watch: {
    requestReponses: {
      handler(val) {
        this.newNotification = val[0];
        this.dismissCountDown = this.dismissSecs;
        if (!val[0].success) {
          this.$emit("isErr");
        }
        return;
      },
    },
  },

  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
};
</script>
