<template>
  <div
    class="page-header clear-filter"
    filter-color="filter"
    style="margin: -32px -32px 0 -32px"
  >
    <div class="page-header-image profile-bg-image"></div>

    <b-container style="color: black" class="profile">
      <ErrorOverlay :isErr="isResErr" v-on:close="isResErr = false">
        <b-row align-h="center">
          <b-col sm="10" md="8">
            <b-card body-class="p-0">
              <ValidationObserver
                v-if="!isDeleting"
                ref="observer"
                v-slot="{ invalid }"
              >
                <b-row align-v="center" class="mx-0 p-2 editor-row-header">
                  <b-col> Account Details </b-col>
                </b-row>

                <b-row
                  align-v="center"
                  class="editor-row-header"
                  style="background-color: #2ca8ff"
                  v-if="
                    isEditing.username || isEditing.email || isEditing.password
                  "
                >
                  <b-col>
                    Changing
                    {{
                      isEditing.username
                        ? "Username"
                        : isEditing.email
                        ? "Email Address"
                        : "Password"
                    }}
                  </b-col>
                </b-row>

                <UsernameEdit
                  v-if="!isEditing.password && !isEditing.email"
                  v-model="user.username"
                  ref="usernameEdit"
                />

                <EmailAddressEdit
                  v-if="!isEditing.password && !isEditing.username"
                  :email="currentUser.email"
                  :showEmailEdit="showEmailEdit"
                  :invalid="invalid"
                  :isEditing="isEditing.email"
                  v-on:toggleEdit="isEditing.email = !isEditing.email"
                  ref="emailEdit"
                />

                <PasswordEdit
                  v-if="!isEditing.username && !isEditing.email"
                  :invalid="invalid"
                  :isEditing="isEditing.password"
                  :showPwEdit="showPwEdit"
                  v-on:setMsg="setMsg"
                  v-on:toggleEdit="isEditing.password = !isEditing.password"
                  ref="passwordEdit"
                />

                <ProfileSaveButton
                  v-if="isEditingAny"
                  :invalid="invalid"
                  :isEditing="isEditingAny"
                  v-on:cancelEdit="onCancelEdit"
                  v-on:save="onSave"
                />

                <!-- roles -->
                <b-row v-if="showRole" class="td-hover" align-v="center">
                  <b-col>Role(s):</b-col>
                  <b-col>
                    <ul>
                      <li
                        v-for="(role, index) in currentUser.roles"
                        :key="index"
                      >
                        {{ role }}
                      </li>
                    </ul>
                  </b-col>
                  <b-col />
                </b-row>

                <!-- preferences -->
                <template v-if="!isEditingAny">
                  <b-row align-v="center" class="editor-row-header">
                    <b-col> Preferences </b-col>
                  </b-row>

                  <!-- lcl time -->
                  <b-row class="td-hover" align-v="center">
                    <!-- date / time -->
                    <b-col cols="4" sm="3" class="text-right">Date/Time:</b-col>
                    <b-col v-if="lclDateTime">
                      {{ lclDateTime }}
                    </b-col>
                    <b-col cols="" sm="3" />
                  </b-row>

                  <AmPmSelect v-on:changeAmPm="getCurrentDateTime" />

                  <TimeZoneSelect
                    ref="timeZoneSelect"
                    v-on:updateTz="updateTz"
                  />
                  <!-- delete account -->
                </template>
              </ValidationObserver>
              <DeleteAccount
                v-on:setMsg="setMsg"
                v-on:toggleIsDeleting="isDeleting = !isDeleting"
                :isDeleting="isDeleting"
              />
            </b-card>

            <b-card v-if="message">
              <div :class="`text-center ${msgColor} my-2`">
                <p>{{ message }}</p>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </ErrorOverlay>
      <RequestResponseArea
        class="mx-auto mt-3"
        v-on:isErr="isResErr = true"
        style="max-width: 300px"
      />
    </b-container>
  </div>
</template>

<script>
import {
  AmPmSelect,
  DeleteAccount,
  EmailAddressEdit,
  PasswordEdit,
  ProfileSaveButton,
  TimeZoneSelect,
  UsernameEdit,
} from "@/pages/dashboard/user/profile/components/index";
import { formatTime } from "@/helpers/index";
import UserService from "@/services/usr/user-service";
import { BCard, BCol, BContainer, BRow } from "bootstrap-vue";
import { ErrorOverlay, RequestResponseArea } from "@/components/index";

export default {
  name: "Profile",
  components: {
    AmPmSelect,
    DeleteAccount,
    EmailAddressEdit,
    ErrorOverlay,
    PasswordEdit,
    ProfileSaveButton,
    RequestResponseArea,
    TimeZoneSelect,
    UsernameEdit,
    "b-card": BCard,
    "b-container": BContainer,
    "b-col": BCol,
    "b-row": BRow,
  },
  data() {
    return {
      user: {
        username: null,
        email: null,
      },
      showRole: false,
      message: null,
      isEditing: {
        username: false,
        email: false,
        password: false,
      },
      lclDateTime: null,
      lclTz: null,
      timer: null,
      msgColor: "",
      isDeleting: false,
      isResErr: false,
    };
  },

  provide() {
    return {
      $validator: this.$validator,
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentPrefs() {
      return this.$store.state.prefs;
    },
    isEditingAny() {
      return (
        this.isEditing.email ||
        this.isEditing.password ||
        this.isEditing.username
      );
    },
    showUnEdit() {
      return this.showEditButton("username");
    },
    showEmailEdit() {
      return this.showEditButton("email");
    },
    showPwEdit() {
      return this.showEditButton("password");
    },
  },

  mounted() {
    this.user.username = this.currentUser.username;
    this.user.email = this.currentUser.email;
    if (
      this.currentUser.roles.includes("ROLE_ADMIN") ||
      this.currentUser.roles.includes("ROLE_Moderator")
    ) {
      this.showRole = true;
    }

    this.getCurrentDateTime();
    this.timer = setInterval(() => {
      this.getCurrentDateTime();
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },

  methods: {
    showEditButton(name) {
      let bool = true;
      Object.keys(this.isEditing).forEach((key) => {
        if (key !== name && this.isEditing[key] === true) {
          bool = false;
          return;
        }
      });
      return bool;
    },

    onSave() {
      switch (true) {
        case this.isEditing.username:
          // inactive
          break;
        case this.isEditing.password:
          this.$refs.passwordEdit.onSave();
          break;
        case this.isEditing.email:
          this.$refs.emailEdit.onSave();
          break;
        default:
          break;
      }

      this.onCancelEdit();
    },

    onCancelEdit() {
      switch (true) {
        case this.isEditing.username:
          this.user.username = this.currentUser.username;
          this.isEditing.username = false;
          break;
        case this.isEditing.password:
          this.$refs.passwordEdit.onCancelEdit();
          this.isEditing.password = false;
          break;
        case this.isEditing.email:
          this.$refs.emailEdit.onCancelEdit();
          this.user.email = null;
          this.isEditing.email = false;

          break;
        default:
          break;
      }
    },

    updateTz(val) {
      this.lclTz = val;
      this.getCurrentDateTime();
    },

    getCurrentDateTime() {
      const d = new Date();
      const time = d.getTime();
      this.lclDateTime = formatTime(
        time,
        this.lclTz,
        this.currentPrefs.timeFormat
      );
    },

    setMsg(msg, isErr) {
      // console.log(msg, isErr);
      this.msgColor = isErr ? "text-danger" : "text-success";
      this.message = msg;
      setTimeout(() => (this.message = null), 20000);
    },
  },
};
</script>

<style >
.profile-bg-image {
  background-image: url("../../../../assets/images/profile/profile.jpeg");
}
</style>