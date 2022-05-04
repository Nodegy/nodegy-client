<template>
  <b-container>
    <b-row>
      <b-col cols="4">
        <b-row align-h="center">
          <b-button
            variant="primary"
            :class="visible ? null : 'collapsed'"
            :aria-expanded="visible ? 'true' : 'false'"
            aria-controls="collapse-4"
            @click="visible = !visible"
          >
            Toggle
          </b-button>
        </b-row>
      </b-col>
      <b-col cols="6">
        <b-card>
          <b-collapse id="collapse-4" v-model="visible">
            <b-form-text-area
              plaintext
              type="hidden"
              :value="item"
              id="to-copy"
              size="sm"
              max-rows="10"
              no-auto-shrink
            />
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import {
  BButton,
  BCollapse,
  BContainer,
  BCol,
  BRow,
  BFormTextarea,
  BCard,
} from "bootstrap-vue";

export default {
  name: "Collapse",
  components: {
    "b-button": BButton,
    "b-collapse": BCollapse,
    "b-container": BContainer,
    "b-form-text-area": BFormTextarea,
    "b-col": BCol,
    "b-row": BRow,
    "b-card": BCard,
  },
  props: {
    input: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      visible: true,
      item: null,
    };
  },

  mounted() {
    this.item = JSON.stringify(this.input, null, "\t");
  },
};
</script>

<style lang="scss">
</style>
