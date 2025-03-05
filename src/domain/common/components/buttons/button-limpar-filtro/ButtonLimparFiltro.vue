<template>
  <ButtonGeneric :icone="icone" @click="limparFiltros"></ButtonGeneric>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonGeneric from "../button-generic/ButtonGeneric.vue";
import icone from "../../../../../assets/erase.png";

export default defineComponent({
  components: {
    ButtonGeneric,
  },

  methods: {
    limparFiltros() {
      this.$emit("limpar");
    },
  },

  data() {
    return {
      icone,
    };
  },
});
</script>
