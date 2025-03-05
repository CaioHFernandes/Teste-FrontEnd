<template>
  <ButtonGeneric
    :icone="icone"
    @click="ordenarPorPlaca"
    class="btn-order"
  ></ButtonGeneric>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonGeneric from "../button-generic/ButtonGeneric.vue";
import icone from "../../../../../assets/bars-filter.png";

export default defineComponent({
  components: {
    ButtonGeneric,
  },

  data() {
    return {
      icone,
    };
  },

  methods: {
    ordenarPorPlaca() {
      this.$emit("ordenar");
    },
  },
});
</script>

<style scoped>
.btn-order {
  border: none;
}
</style>
