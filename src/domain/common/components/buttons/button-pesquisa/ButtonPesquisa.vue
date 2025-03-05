<template>
  <ButtonGeneric :icone="icone" @click="$emit('filtrar')"></ButtonGeneric>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonGeneric from "../button-generic/ButtonGeneric.vue";
import icone from "../../../../../assets/magnifying-glass.png";

export default defineComponent({
  components: {
    ButtonGeneric,
  },

  data() {
    return {
      icone,
    };
  },
});
</script>

<style scoped></style>
