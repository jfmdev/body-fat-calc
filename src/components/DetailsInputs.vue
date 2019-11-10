<template>
  <form>
    <div class="card text-medium">
      <div class="card-header p-2 text-center">
        Enter your details
      </div>
      <div class="card-body p-2">
        <div class="row">
          <div class="col-sm-2">
            <label class="font-weight-bold mb-0">Unities</label>
          </div>
          <div class="col-sm-5">
            <div class="form-check">
              <input
                v-model="value.system"
                class="form-check-input"
                type="radio"
                name="system"
                id="calc_system_m"
                value="M"
                @change="detailsUpdated"
              />
              <label class="form-check-label clickable" for="calc_system_m">
                Metric
              </label>
            </div>
            <div class="text-small text-muted">(kilos and meters)</div>
          </div>
          <div class="col-sm-5">
            <div class="form-check">
              <input
                v-model="value.system"
                class="form-check-input"
                type="radio"
                name="system"
                id="calc_system_e"
                value="E"
                @change="detailsUpdated"
              />
              <label class="form-check-label clickable" for="calc_system_e">
                English
              </label>
            </div>
            <div class="text-small text-muted">(pounds and inches)</div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-sm-2">
            <label class="font-weight-bold mb-0">Gender</label>
          </div>
          <div class="col-sm-5">
            <div class="form-check">
              <input
                v-model="value.gender"
                class="form-check-input"
                type="radio"
                name="gender"
                id="calc_gender_f"
                value="F"
                @change="detailsUpdated"
              />
              <label class="form-check-label clickable" for="calc_gender_f">
                Female
              </label>
            </div>
          </div>
          <div class="col-sm-5">
            <div class="form-check">
              <input
                v-model="value.gender"
                class="form-check-input"
                type="radio"
                name="gender"
                id="calc_gender_m"
                value="M"
                @change="detailsUpdated"
              />
              <label class="form-check-label clickable" for="calc_gender_m">
                Male
              </label>
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-sm-4 my-auto">
            <label for="calc_age" class="font-weight-bold mb-0">
              Age
            </label>
          </div>
          <div class="col-sm-8">
            <input
              v-model="value.age"
              class="form-control text-medium px-2 py-1"
              type="number"
              name="age"
              id="calc_age"
              placeholder="e.g. 35 (years)"
              @input="detailsUpdated"
              @change="detailsUpdated"
            />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-sm-4 my-auto">
            <label for="calc_height" class="font-weight-bold mb-0">
              Height </label
            ><span class="text-muted"> ({{ lengthUnit }})</span>
          </div>
          <div class="col-sm-8">
            <input
              v-model="value.height"
              class="form-control text-medium px-2 py-1"
              type="number"
              name="height"
              id="calc_height"
              :placeholder="lengthExample(175)"
              @input="detailsUpdated"
              @change="detailsUpdated"
            />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-sm-4 my-auto">
            <label for="calc_weight" class="font-weight-bold mb-0">Weight</label
            ><span class="text-muted"> ({{ weightUnit }})</span>
          </div>
          <div class="col-sm-8">
            <input
              v-model="value.weight"
              class="form-control text-medium px-2 py-1"
              type="number"
              name="weight"
              id="calc_weight"
              :placeholder="weightExample(75)"
              @input="detailsUpdated"
              @change="detailsUpdated"
            />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-sm-4 my-auto">
            <label for="calc_neck" class="font-weight-bold mb-0">Neck</label
            ><span class="text-muted"> ({{ lengthUnit }})</span>
          </div>
          <div class="col-sm-8">
            <input
              v-model="value.neck"
              class="form-control text-medium px-2 py-1"
              type="number"
              name="neck"
              id="calc_neck"
              :placeholder="lengthExample(35)"
              @input="detailsUpdated"
              @change="detailsUpdated"
            />
          </div>
        </div>
        <div class="text-right text-small text-muted">
          (neck circumference at narrowest point)
        </div>

        <div class="row mt-2">
          <div class="col-sm-4 my-auto">
            <label for="calc_waist" class="font-weight-bold mb-0">Waist</label
            ><span class="text-muted"> ({{ lengthUnit }})</span>
          </div>
          <div class="col-sm-8">
            <input
              v-model="value.waist"
              class="form-control text-medium px-2 py-1"
              type="number"
              name="waist"
              id="calc_waist"
              :placeholder="lengthExample(85)"
              @input="detailsUpdated"
              @change="detailsUpdated"
            />
          </div>
        </div>
        <div class="text-right text-small text-muted">
          (waist circumference at {{ isFemale ? "narrowest" : "navel" }} point)
        </div>

        <div v-if="isFemale">
          <div class="row mt-2">
            <div class="col-sm-4 my-auto">
              <label for="calc_hip" class="font-weight-bold mb-0">Hip</label
              ><span class="text-muted"> ({{ lengthUnit }})</span>
            </div>
            <div class="col-sm-8">
              <input
                v-model="value.hip"
                class="form-control text-medium px-2 py-1"
                type="number"
                name="hip"
                id="calc_hip"
                :placeholder="lengthExample(95)"
                @input="detailsUpdated"
                @change="detailsUpdated"
              />
            </div>
          </div>
          <div class="text-right text-small text-muted">
            (hip circumference at widest point)
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { IN_TO_CM, LBS_TO_KG } from "@/utils/constants";

export default {
  name: "DetailsInputs",

  props: {
    value: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },

  computed: {
    isFemale() {
      return this.value.gender === "F";
    },

    isMetric() {
      return this.value.system === "M";
    },

    lengthUnit() {
      return this.isMetric ? "cm" : "in";
    },

    weightUnit() {
      return this.isMetric ? "kg" : "lbs";
    }
  },

  methods: {
    detailsUpdated() {
      this.$emit("input", this.value);
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
    }
  }
};
</script>
