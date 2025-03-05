<template>
  <CadastroUsuario></CadastroUsuario>
</template>

<script lang="ts">
import CadastroUsuario from "../../domain/common/components/cadastro/CadastroUsuario.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { CadastroUsuario },

  mounted() {
    console.log("Componente montado com TypeScript!");
  },
});
</script>
