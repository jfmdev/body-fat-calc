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
                class="form-check-input"
                type="radio"
                name="system"
                id="calc_system_m"
                value="M"
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
                class="form-check-input"
                type="radio"
                name="system"
                id="calc_system_e"
                value="E"
                checked
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
                class="form-check-input"
                type="radio"
                name="gender"
                id="calc_gender_f"
                value="F"
              />
              <label class="form-check-label clickable" for="calc_gender_f">
                Female
              </label>
            </div>
          </div>
          <div class="col-sm-5">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="calc_gender_m"
                value="M"
                checked
              />
              <label class="form-check-label clickable" for="calc_gender_m">
                Male
              </label>
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-sm-2 my-auto">
            <label for="calc_weight" class="font-weight-bold mb-0"
              >Weight</label
            >
          </div>
          <div class="col-sm-10">
            <input
              type="number"
              class="form-control text-medium px-2 py-1"
              id="calc_weight"
              placeholder="e.g. 75 (kg)"
            />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-sm-2 my-auto">
            <label for="calc_height" class="font-weight-bold mb-0"
              >Height</label
            >
          </div>
          <div class="col-sm-10">
            <input
              type="number"
              class="form-control text-medium px-2 py-1"
              id="calc_height"
              placeholder="e.g. 175 (cm)"
            />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-sm-2 my-auto">
            <label for="calc_waist" class="font-weight-bold mb-0">Waist</label>
          </div>
          <div class="col-sm-10">
            <input
              type="number"
              class="form-control text-medium px-2 py-1"
              id="calc_waist"
              placeholder="e.g. 85 (cm)"
            />
          </div>
        </div>
        <div class="text-right text-small text-muted">
          (waist circumference at narrowest/navel [female/male] point)
        </div>

        <div class="row mt-2">
          <div class="col-sm-2 my-auto">
            <label for="calc_fip" class="font-weight-bold mb-0">Hip</label>
          </div>
          <div class="col-sm-10">
            <input
              type="number"
              class="form-control text-medium px-2 py-1"
              id="calc_fip"
              placeholder="e.g. 95 (cm)"
            />
          </div>
        </div>
        <div class="text-right text-small text-muted">
          (hip circumference at widest point) - only female
        </div>

        <div class="row mt-2">
          <div class="col-sm-2 my-auto">
            <label for="calc_neck" class="font-weight-bold mb-0">Neck</label>
          </div>
          <div class="col-sm-10">
            <input
              type="number"
              class="form-control text-medium px-2 py-1"
              id="calc_neck"
              placeholder="e.g. 35 (cm)"
            />
          </div>
        </div>
        <div class="text-right text-small text-muted">
          (neck circumference at narrowest point)
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Calculator"
};
</script>
