<template>
  <Login></Login>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from "../../domain/common/components/login/Login.vue";

export default defineComponent({
  components: {Login},

  mounted() {
    console.log('Componente montado com TypeScript!');
  },
});
</script>

<style scoped></style>