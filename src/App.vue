<template>
  <div id="app" class="container-fluid">
    <h1 class="text-center mb-2">Body Fat Calculator</h1>

    <DetailsInputs />

    <Stats class="mt-2" />

    <History class="mt-2" />
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
