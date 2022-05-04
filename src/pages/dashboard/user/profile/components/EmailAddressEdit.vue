<template>
  <b-row align-v="center" class="td-hover">
    <b-col cols="4" sm="3" class="text-right">Email:</b-col>

    <template v-if="isEditing">
      <b-col class="pt-3">
        <ValidationProvider
          name="Email"
          rules="required|email"
          v-slot="{ errors }"
        >
          <b-form-input
            v-model="user.email"
            type="text"
            class="form-control"
            autofocus
          />
          <b-form-invalid-feedback class="form-invalid-feedback" :state="false">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </ValidationProvider>
      </b-col>
    </template>
    <template v-else>
      <b-col>
        {{ email }}
      </b-col>
    </template>

    <b-col cols="0" sm="3">
      <!-- <ProfileEditButton
        v-if="!isEditing"
        v-on:toggleEdit="$emit('toggleEdit')"
      /> -->
    </b-col>
  </b-row>
</template>

<script>
import { BCol, BFormInput, BFormInvalidFeedback, BRow } from "bootstrap-vue";
import EmailService from "@/services/auth/email-service";
// import ProfileEditButton from "./ProfileEditButton";

export default {
  name: "EmailAddressEdit",
  components: {
    // ProfileEditButton,
    "b-col": BCol,
    "b-form-input": BFormInput,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-row": BRow,
  },

  inject: ["$validator"],

  props: {
    email: {
      type: String,
      required: true,
    },
    showEmailEdit: {
      type: Boolean,
      required: true,
    },
    invalid: {
      type: Boolean,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      //  b-button disabled, component not ready
      disabled: true,
      user: {
        email: null,
      },
    };
  },

  mounted() {
    this.user.email = this.email;
  },

  methods: {
    async onSave() {
      // TODO: Add verification code for confirmation
      if (!this.isEditing) {
        this.$emit("toggleEdit");
        return;
      }

      if (this.user.email !== this.email) {
        const oldEmail = this.email.toLowerCase();
        const newEmail = this.user.email.toLowerCase();

        if (oldEmail !== newEmail) {
          EmailService.sendVCode(newEmail, oldEmail).then(
            (res) => {
              this.$store.dispatch("auth/updateEmail", this.user.email);
            },
            (err) => {
              const msg = `There was an error updating Email. ${err.response.data.message}`;
              this.setMsg(msg, true);
              return;
            }
          );
        }

        const msg = "Email updated successfully!";
        this.setMsg(msg, false);
      }
      this.$emit("toggleEdit");
    },

    onCancelEdit() {
      this.user.email = this.email;
      this.$emit("toggleEdit");
    },
  },
};
</script>
    