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
  <!-- <input
      class="input-plate"
      type="text"
      placeholder="Digite a placa ou a cor do veículo"
      @change="onChanged($event)"
    ></input> -->
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

.input-plate {
  width: 280px;
  height: 40px;
  top: 7px;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
  padding: 12px;
  gap: 10px;
}
</style>
