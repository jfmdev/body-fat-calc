<template>
  <div id="app" class="container">
    <h1 class="text-center mb-2">Body Fat Calculator</h1>

    <div class="row">
      <div class="col-md-4">
        <DetailsInputs />
      </div>
      <div class="col-md-8">
        <Stats />
      </div>
    </div>

    <History />
  </div>
</template>

<script>
import DetailsInputs from "@/components/DetailsInputs";
import History from "@/components/History";
import Stats from "@/components/Stats";

export default {
  name: "App",

  components: {
    DetailsInputs,
    History,
    Stats
  }
};
</script>
