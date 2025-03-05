<template>
  <div>
    <Header @changed="visao = $event"></Header>

    <div v-if="visao == 'veiculos'">
      <Veiculos></Veiculos>
    </div>

    <div v-else>
      <TableHistorico></TableHistorico>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../../domain/common/components/header/Header.vue";
import TableHistorico from "../../domain/common/components/tables/table-historico/TableHistorico.vue";
import type { Veiculo } from "../../domain/models/veiculo/Veiculo";
import { isEmpty } from "../../core/utils/functions/is-empty/IsEmpty";
import Veiculos from "../../domain/common/components/tables/veiculos/Veiculos.vue";
import ButtonGeneric from "../../domain/common/components/buttons/button-generic/ButtonGeneric.vue";

export default defineComponent({
  components: {
    Header,
    TableHistorico,
    Veiculos,
    ButtonGeneric,
  },

  data() {
    return {
      visao: "veiculos" as "veiculos" | "historico",
      filtro: {
        marca: "",
        proposito: "",
        placa: "",
      },
      veiculos: [] as Veiculo[],
      modalAberto: false,
    };
  },

  methods: {
    isEmpty,

    resetarFiltros() {
      this.filtro = {
        marca: "",
        proposito: "",
        placa: "",
      };
    },

    ordenarPorPlaca() {
      this.veiculos.sort((a, b) => a.placa.localeCompare(b.placa));
    },
  },
});
</script>

<style scoped>
.cad-form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-cad {
  width: 83px;
  height: 70px;
  top: 40px;
  left: 199px;
}

.cad-box {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  width: 480px;
  height: 580px;
  top: 284px;
  left: 720px;
  display: flex;
  flex-direction: column;
}

.cad-box h2 {
  font-weight: 700px;
  font-size: 20px;
  line-height: 23.44px;
  text-align: center;
}

.cad-box form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.cad-box input {
  width: 400px;
  height: 40px;
  top: 197px;
  left: 40px;
  border: 1px solid #ddd;
}

.cad-box button {
  width: 400px;
  height: 40px;
  top: 449px;
  left: 40px;
  border-radius: 5px;
  padding: 10px;
  gap: 10px;
  background-color: #007df0;
  border: none;
  color: #fff;
  cursor: pointer;
}

.cad-box a {
  text-decoration: none;
  color: #a9a7a9;
  font-weight: 400px;
  font-size: 16px;
  text-align: center;
}

.container-top {
  display: flex;
  margin: 10px;
  align-items: center;
}

.filter-sel-proposity {
  width: 280px;
  height: 40px;
  top: 7px;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
  padding: 12px;
  gap: 10px;
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

.btn-search {
  width: 52px;
  height: 40px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 1px;
  padding: 10px;
  gap: 10px;
  background-color: #ffffff;
  border-color: #dfdfdf;
}

.btn-order {
  border: none;
  cursor: pointer;
  background-color: #fff;
}

.order {
  width: 30px;
  height: 26px;
  top: 7.5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

th,
td {
  padding: 20px 8px;
  text-align: left;
  background-color: #fff;
  border-top: 1px solid #ddd;
}
th {
  background-color: #fff;
  color: #007df0;
}

.btn-edit {
  border: none;
  cursor: pointer;
  background-color: #fff;
}

.actions-menu {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.actions-menu a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.actions-menu:hover {
  background-color: #f1f1f1;
}

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
}

@media (max-width: 768px) {
  * {
    width: 100%;
    padding: 10px;
  }
}
</style>
