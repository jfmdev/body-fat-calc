<template>
  <div id="app" class="container-fluid pb-3">
    <h1 class="text-center mb-2">Body Fat Calculator</h1>

    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-6 mb-2">
        <Inputs />
      </div>
      <div class="col-lg-8 col-md-8 col-sm-6">
        <BodyMassIndex />
        <BodyFatPct class="mt-2" />
        <Stats class="mt-2" />
      </div>
    </div>
  </div>
</template>

<script>
import BodyFatPct from "@/components/BodyFatPct";
import BodyMassIndex from "@/components/BodyMassIndex";
import Inputs from "@/components/Inputs";
import Stats from "@/components/Stats";

export default {
  name: "App",

  components: {
    BodyFatPct,
    BodyMassIndex,
    Inputs,
    Stats
  }
};
</script>
