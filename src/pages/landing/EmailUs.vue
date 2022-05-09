<template>
  <div class="page-header clear-filter email-us-page">
    <div
      class="page-header-image"
      style="background-image: url('img/landing/email-us/purple-smoke-bg.jfif')"
    ></div>
    <div class="email-us-form-section">
      <b-row align-v="center">
        <b-col />
        <b-col cols="8">
          <page-title
            heading="Contact Us"
            subheading="Thank you for taking the time to send us a message!"
          >
            <i class="material-icons md-36" style="color: black">description</i>
          </page-title>
        </b-col>
        <b-col />
      </b-row>
      <b-row>
        <b-col />
        <b-col cols="8">
          <b-card>
            <template v-if="showForm">
              <ValidationObserver
                ref="observer"
                v-slot="{ invalid }"
                @submit.prevent="onSave"
                @reset="resetForm"
              >
                <b-form>
                  <ValidationProvider
                    name="Email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <b-form-group
                      id="email-group"
                      label="Enter your Email Address"
                      label-for="email-input"
                    >
                      <b-form-input
                        id="email-input"
                        v-model="feedback.email"
                        type="text"
                        placeholder="email"
                        required
                      />
                      <b-form-invalid-feedback :state="false">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

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
                        placeholder="subject"
                        required
                      />
                      <b-form-invalid-feedback :state="false">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <ValidationProvider
                    name="Message"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <b-form-group
                      id="message-group"
                      label="What message would you like to send us?"
                      label-for="message-input"
                    >
                      <b-form-textarea
                        id="message-input"
                        v-model="feedback.body"
                        type="text"
                        placeholder="message"
                        rows="3"
                        max-rows="6"
                        required
                      />
                      <b-form-invalid-feedback :state="false">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <b-row>
                    <div class="mx-auto">
                      <b-button
                        :disabled="invalid"
                        type="submit"
                        :variant="invalid ? '' : 'primary'"
                        >Submit</b-button
                      >
                      <b-button type="reset" variant="danger">Reset</b-button>
                    </div>
                  </b-row>
                </b-form>
              </ValidationObserver>
            </template>

            <template v-else>
              <b-row align-h="center" class="m-5">
                <div :class="successful ? 'text-success' : 'text-danger'">
                  <h3>
                    <template v-if="successful">
                      Email Successfully Submitted!
                    </template>
                    <template v-else> An Error Occurred </template>
                  </h3>
                  <h4>
                    <template v-if="successful">
                      We look forward to reading your message!
                    </template>
                    <template v-else>
                      Please refresh the page and try again. We apologize for
                      the inconvenience!
                    </template>
                  </h4>
                </div>
              </b-row>
              <b-row align-h="center">
                <b-button
                  v-if="successful"
                  variant="primary"
                  @click.prevent="submitMoreFeedback"
                  >Reset Form?
                </b-button>
                <b-button v-else variant="primary" @click="refreshPage"
                  >Refresh Page</b-button
                >
              </b-row>
            </template>
          </b-card>
        </b-col>
        <b-col />
      </b-row>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/layout-dashboard/Components/PageTitle.vue";
import Feedback from "@/models/feedback";
import {
  BButton,
  BCard,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormTextarea,
  BRow,
} from "bootstrap-vue";
export default {
  name: "email-us",
  components: {
    PageTitle,
    "b-button": BButton,
    "b-card": BCard,
    "b-col": BCol,
    "b-form": BForm,
    "b-form-group": BFormGroup,
    "b-form-input": BFormInput,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-form-textarea": BFormTextarea,
    "b-row": BRow,
  },
  data() {
    return {
      feedback: new Feedback("", "", ""),
      showForm: true,
      successful: false,
    };
  },

  methods: {
    async onSave() {
      try {
        // TODO: Test with backend
        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
          return;
        }

        this.showForm = false;
        this.successful = (await FeedbackService.create(this.feedback))
          ? true
          : false;
      } catch (err) {
        // console.log(err);
      }
    },

    refreshPage() {
      location.reload();
    },

    resetForm() {
      this.feedback = new Feedback("", "", "");
    },

    submitMoreFeedback() {
      this.resetForm();
      this.displayMsg = null;
      this.successful = false;
      this.showForm = true;
    },
  },
};
</script>