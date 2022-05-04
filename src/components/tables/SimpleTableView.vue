<template>
  <b-table-simple small outlined responsive fixed>
    <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="12">
          Selected<span v-if="label">{{ " " + label }}</span
          >:</b-th
        >
      </b-tr>
    </b-thead>

    <b-tbody>
      <b-tr class="td-hover">
        <b-th colspan="3">Symbol:</b-th>
        <b-td colspan="9">
          {{ selected.symbol }}
        </b-td>
      </b-tr>

      <b-tr class="td-hover">
        <b-th colspan="3">Received At:</b-th>
        <b-td colspan="9">
          {{ selected.createdAt }}
        </b-td>
      </b-tr>

      <b-tr class="td-hover">
        <b-th colspan="12" variant="primary">Conditions: </b-th>
      </b-tr>

      <b-tr
        v-for="(trigger, idx) in selected.trigger"
        :key="'trigger' + idx"
        class="td-hover"
      >
        <b-th colspan="2"> {{ idx }} </b-th>
        <b-td colspan="1">:</b-td>
        <b-td colspan="9">{{ trigger }}</b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import {
  BCard,
  BTableSimple,
  BTr,
  BTh,
  BTbody,
  BTd,
  BThead,
} from "bootstrap-vue";

export default {
  name: "UserList",
  components: {
    "b-table-simple": BTableSimple,
    "b-tr": BTr,
    "b-th": BTh,
    "b-tbody": BTbody,
    "b-td": BTd,
    "b-thead": BThead,
  },
  props: {
    label: {
      type: String,
    },
    selected: {
      type: Object,
      default: () => ({
        symbol: "",
        triggers: [],
      }),
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
