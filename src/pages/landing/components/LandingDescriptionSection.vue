<template>
  <div id="landing-description" class="section section-description">
    <div class="section-description-image">
      <img
        class="di-arrow appear"
        src="img/landing/description-image/2-arrow.png"
        alt="arrow"
      />
      <b-row align-v="center">
        <b-col>
          <div class="ld-1 reveal">
            <div class="ld-item">
              <div class="landing-description">
                <h2 class="title">Create</h2>
                <h5 class="description">
                  Easily create your custom trading strategy using any 3rd party
                  signals utilizing Webhooks!
                  <br />
                  <br />
                  Send the provided payload from your 3rd party data source to
                  Nodegy.
                </h5>
              </div>
            </div>

            <div class="ld-item">
              <img
                src="img/landing/description-image/3-files.png"
                alt="files"
              />
            </div>
          </div>
        </b-col>

        <b-col>
          <b-row class="m-0 p-0 reveal">
            <div class="ld-2">
              <div class="ld-item">
                <img
                  src="img/landing/description-image/1-logo.png"
                  alt="nodegy logo"
                />
              </div>
              <div class="ld-item">
                <div class="landing-description">
                  <h2 class="title">Automate</h2>
                  <h5 class="description">
                    The input signals that you setup will be applied to your
                    strategy conditions as they come in.
                    <br />
                    <br />
                    When all conditions are met, the output alerts that you
                    configure will be triggered!
                  </h5>
                </div>
              </div>
            </div>
          </b-row>
        </b-col>

        <b-col>
          <div class="ld-3 reveal">
            <div class="ld-item">
              <div class="landing-description">
                <h2 class="title">Trade</h2>
                <h5 class="description">
                  Save time jumping between charts to execute the perfect entry
                  or exit when all of your conditions match!
                  <br />
                  <br />
                  Setup your custom strategy to trigger a trading bot, email, or
                  discord message!
                </h5>
              </div>
            </div>

            <div class="ld-item">
              <img
                src="img/landing/description-image/4-output.png"
                alt="output to bot, email, discord"
              />
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { BCol, BRow } from "bootstrap-vue";

export default {
  name: "landing-description-section",
  components: {
    "b-col": BCol,
    "b-row": BRow,
  },
  data() {
    return {};
  },
};
</script>
