<template>
  <div>
    <b-row align-v="center" class="editor-row-header mx-0 py-2">
      <b-col>Position Messages:</b-col>
    </b-row>

    <b-row
      v-for="(details, idx) in value"
      align-v="center"
      class="td-hover mx-0 py-2"
      :key="'alertMessages-pos-' + idx"
    >
      <b-col cols="3"> {{ details.position }}: </b-col>

      <template v-if="isEditing">
        <b-col>
          <ValidationProvider
            name="Position Message"
            :vid="ids[idx].messId"
            rules="required|min:3|max:1200"
            v-slot="{ errors }"
            :ref="'vAlertMessages' + idx"
          >
            <b-form-text-area
              name="Message"
              :value="value[idx].message.text"
              class="form-control"
              :placeholder="`Type here to add a message for your ${details.position} Alert or select 'Default Message'.`"
              @input="updateInput($event, idx)"
            ></b-form-text-area>

            <b-form-invalid-feedback
              class="auth-invalid-feedback"
              :state="false"
            >
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </ValidationProvider>
        </b-col>

        <b-col cols="3">
          <b-form-checkbox
            :id="'default-msg-chkbx-' + idx"
            v-model="value[idx].message.default"
            @change="onToggleDefault($event, idx)"
            >Default Message</b-form-checkbox
          >
        </b-col>
      </template>

      <b-col v-else>
        {{ details.message.text }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCol,
  BFormCheckbox,
  BFormInvalidFeedback,
  BFormTextarea,
  BRow,
} from "bootstrap-vue";

export default {
  name: "AlertPosMessagesEdit",
  components: {
    "b-col": BCol,
    "b-form-checkbox": BFormCheckbox,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-form-text-area": BFormTextarea,
    "b-row": BRow,
  },

  inject: ["$validator"],

  props: {
    label: {
      type: String,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    selected: {
      type: Object,
    },
    value: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      ids: {},
    };
  },

  created() {
    this.initIds();
  },

  methods: {
    initIds() {
      let id = 0;
      const getId = () => {
        id += 1;
        return `alertMes-${this.id}`;
      };

      for (const [posIdx] in this.value) {
        this.ids[posIdx] = { posId: getId(), messId: null };
        this.ids[posIdx].messId = getId();
      }
    },

    updateInput(value, idx) {
      if (this.value[idx].message.default) {
        this.value[idx].message.default = false;
      }
      this.value[idx].message.text = value;
      this.$emit("input", this.value);
    },

    onToggleDefault(val, idx) {
      this.value[idx].message.default = val;
      if (this.value[idx].message.default) {
        this.genDefaultMessages(idx);
        return;
      }
      this.value[idx].message.text = null;
    },

    genDefaultMessages(idx) {
      if (idx !== undefined) {
        this.value[idx].message.text = this.selected.getDefaultMessage(
          this.value[idx].position
        );
      } else {
        this.value.forEach((pos, idx) => {
          this.value[idx].message.text = pos.message.default
            ? this.selected.getDefaultMessage(pos.position)
            : pos.message.text;
        });
      }

      this.$emit("input", this.value);
    },
  },
};
</script>
