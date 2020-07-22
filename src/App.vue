<template>
  <div id="app" class="container-fluid">
    <h1 class="text-center mb-2">Body Fat Calculator</h1>

    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <DetailsInputs />
      </div>
      <div class="col-lg-8 col-md-8 col-sm-6">
        <Stats />
      </div>
    </div>
  </div>
</template>

<script>
import DetailsInputs from "@/components/DetailsInputs";
import Stats from "@/components/Stats";

export default {
  name: "App",

  components: {
    DetailsInputs,
    Stats
  }
};
</script>
