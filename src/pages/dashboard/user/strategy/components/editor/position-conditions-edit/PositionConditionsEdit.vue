<template>
  <b-card body-class="p-0">
    <b-row align-v="center" class="editor-row-header mx-0 py-2">
      <b-col>Position Conditions:</b-col>
    </b-row>
    <template v-for="(details, posIdx) in value">
      <div :key="'stratData' + posIdx">
        <b-row
          align-v="center"
          style="background-color: #b8daff; color: black; font-weight: bold"
          class="mx-0 py-2"
        >
          <template v-if="isEditing">
            <b-col cols="9" :key="'vStratData' + posIdx">
              <ValidationProvider
                name="Position"
                :vid="ids[posIdx].id"
                :rules="{
                  required: true,
                  selectNoDup: {
                    inputIdx: posIdx,
                    inputArr: value,
                    key: 'position',
                  },
                }"
                v-slot="{ errors }"
                :ref="'vStratData' + posIdx"
              >
                <b-form-select
                  style="font-size: 1.2em"
                  :value="value[posIdx].position"
                  :options="positionOptions"
                  @input="updateInput($event, posIdx, null, 'pos')"
                />

                <b-form-invalid-feedback
                  class="auth-invalid-feedback"
                  :state="false"
                >
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </ValidationProvider>
            </b-col>

            <b-col variant="primary">
              <b-button
                size="sm"
                :disabled="value.length < 1"
                variant="link"
                @click.prevent="onDeletePosition(posIdx)"
              >
                <i
                  :class="`material-icons ${
                    value.length > 1 ? 'md-hover' : ''
                  }`"
                  :style="`color: ${
                    value.length > 1 ? '#ff5555;' : '#888888; opacity: 75%;'
                  }`"
                  >remove_circle</i
                >
              </b-button>
            </b-col>
          </template>
          <b-col v-else variant="primary">{{ details.position }}:</b-col>
        </b-row>

        <b-row
          :class="`mx-0 my-1 py-1 ${isEditing ? 'pl-2' : ''}`"
          align-v="center"
        >
          <b-col class="pr-1">Trigger if</b-col>
          <b-col class="p-0">
            <template v-if="!isEditing">
              {{
                value[posIdx].requiredConditions == "one"
                  ? "One condition is met"
                  : "All conditions are met"
              }}
            </template>
            <b-form-select
              v-else
              :value="value[posIdx].requiredConditions"
              :options="triggerWhenOptions"
              @input="updateInput($event, posIdx, null, 'requiredConditions')"
            />
          </b-col>
          <b-col :cols="isEditing ? '1' : '0'" />
        </b-row>

        <b-row class="m-0">
          <b-table-lite
            class="m-0"
            :items="details.conditions"
            :fields="conditionTableFields"
            hover
            small
            fixed
          >
            <template v-if="isActive" #cell(status)="row">
              <div
                :class="
                  activeConditionsObj[row.item.name] == null ||
                  activeConditionsObj[row.item.name] == undefined
                    ? 'status-light-null'
                    : activeConditionsObj[row.item.name] === row.item.val
                    ? 'status-light-on'
                    : 'status-light-off'
                "
              />
            </template>
            <template #cell(name)="row">
              <template v-if="!isEditing">{{ row.value }}</template>
              <template v-else>
                <ValidationProvider
                  name="Condition Name"
                  :vid="ids[posIdx].cons[row.index].conId"
                  :rules="{
                    required: true,
                    min: 3,
                    max: 32,
                    selectNoDup: {
                      inputIdx: row.index,
                      inputArr: value[posIdx].conditions,
                      key: 'name',
                    },
                  }"
                  v-slot="{ errors }"
                  :ref="'vCondName' + posIdx + row.index"
                >
                  <b-form-input
                    class="my-1"
                    :value="value[posIdx].conditions[row.index].name"
                    placeholder="condition name (ex: '5minVwap')"
                    @input="updateInput($event, posIdx, row.index, 'name')"
                  />
                  <b-form-invalid-feedback
                    class="auth-invalid-feedback"
                    :state="false"
                  >
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </template>
            </template>

            <template #cell(val)="row">
              <template v-if="!isEditing">{{ row.value }}</template>
              <template v-else>
                <ValidationProvider
                  name="Select Bool"
                  :vid="ids[posIdx].cons[row.index].valId"
                  rules="required"
                  v-slot="{ errors }"
                  :ref="'vCondBool' + posIdx + row.index"
                  class="text-center"
                >
                  <b-form-select
                    :value="value[posIdx].conditions[row.index].val"
                    :options="bools"
                    @input="updateInput($event, posIdx, row.index, 'val')"
                  />

                  <b-form-invalid-feedback
                    class="auth-invalid-feedback"
                    :state="false"
                  >
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </template>
            </template>

            <template #head(actions)="data">
              <b-row class="mx-0">
                <span class="d-flex mx-auto pr-5">
                  <InfoTooltip
                    v-if="isActive"
                    :id="`conditions-actions-header-tooltip-${posIdx}`"
                    tip="Manually send a webhook containing the row's condition and value.  This acts like a trigger coming in from a 3rd party."
                  />
                  {{ isActive ? data.label : "" }}
                </span>
              </b-row>
            </template>

            <template #cell(actions)="row">
              <template v-if="!isEditing && isActive">
                <SendPayloadButton
                  :id="ids[posIdx].cons[row.index].valId"
                  :condition="row.item"
                  :eid="eid"
                  :stratId="stratId"
                  :stratSymbol="stratSymbol"
                />
              </template>

              <template v-if="isEditing">
                <b-button
                  class="m-0 p-0"
                  size="sm"
                  variant="link"
                  :disabled="!(value[posIdx].conditions.length > 1)"
                  @click="onDeleteCondition(posIdx, row.item)"
                >
                  <i
                    :class="`material-icons pr-3 ${
                      value[posIdx].conditions.length > 1 ? 'md-hover' : ''
                    }`"
                    :style="`color: ${
                      value[posIdx].conditions.length > 1
                        ? '#ff5555;'
                        : '#888888; opacity: 75%;'
                    }`"
                    >remove_circle</i
                  >
                </b-button>
              </template>
            </template>
          </b-table-lite>
        </b-row>

        <b-row v-if="isEditing" :key="'addCond' + posIdx" class="mx-0 mb-2">
          <b-col>
            <b-button
              @click.prevent="onAddCondition(posIdx)"
              variant="link"
              class="pt-0"
              style="width: 150px"
            >
              <b-row align-v="center">
                <i
                  class="material-icons md-30 md-hover pl-2 mr-1"
                  style="color: #00838f"
                >
                  add_circle_outline
                </i>
                <span> Add Condition </span>
              </b-row>
            </b-button>
          </b-col>
        </b-row>
      </div>
    </template>
    <b-row v-if="isEditing" class="mx-0">
      <b-col class="text-center">
        <b-button
          @click.prevent="onAddPosition()"
          variant="link"
          :disabled="!allowAddPosition"
          style="width: 150px"
        >
          <b-row align-v="center">
            <i
              v-if="allowAddPosition"
              class="material-icons md-30 md-hover pl-2 mr-1"
              style="color: #00838f"
            >
              add_circle_outline
            </i>
            <span style="font-weight: bold">
              {{ allowAddPosition ? "Add Position" : "Max Positions" }}
            </span>
          </b-row>
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>
 
<script>
import Positions from "@/models/positions";
import {
  BButton,
  BCard,
  BCol,
  BFormInput,
  BFormSelect,
  BFormInvalidFeedback,
  BTableLite,
  BRow,
} from "bootstrap-vue";
import { InfoTooltip } from "@/components/index";
import { SendPayloadButton } from "./components/index";

export default {
  name: "PositionConditionsEdit",
  components: {
    InfoTooltip,
    SendPayloadButton,
    "b-button": BButton,
    "b-card": BCard,
    "b-col": BCol,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-form-input": BFormInput,
    "b-form-select": BFormSelect,
    "b-table-lite": BTableLite,
    "b-row": BRow,
  },

  inject: { $validator: "$validator" },

  props: {
    activeConditions: {
      type: Array,
    },
    cid: {
      type: String,
      required: true,
    },
    eid: {
      type: String,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    stratId: {
      type: String,
      default: "",
    },
    stratSymbol: {
      type: String,
      default: "",
    },
    value: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      id: 0,
      bools: [{ text: "Select One", value: null }, true, false],
      positionOptions: new Positions({ text: "Select Position", value: null })
        .options,
      triggerWhenOptions: [
        { text: "One condition is met", value: "one" },
        { text: "All conditions are met", value: "all" },
      ],
    };
  },

  computed: {
    ids() {
      let ids = {};
      const getId = () => {
        this.id += 1;
        return `posCons-${this.id}`;
      };

      const maxPositions = 4;

      if (Object.keys(ids).length < maxPositions) {
        for (let x = 0; x < maxPositions; x++) {
          ids[x] = {
            id: getId(),
            cons: { 0: { conId: getId(), valId: getId() } },
          };
        }
      }

      for (const [posIdx] in this.value) {
        for (const [conIdx] in this.value[posIdx].conditions) {
          if (!(conIdx in Object.keys(ids[posIdx].cons))) {
            ids[posIdx]["cons"][conIdx] = {
              conId: getId(),
              valId: getId(),
            };
          }
        }

        let numCons = Object.keys(this.value[posIdx].conditions).length;
        let numConIds = Object.keys(ids[posIdx].cons).length;

        if (numConIds < numCons + 1) {
          ids[posIdx].cons[numConIds] = {
            conId: getId(),
            valId: getId(),
          };
        }
      }
      return ids;
    },

    conditionTableFields() {
      const fields = [
        {
          key: "name",
          label: "Condition",
          tdClass: `align-middle ${this.isEditing ? "pl-3" : "pl-4"}`,
          thClass: "pl-3",
        },
        {
          key: "val",
          label: "Value",
          tdClass: `align-middle ${this.isEditing ? "pl-2" : "pl-3"}`,
        },
      ];

      const isEditingFields = [
        ...fields,
        {
          key: "actions",
          label: "Trigger Manually",
          tdClass: "align-middle text-center",
          thClass: "text-center",
          thStyle: `${this.isEditing ? "width: 60px" : ""};`,
        },
      ];

      const isActiveFields = [
        {
          key: "status",
          label: "Status",
          thClass: "text-center",
          tdClass: "py-1 align-middle",
          thStyle: "width: 80px; padding-left: 0;",
        },
        ...isEditingFields,
      ];

      return this.isActive
        ? isActiveFields
        : this.isEditing
        ? isEditingFields
        : fields;
    },

    activeConditionsObj() {
      let data = {};
      this.activeConditions.forEach((cond) => {
        data[cond.name] = cond.val;
      });
      return data;
    },

    allowAddPosition() {
      return this.value.length < 4;
    },
  },

  methods: {
    async updateInput(value, posIdx, conIdx, key) {
      switch (key) {
        case "requiredConditions":
          this.value[posIdx].requiredConditions = value;
          break;
        case "pos":
          this.value[posIdx].position = value;
          break;
        case "name":
        case "val":
          this.value[posIdx].conditions[conIdx][key] = value;
          break;
        default:
          break;
      }

      this.$emit("input", this.value);

      if (key === "pos" || key === "val" || key === "name") {
        await this.validatePositionSelect();
      }
    },

    async validateInput(posRef) {
      let result = await this.$refs[posRef][0].validate();
      let isValid = result.valid;
      return isValid;
    },

    async validatePositionSelect() {
      try {
        const validateInput = async (posRef) => {
          let result;
          result = await this.$refs[posRef][0].validate();
          isValidCheck = result.valid ? isValidCheck : false;
          return isValidCheck;
        };

        let isValidCheck = true;

        for (const [posIdx, data] of this.value.entries()) {
          isValidCheck = (await this.validateInput(`vStratData${posIdx}`))
            ? isValidCheck
            : false;
          for (const [conIdx, conditions] of data.conditions.entries()) {
            isValidCheck = (await this.validateInput(
              `vCondName${posIdx}${conIdx}`
            ))
              ? isValidCheck
              : false;
            isValidCheck = (await this.validateInput(
              `vCondBool${posIdx}${conIdx}`
            ))
              ? isValidCheck
              : false;
          }
        }

        return isValidCheck;
      } catch (err) {
        this.$emit("isErr");
      }
    },

    async onAddCondition(idx) {
      this.value[idx].conditions.push({
        name: null,
        val: null,
        valType: null,
      });
    },

    async onAddPosition() {
      this.value.push({
        conditions: [
          {
            name: null,
            val: null,
            valType: null,
          },
        ],
        position: null,
        requiredConditions: "all",
      });
    },

    onDeleteCondition(idx, selectedItem) {
      const selectedIndex = this.value[idx].conditions.findIndex(
        (item) => item === selectedItem
      );
      this.value[idx].conditions.splice(selectedIndex, 1);
    },

    onDeletePosition(idx) {
      this.value.splice(idx, 1);
    },
  },
};
</script>

<style scoped>
.status-light-on {
  margin: 0 auto;
  width: 20px;
  height: 20px;
  background-color: #abff00;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px,
    #89ff00 0 2px 12px;
}

.status-light-off {
  margin: 0 auto;
  width: 20px;
  height: 20px;
  background-color: #df0d0d;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #660000 0 -1px 9px,
    #df2c0d 0 2px 12px;
}

.status-light-null {
  margin: 0 auto;
  width: 20px;
  height: 20px;
  background-color: #afafaf;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px,
    inset rgb(61, 61, 61) 0 -1px 9px, #afafafbb 0 2px 12px;
}
</style>
