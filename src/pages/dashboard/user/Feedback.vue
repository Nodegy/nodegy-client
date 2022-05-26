<template>
  <div class="feedback-page col-md-8">
    <page-title
      heading="Feedback"
      subheading="Please feel free to submit feedback and let us know about any issues you've run into, improvements you've thought of, things you like and things you don't like!"
      icon="pe-7s-note"
    ></page-title>
    <div class="card mb-3">
      <b-row align-h="center">
        <h1>Feedback</h1>
      </b-row>
      <b-row v-if="!successful">
        <b-col>
          <ValidationObserver
            ref="observer"
            v-slot="{ invalid }"
            @submit.prevent="onSave"
            @reset="resetForm"
          >
            <b-form>
              <ValidationProvider
                name="Subject"
                rules="required|min:3"
                v-slot="{ errors }"
              >
                <b-form-group
                  id="subject-group"
                  label="Enter a Subject"
                  label-for="subject-input"
                >
                  <b-form-input
                    id="subject-input"
                    v-model="feedback.subject"
                    type="text"
                    placeholder="(required)"
                    required
                  />
                  <b-form-invalid-feedback
                    class="auth-invalid-feedback"
                    :state="false"
                  >
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider
                name="Feedback"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-group
                  id="feedback-group"
                  label="Feedback"
                  label-for="feedback-input"
                >
                  <b-form-textarea
                    id="feedback-input"
                    v-model="feedback.body"
                    type="text"
                    placeholder="(required)"
                    rows="3"
                    max-rows="6"
                    required
                  />
                  <b-form-invalid-feedback
                    class="auth-invalid-feedback"
                    :state="false"
                  >
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <b-button :disabled="invalid" type="submit" variant="primary"
                >Submit</b-button
              >
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </ValidationObserver>
        </b-col>
      </b-row>
      <template
        v-if="displayMsg"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        <b-row align-h="center">
          {{ displayMsg }}
        </b-row>
        <b-row align-h="center">
          <b-button variant="primary" @click.prevent="submitMoreFeedback"
            >Submit more feedback?
          </b-button>
        </b-row>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Feedback from "@/models/feedback";
import PageTitle from "@/layout-dashboard/Components/PageTitle.vue";
import FeedbackService from "@/services/usr/feedback-service";
import { mapGetters } from "vuex";

import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormInvalidFeedback,
  BRow,
  BCol,
} from "bootstrap-vue";

export default {
  components: {
    PageTitle,
    "b-button": BButton,
    "b-form": BForm,
    "b-form-group": BFormGroup,
    "b-form-textarea": BFormTextarea,
    "b-form-input": BFormInput,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-row": BRow,
    "b-col": BCol,
  },
  data: () => ({
    feedback: new Feedback("", "", ""),
    successful: false,
    displayMsg: null,
  }),
  computed: {
    ...mapState("auth", ["user"]),
  },

  methods: {
    async onSave() {
      try {
        this.feedback.email = this.user.email;
        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
          return;
        }
        const confirm = await FeedbackService.create(this.feedback);

        if (confirm) {
          this.successful = true;
          this.displayMsg = "Feedback Successfully Submitted.";
        }
      } catch (err) {}
    },

    resetForm() {
      this.feedback = new Feedback("", "", "");
    },

    submitMoreFeedback() {
      this.resetForm();
      this.displayMsg = null;
      this.successful = false;
    },
  },
};
</script>

<style scoped>
</style>
