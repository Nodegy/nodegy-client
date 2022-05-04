<template>
  <ValidationProvider :name="label" rules="required" v-slot="{ errors }">
    <b-form-select
      :value="value"
      :options="options"
      @input="updateInput"
      :autofocus="autofocus"
    >
      <option
        v-for="(option, idx) in options"
        :value="option"
        :key="'op' + idx"
      >
        {{ option.formatted }}
      </option>
    </b-form-select>
    <b-form-invalid-feedback class="auth-invalid-feedback" :state="false">
      {{ errors[0] }}
    </b-form-invalid-feedback>
  </ValidationProvider>
</template>


<script>
import { BFormSelect, BFormInvalidFeedback } from "bootstrap-vue";

export default {
  name: "InputSelect",
  components: {
    "b-form-select": BFormSelect,
    "b-form-invalid-feedback": BFormInvalidFeedback,
  },

  props: {
    autofocus: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
    },
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {
    updateInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss">
</style>
