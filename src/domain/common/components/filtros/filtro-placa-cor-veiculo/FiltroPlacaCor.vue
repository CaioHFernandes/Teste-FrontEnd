<template>
  <FloatLabel class="w-full" variant="on">
    <InputText
      size="large"
      id="on_label"
      v-model="filtro.placaCor"
      class="w-full"
    />
    <label for="on_label">Digite a placa ou cor do veículo</label>
  </FloatLabel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";

export default defineComponent({
  components: {
    FloatLabel,
    InputText,
  },

  props: {
    filtro: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onChanged(event: any) {
      this.$emit("changed", event.target.value);
    },
  },
});
</script>

<style lang="css" scoped>
.container-top {
  display: flex;
  margin: 10px;
  align-items: center;
}
</style>
