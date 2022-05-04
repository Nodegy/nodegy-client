<template>
  <div>
    <div id="home" class="page-header clear-filter" filter-color="clear">
      <parallax
        class="page-header-image"
        style="background-image: url('img/landing/header.jfif')"
      >
      </parallax>
      <div class="container">
        <div class="content-center">
          <div class="header-logo-container">
            <img
              class="header-logo-icon"
              src="img/logo/logo-chrome.png"
              alt="nodegy header logo icon"
            />
          </div>

          <img
            class="header-logo-text"
            src="img/logo/brand-text.png"
            alt="nodegy header logo text"
          />
          <div class="d-flex justify-content-center">
            <h3
              type="button"
              @click.prevent="scrollToElem('section-description')"
              class="m-3 hover"
            >
              Create.
            </h3>

            <h3
              type="button"
              @click.prevent="scrollToElem('section-description')"
              class="m-3 hover"
            >
              Automate.
            </h3>
            <h3
              type="button"
              @click.prevent="scrollToElem('section-description')"
              class="m-3 hover"
            >
              Trade.
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="section section-images">
      <div class="landing-images-container">
        <img
          class="landing-image translate-up reveal"
          src="img/landing/graph-with-trends.png"
          alt=""
        />
      </div>
    </div>

    <LandingDescriptionSection />

    <SignupForm id="signup"></SignupForm>

    <CheckUsOutSection></CheckUsOutSection>
  </div>
</template>
<script>
import { Parallax } from "@/components";
import {
  CheckUsOutSection,
  LandingDescriptionSection,
  SignupForm,
} from "@/pages/landing/components/index";

export default {
  name: "landing",
  bodyClass: "landing-page",
  components: {
    LandingDescriptionSection,
    Parallax,
    SignupForm,
    CheckUsOutSection,
  },

  created() {
    window.addEventListener("scroll", this.reveal);
  },
  destroyed() {
    window.removeEventListener("scroll", this.reveal);
  },

  mounted() {
    this.reveal;
  },

  methods: {
    reveal() {
      const toggleActive = (changePoint, elem, scrollY) => {
        if (scrollY > changePoint && !elem.classList.value.includes("active")) {
          elem.classList.add("active");
        } else if (
          scrollY <= changePoint &&
          elem.classList.value.includes("active")
        ) {
          elem.classList.remove("active");
        }
      };

      const parseActivePoints = (scrollY) => {
        let revealElems = document.querySelectorAll(".reveal");
        let appearElems = document.querySelectorAll(".appear");
        let changePoint;
        let activeElem;
        let appearElem;

        for (let i = 0; i < revealElems.length; i++) {
          switch (i) {
            case 0:
              activeElem = revealElems[0];
              changePoint = 0;
              toggleActive(changePoint, activeElem, scrollY);
              break;
            case 1:
              changePoint = 375;
              activeElem = revealElems[1];
              toggleActive(changePoint, activeElem, scrollY);
              break;
            case 2:
              changePoint = 525;
              activeElem = revealElems[2];
              toggleActive(changePoint, activeElem, scrollY);
              break;
            case 3:
              changePoint = 675;
              activeElem = revealElems[3];
              toggleActive(changePoint, activeElem, scrollY);
              appearElem = appearElems[0];
              toggleActive(changePoint, appearElem, scrollY);
              break;
            default:
              break;
          }
        }
      };

      const scrollY = window.scrollY;
      parseActivePoints(scrollY);
    },
    scrollToElem(className) {
      const elemYLoc = document
        .querySelectorAll(`.${className}`)[0]
        .getBoundingClientRect().y;
      window.scrollTo(0, elemYLoc);
    },
  },
};
</script>