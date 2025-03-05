<template>
  <FloatLabel class="w-full" variant="on">
    <Select
      size="large"
      :modelValue="proposito"
      inputId="on_label"
      :options="propositos"
      optionLabel="label"
      class="w-full"
      @change="onChanged($event)"
    ></Select>
    <label for="on_label">Selecione o propósito de uso</label>
  </FloatLabel>
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

  props: {
    proposito: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      propositos: [
        {
          label: "Selecione o propósito de uso",
          value: null,
          class: "placeholder",
        },
        { label: "Uso pessoal", value: "Uso pessoal" },
        { label: "Veículo para locação", value: "Veículo para locação" },
        { label: "Uso da Empresa", value: "Uso da Empresa" },
      ],
      selectedProposito: null,
    };
  },

  methods: {
    onChanged(event: any) {
      this.$emit("changed", event.value.value);
    },
  },
});
</script>

<style lang="css" scoped></style>
