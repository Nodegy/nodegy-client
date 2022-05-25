<template>
  <div class="mr-4" style="width: 100%">
    <b-row align-v="center">
      <b-col cols="0" sm="2" />
      <b-col
        cols="10"
        sm="8"
        style="font-size: 0.75rem"
        class="notification-header"
      >
        <b-alert
          v-if="newNotification"
          class="my-auto text-center"
          style="max-height: 54px"
          dismissible
          fade
          :show="dismissCountDown"
          :variant="newNotification.variant"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
          <span class="alert-message-area">
            {{ newNotification.message }}
          </span>
        </b-alert>
      </b-col>

      <b-col cols="2" class="text-right">
        <b-button variant="link" id="notifications-button-1" class="p-0">
          <b-row align-v="center" class="ml-0">
            <i
              :class="`material-icons md-30 md-light ${
                menuActive ? 'md-selected' : 'md-hover'
              }`"
              style="color: #00838f"
            >
              notifications
            </i>
            <b-badge v-if="notifications" pill>{{
              notifications.length
            }}</b-badge>
          </b-row>
        </b-button>
      </b-col>
    </b-row>
    <b-popover
      custom-class="notification-popover overflow-auto"
      target="notifications-button-1"
      placement="bottomleft"
      triggers="click blur"
      @shown="menuActive = true"
      @hidden="menuActive = false"
    >
      <template #title v-if="notifications.length > 0" class="p-0">
        <b-row class="mx-1" align-v="center">
          <b-col cols="0" sm="1" />
          <b-col class="text-center">
            <b-button-group size="sm" fixed>
              <b-button
                style="width: 100px"
                class="m-0"
                :variant="selectedType === null ? 'primary' : null"
                @click.prevent="sortNotifications(null)"
                >All</b-button
              >
              <b-button
                style="width: 100px"
                class="m-0"
                :variant="selectedType === 'incoming' ? 'primary' : null"
                @click.prevent="sortNotifications('incoming')"
              >
                Incoming
              </b-button>
              <b-button
                style="width: 100px"
                class="m-0"
                :variant="selectedType === 'outgoing' ? 'primary' : null"
                @click.prevent="sortNotifications('outgoing')"
              >
                Outgoing
              </b-button>
            </b-button-group>
          </b-col>
          <b-col
            cols="1"
            v-if="notifications.length > 0"
            class="d-flex justify-content-end"
          >
            <i
              class="material-icons md-24 md-hover"
              style="color: red"
              @click.prevent="onDeleteAll"
              >delete</i
            >
          </b-col>
        </b-row>
      </template>
      <template v-else>
        <span>There are currently no notifications available!</span>
      </template>
      <div class="mx-1">
        <template v-for="(notification, idx) in sortedNotifications">
          <b-row
            class="d-flex align-items-center td-hover"
            :key="'notification-popover-row-' + idx"
          >
            <b-col cols="4" sm="3" style="font-size: 0.75rem" class="pr-0">
              {{ formatTime(notification.createdAt, tz, tf) }}
            </b-col>
            <b-col class="pl-0">
              <b-alert style="margin: 0" show :variant="notification.variant"
                >{{ notification.message }}
              </b-alert>
            </b-col>
          </b-row>
        </template>
      </div>
    </b-popover>
  </div>
</template>

<script>
import {
  BAlert,
  BBadge,
  BButton,
  BButtonGroup,
  BCol,
  BPopover,
  BRow,
} from "bootstrap-vue";
import { mapGetters } from "vuex";
import { formatTime } from "@/mixins/index";
import NotificationService from "@/services/notification/notification-service";

export default {
  name: "NotificationsArea",
  mixins: [formatTime],
  components: {
    "b-alert": BAlert,
    "b-badge": BBadge,
    "b-button": BButton,
    "b-button-group": BButtonGroup,
    "b-col": BCol,
    "b-popover": BPopover,
    "b-row": BRow,
  },

  data() {
    return {
      menuActive: false,
      newNotification: null,
      selectedType: null,
      sortedNotifications: [],
      dismissSecs: 10,
      dismissCountDown: 0,
    };
  },

  computed: {
    ...mapGetters({
      notifications: "notification/getNotifications",
      tz: "prefs/getTz",
      tf: "prefs/getTFormat",
    }),
  },

  mounted() {
    this.sortNotifications(this.selectedType);
  },

  watch: {
    notifications: {
      handler(val) {
        this.newNotification = val[0];
        this.dismissCountDown = this.dismissSecs;
      },
    },
  },

  methods: {
    async onDeleteAll() {
      await NotificationService.deleteAll();
      this.selected = null;
    },
    sortNotifications(type) {
      this.selectedType = type;
      this.sortedNotifications = type
        ? this.notifications.filter((notification) => notification.type == type)
        : this.notifications;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
};
</script>

<style scoped>
.notification-popover {
  max-height: 400px;
  max-width: 100%;
}

@media (min-width: 698px) {
  .notification-popover {
    max-height: 400px;
    max-width: 600px;
  }
}

@media (max-width: 698px) {
  .notification-header {
    padding-right: 6px;
  }
}

.alert-message-area {
  display: inline-block;
  max-width: 400px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media (max-width: 698px) {
  .alert-message-area {
    max-width: 200px;
  }
}
</style>