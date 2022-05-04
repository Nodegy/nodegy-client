<template>
  <div class="section section-footer" data-background-color="black">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="text-center col-md-12 col-lg-8">
          <h3 class="title">Contact Us</h3>
          <h5 class="description"></h5>
        </div>
      </div>

      <div class="row justify-content-md-center sharing-area text-center">
        <div class="text-center col-md-12 col-lg-8">
          <a
            target="_blank"
            class="btn btn-neutral btn-icon btn-round btn-lg hover"
          >
            <router-link to="/emailus">
              <i class="material-icons md-56">mail</i>
            </router-link>
          </a>

          <a class="mx-2" target="_blank" :href="discord_invite_link">
            <img
              class="btn btn-icon btn-round btn-lg hover"
              src="img/social-media/discord-icon.svg"
              alt="discord"
            />
          </a>
          <!-- <a target="_blank" href="https://www.linkedin.com/">
            <img
              class="btn btn-icon btn-round btn-lg hover"
              src="img/social-media/linkedin-icon.png"
              alt="linkedin"
            />
          </a> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Config from "@/config/config";
export default {
  data() {
    return {
      discord_invite_link: null,
    };
  },

  mounted() {
    this.discord_invite_link = Config.NODEGY_DISCORD_INVITE;
  },
};
</script>
<style></style>
