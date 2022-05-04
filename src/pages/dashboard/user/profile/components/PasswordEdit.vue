<template>
  <div>
    <b-row v-if="!isEditing" align-v="center" class="td-hover">
      <b-col cols="4" sm="3" class="text-right"> Password: </b-col>
      <b-col />
      <b-col cols="3" class="text-center">
        <ProfileEditButton v-on:toggleEdit="$emit('toggleEdit')" />
      </b-col>
    </b-row>

    <template v-else>
      <b-row v-if="isEditing" class="td-hover m-0 p-1" align-v="center">
        <b-col cols="4">New Password:</b-col>
        <b-col cols="6" class="pt-3">
          <ValidationProvider
            name="Password"
            rules="required|min:6|max:30"
            vid="confirmation"
            v-slot="{ errors }"
          >
            <b-form-input
              class="no-border"
              v-model="password"
              type="password"
              placeholder="Password"
              addon-left-icon="pe-7s-lock"
              autofocus
            />
            <b-form-invalid-feedback
              class="form-invalid-feedback"
              :state="false"
            >
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </ValidationProvider>
        </b-col>
      </b-row>

      <b-row v-if="isEditing" class="td-hover m-0 p-1" align-v="center">
        <b-col cols="4">Confirm Password:</b-col>
        <b-col cols="6" class="pt-3">
          <ValidationProvider
            name="Confirm Password"
            rules="confirmed:confirmation"
            v-slot="{ errors }"
          >
            <b-form-input
              class="no-border"
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              addon-left-icon="pe-7s-lock"
            />
            <b-form-invalid-feedback
              class="form-invalid-feedback"
              :state="false"
            >
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </ValidationProvider>
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
import { BCol, BFormInput, BFormInvalidFeedback, BRow } from "bootstrap-vue";
import ProfileEditButton from "./ProfileEditButton";
import UserService from "@/services/usr/user-service";

export default {
  name: "PasswordEdit",
  components: {
    ProfileEditButton,
    "b-col": BCol,
    "b-form-input": BFormInput,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-row": BRow,
  },

  inject: ["$validator"],

  props: {
    invalid: {
      type: Boolean,
      default: false,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    showPwEdit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      password: null,
      confirmPassword: null,
    };
  },

  methods: {
    async onSave() {
      try {
        if (this.invalid) {
          return;
        }

        const confirmUpdate = await UserService.updatePassword(this.password);

        if (confirmUpdate) {
          const msg = "Password Successfully updated!";
          this.$emit("setMsg", { msg: msg, isErr: false });
        }
        this.onCancelEdit();
      } catch (err) {
        const msg = `There was an error updating Password. Error: ${err}`;
        this.$emit("setMsg", { msg: msg, isErr: true });
      }
    },

    onCancelEdit() {
      this.password = null;
      this.confirmPassword = null;
    },
  },
};
</script>
    
    