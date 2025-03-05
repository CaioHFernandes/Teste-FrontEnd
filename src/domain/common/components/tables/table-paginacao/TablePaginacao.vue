<template>
  <div class="pagination-buttons">
    <button
      class="prev button-default"
      @click="onPaginaAnterior()"
      :disabled="paginaAtual == 1"
    >
      <
    </button>
    <button
      v-for="page in totalPaginas"
      class="pageNumber button-default"
      :style="getStyleActivePage(page, paginaAtual)"
      :key="page"
      @click="onPaginaAlterada(page)"
    >
      {{ page }}
    </button>
    <button
      class="next button-default active"
      @click="onPaginaProxima()"
      :disabled="paginaAtual == totalPaginas"
    >
      >
    </button>

    <div class="select-container">
      <span> Itens por página </span>
      <select
        class="select-default"
        v-model="itensPorPagina"
        @change="onItensPorPaginaChanged($event)"
      >
        <option value="10">10 itens</option>
        <option value="20">20 itens</option>
        <option value="50">50 itens</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    paginaAtual: {
      type: Number,
      required: true,
    },
    itensPorPagina: {
      type: Number,
      required: true,
    },
    totalPaginas: {
      type: Number,
      required: true,
    },
  },

  methods: {
    onPaginaAlterada(pagina: number) {
      this.$emit("paginaAlterada", pagina);
    },

    onPaginaAnterior() {
      this.$emit("paginaAnterior");
    },

    onPaginaProxima() {
      this.$emit("paginaProxima");
    },

    onItensPorPaginaChanged(event: any) {
      this.$emit("itensPorPaginaChanged", event.target.value);
    },

    getStyleActivePage(page: number, currentPage: number) {
      return {
        backgroundColor: page === currentPage ? "#007DF0" : "white",
        color: page === currentPage ? "white" : "black",
      };
    },
  },
});
</script>

<style lang="css">
.pagination-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination-buttons {
  .button-default {
    width: 35px;
    height: 35px;
    font-size: 18px;
    border-radius: 3px;
    box-shadow: 0px 4px 4px 0px #00000040;
    border: none;
    color: #333333;
    background-color: #ffffff;
  }
  .button-default:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
  .button-default:disabled {
    color: #dfdfdf;
    cursor: not-allowed;
  }
  .select-container {
    margin-left: 10px;
  }
  .select-default {
    margin-left: 5px;
    width: 90px;
    height: 35px;
    font-size: 16px;
    border-radius: 3px;
    box-shadow: 0px 4px 4px 0px #00000040;
    border: none;
    color: #333333;
    background-color: #ffffff;
  }
}
</style>
