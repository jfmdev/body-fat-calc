<template>
  <form>
    <div class="card">
      <div class="card-header">
        Enter your details
      </div>

      <div class="card-body">
        <div class="row">

          <div class="col-sm-6">
            <label class="font-weight-bold">Gender</label>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gender" id="calc_gender_f" value="F">
                  <label class="form-check-label clickable" for="calc_gender_f">
                    Female
                  </label>
                </div>  
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gender" id="calc_gender_m" value="M" checked>
                  <label class="form-check-label clickable" for="calc_gender_m">
                    Male
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6">
            <label class="font-weight-bold">Unities</label>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="system" id="calc_system_m" value="M">
                  <label class="form-check-label clickable" for="calc_system_m">
                    Metric System <small>(kilos, meters and centimeters)</small>
                  </label>
                </div>  
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="system" id="calc_system_e" value="E" checked>
                  <label class="form-check-label clickable" for="calc_system_e">
                    English System <small>(pounds, feets and inches)</small>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="form-group">
              <label for="calc_weight" class="font-weight-bold">Weight</label>
              <input type="number" class="form-control" id="calc_weight" placeholder="Your weight in kilos (e.g. 75)">
            </div>
          </div>

          <div class="col-sm-6">
            <div class="form-group">
              <label for="calc_height" class="font-weight-bold">Height</label>
              <input type="number" class="form-control" id="calc_height" placeholder="Your height in meters (e.g. 1.75)">
            </div>
          </div>

          <div class="col-sm-4">
            <div class="form-group">
              <label for="calc_waist"><span class="font-weight-bold">Waist</span><small> (at narrowest for female / navel for male)</small></label>
              <input type="number" class="form-control" id="calc_waist" placeholder="Your waist circumference in centimeters (e.g. 85)">
            </div>
          </div>

          <div class="col-sm-4">
            <div class="form-group">
              <label for="calc_fip"><span class="font-weight-bold">Hip</span><small> (at widest) - only female</small></label>
              <input type="number" class="form-control" id="calc_fip" placeholder="Your hip circumference in centimeters (e.g. 95)">
            </div>
          </div>

          <div class="col-sm-4">
            <div class="form-group">
              <label for="calc_neck"><span class="font-weight-bold">Neck</span><small> (at narrowest)</small></label>
              <input type="number" class="form-control" id="calc_neck" placeholder="Your neck circumference in centimeters (e.g. 35)">
            </div>
          </div>
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
