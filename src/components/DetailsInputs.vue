<template>
  <form>
    <div class="card text-medium">
      <div class="card-header px-2 py-1">
        Enter your details
      </div>

      <div class="card-body py-2 px-0">
        <div class="container-fluid">
          <div class="row">
            <!-- Unities -->
            <div class="col-lg-4 col-md-6 col-12">
              <div class="row">
                <div class="col-4">
                  <label class="font-weight-bold mb-0">Unities</label>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input
                      value="M"
                      name="system"
                      :checked="value.system === 'M'"
                      @change="updateInput"
                      class="form-check-input"
                      type="radio"
                      id="calc_system_m"
                    />
                    <label
                      class="form-check-label clickable"
                      for="calc_system_m"
                    >
                      Metric
                    </label>
                  </div>
                  <div class="text-small text-muted">(kilos and meters)</div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input
                      value="E"
                      name="system"
                      :checked="value.system === 'E'"
                      @change="updateInput"
                      class="form-check-input"
                      type="radio"
                      id="calc_system_e"
                    />
                    <label
                      class="form-check-label clickable"
                      for="calc_system_e"
                    >
                      English
                    </label>
                  </div>
                  <div class="text-small text-muted">(pounds and inches)</div>
                </div>
              </div>
            </div>

            <!-- Gender -->
            <div class="col-lg-4 col-md-6 col-12 offset-lg-2">
              <div class="row">
                <div class="col-4">
                  <label class="font-weight-bold mb-0">Gender</label>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input
                      value="F"
                      name="gender"
                      :checked="value.gender === 'F'"
                      @change="updateInput"
                      class="form-check-input"
                      type="radio"
                      id="calc_gender_f"
                    />
                    <label
                      class="form-check-label clickable"
                      for="calc_gender_f"
                    >
                      Female
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input
                      value="M"
                      name="gender"
                      :checked="value.gender === 'M'"
                      @change="updateInput"
                      class="form-check-input"
                      type="radio"
                      id="calc_gender_m"
                    />
                    <label
                      class="form-check-label clickable"
                      for="calc_gender_m"
                    >
                      Male
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row border-top mt-2 pt-2">
            <div class="col-lg-2 col-md-4 col-6">
              <label for="calc_age" class="font-weight-bold mb-0">
                Age
              </label>
              <input
                name="age"
                :value="value.age"
                @input="updateInput"
                @change="updateInput"
                class="form-control text-medium px-2 py-1"
                type="number"
                id="calc_age"
                placeholder="e.g. 35 (years)"
              />
            </div>

            <div class="col-lg-2 col-md-4 col-6">
              <label for="calc_height" class="font-weight-bold mb-0">
                Height </label
              ><span class="text-muted"> ({{ lengthUnit }})</span>
              <input
                name="height"
                :value="value.height"
                @input="updateInput"
                @change="updateInput"
                class="form-control text-medium px-2 py-1"
                type="number"
                id="calc_height"
                :placeholder="lengthExample(175)"
              />
            </div>

            <div class="col-lg-2 col-md-4 col-6">
              <label for="calc_weight" class="font-weight-bold mb-0"
                >Weight</label
              ><span class="text-muted"> ({{ weightUnit }})</span>
              <input
                name="weight"
                :value="value.weight"
                @input="updateInput"
                @change="updateInput"
                type="number"
                class="form-control text-medium px-2 py-1"
                id="calc_weight"
                :placeholder="weightExample(75)"
              />
            </div>

            <div class="col-lg-2 col-md-4 col-6">
              <label for="calc_neck" class="font-weight-bold mb-0">Neck</label
              ><span class="text-muted"> ({{ lengthUnit }})</span>
              <input
                name="neck"
                :value="value.neck"
                @input="updateInput"
                @change="updateInput"
                class="form-control text-medium px-2 py-1"
                type="number"
                id="calc_neck"
                :placeholder="lengthExample(35)"
              />
              <div class="text-right text-small text-muted">
                (neck girth at narrowest point)
              </div>
            </div>

            <div class="col-lg-2 col-md-4 col-6">
              <label for="calc_waist" class="font-weight-bold mb-0">Waist</label
              ><span class="text-muted"> ({{ lengthUnit }})</span>
              <input
                name="waist"
                :value="value.waist"
                @input="updateInput"
                @change="updateInput"
                class="form-control text-medium px-2 py-1"
                type="number"
                id="calc_waist"
                :placeholder="lengthExample(85)"
              />
              <div class="text-right text-small text-muted">
                (waist girth at
                {{ isFemale ? "narrowest" : "navel" }} point)
              </div>
            </div>

            <div class="col-lg-2 col-md-4 col-6" v-if="isFemale">
              <label for="calc_hip" class="font-weight-bold mb-0">Hip</label
              ><span class="text-muted"> ({{ lengthUnit }})</span>
              <input
                name="hip"
                :value="value.hip"
                @input="updateInput"
                @change="updateInput"
                class="form-control text-medium px-2 py-1"
                type="number"
                id="calc_hip"
                :placeholder="lengthExample(95)"
              />
              <div class="text-right text-small text-muted">
                (hip girth at widest point)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapMutations, mapState } from "vuex";

import { IN_TO_CM, LBS_TO_KG } from "@/utils/constants";

const isNumeric = value => !_.isNil(value) && !isNaN(value);

export default {
  name: "DetailsInputs",

  computed: {
    ...mapState({
      value: state => state.input
    }),

    ...mapGetters({
      isFemale: "isFemale",
      isMetric: "isMetric",
      lengthUnit: "lengthUnit",
      weightUnit: "weightUnit"
    })
  },

  methods: {
    updateInput(evt) {
      const newInput = {};
      const { name, value } = evt.target;

      if (["age", "height", "waist", "hip", "neck"].indexOf(name) >= 0) {
        // Parse Number.
        newInput[name] = isNumeric(value) ? parseInt(value, 10) : null;
      } else {
        // Set string.
        newInput[name] = value;
      }

      this.commitInput(newInput);
    },

    lengthExample(valueInCm) {
      const value = this.isMetric
        ? valueInCm
        : Math.floor(valueInCm / IN_TO_CM);
      return `e.g. ${value} (${this.lengthUnit})`;
    },

    weightExample(valueInKg) {
      const value = this.isMetric
        ? valueInKg
        : Math.floor(valueInKg / LBS_TO_KG);
      return `e.g. ${value} (${this.weightUnit})`;
    },

    ...mapMutations({
      commitInput: "input"
    })
  }
};
</script>
