<template>
  <button class="btn" @click="onClicked($event)">
    <img :src="icone" :alt="label" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icone: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
  },

  methods: {
    onClicked(event: any) {
      this.$emit("clicked", event);
    },
  },
});
</script>

<style lang="css" scoped>
.btn {
  width: 40px;
  height: 40px;
  left: 52px;
  background-color: #ffffff;
  border: 1px solid #dfdfdf;
  cursor: pointer;
}
</style>
