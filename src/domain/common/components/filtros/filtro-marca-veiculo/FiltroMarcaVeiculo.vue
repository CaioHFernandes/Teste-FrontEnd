<template>
  <FloatLabel class="w-full md:w-56" variant="on">
    <Select
      size="large"
      :modelValue="marca"
      inputId="on_label"
      :options="marcas"
      optionLabel="label"
      class="w-full"
      @change="onChanged($event)"
    ></Select>
    <label for="on_label">Selecione a marca do veículo</label>
  </FloatLabel>
  <!-- <select class="select" @change="onChanged($event)" v-model="marca">
    <option value="">Selecione a marca do veículo</option>
    <option value="Audi">Audi</option>
    <option value="BMW">BMW</option>
    <option value="Chery">Chery</option>
    <option value="Chevrolet">Chevrolet</option>
    <option value="Citroen">Citroen</option>
    <option value="Fiat">Fiat</option>
    <option value="Ford">Ford</option>
  </select> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FloatLabel from "primevue/floatlabel";
import Select from "primevue/select";

export default defineComponent({
  components: {
    FloatLabel,
    Select,
  },

  data() {
    return {
      marcas: [
        {
          label: "Selecione a marca do veículo",
          value: null,
          class: "placeholder",
        },
        { label: "Audi", value: "Audi" },
        { label: "BMW", value: "BMW" },
        { label: "Chery", value: "Chery" },
        { label: "Chevrolet", value: "Chevrolet" },
        { label: "Citroen", value: "Citroen" },
        { label: "Fiat", value: "Fiat" },
        { label: "Ford", value: "Ford" },
      ],
      selectedMarca: this.marca,
    };
  },

  props: {
    marca: {
      type: String,
      required: true,
    },
  },

  methods: {
    onChanged(event: any) {
      this.$emit("changed", event.value.value);
    },
  },
});
</script>

<style lang="css" scoped>
.select {
  width: 280px;
  height: 40px;
  top: 7px;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
  padding: 12px;
  gap: 10px;
  color: #a9a7a9;
  background-color: #fff;
}

.select option {
  color: black;
}
</style>
