<template>
  <b-row align-v="center" class="td-hover">
    <b-col cols="4" sm="3" class="text-right"> Username: </b-col>
    <b-col>
      {{ value }}
    </b-col>
    <b-col cols="" sm="3" />
  </b-row>
</template>

<script>
import { BCol, BRow } from "bootstrap-vue";

export default {
  name: "UsernameEdit",
  components: {
    "b-col": BCol,
    "b-row": BRow,
  },

  props: {
    value: {
      type: String,
    },
  },

  methods: {
    // async onEditUsername() {
    //   if (!this.isEditing.username) {
    //     this.isEditing.username = true;
    //     return;
    //   }
    //   let isValid = await this.$refs.observer.validate();
    //   if (!isValid) {
    //     return;
    //   }
    //   this.isEditing.username = false;
    //   const oldUn = this.currentUser.username.toLowerCase();
    //   const newUn = this.user.username.toLowerCase();
    //   if (oldUn !== newUn) {
    //     UserService.updateUserName(newUn).then(
    //       (res) => {
    //         this.$store.dispatch("auth/updateUserName", newUn);
    //       },
    //       (err) => {
    //         const msg = `There was an error updating Username. ${err.response.data.message}`;
    //         this.setMsg(msg, true);
    //         return;
    //       }
    //     );
    //   }
    //   const msg = "Username updated successfully!";
    //   this.setMsg(msg, false);
    // },
  },
};
</script>
    
    