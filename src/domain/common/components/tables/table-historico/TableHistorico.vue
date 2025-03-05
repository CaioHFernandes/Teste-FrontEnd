<template>
  <div class="main-content">
    <div class="grid pt-4">
      <div class="col-2 col-offset-9">
        <FiltroPlacaCor
          :filtro="filtro"
          @changed="onFiltroPlacaCorChanged($event)"
        ></FiltroPlacaCor>
      </div>

      <div class="col-fixed" style="width: 140px">
        <ButtonPesquisa @filtrar="onClicked()"></ButtonPesquisa>

        <ButtonLimparFiltro @limpar="onClickedLimpar"></ButtonLimparFiltro>

        <ButtonOrdenarPlaca
          @ordenar="onClickedOrdenarPorPlaca"
        ></ButtonOrdenarPlaca>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Historico</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(value, index) in paginatedItems" :key="index">
          <td>
            <div class="item-historico">
              <div class="container-icon">
                <div v-if="value.acao === 'CADASTRADO'">
                  <img
                    src="../../../../../assets/plus-solid.png"
                    alt="Ícone de Cadastrado"
                  />
                </div>
                <div v-if="value.acao === 'EDITADO'">
                  <img
                    src="../../../../../assets/pen-solid.png"
                    alt="Ícone de Editado"
                  />
                </div>
                <div v-if="value.acao === 'DELETADO'">
                  <img
                    src="../../../../../assets/trash-solid.png"
                    alt="Ícone de Deletado"
                  />
                </div>
                <div
                  v-html="
                    concatHistoricoLabelGrid(
                      value.placa,
                      value.acao,
                      value.data
                    )
                  "
                ></div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <TablePaginacao
      :itensPorPagina="itensPorPagina"
      :paginaAtual="paginaAtual"
      :totalPaginas="totalPaginas"
      @paginaAlterada="paginaAtual = $event"
      @paginaProxima="onPaginaProxima()"
      @paginaAnterior="onPaginaAnterior()"
      @itensPorPaginaChanged="itensPorPagina = $event"
    ></TablePaginacao>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { concatHistoricoLabelGrid } from "./functions/ConcatHistoricoLabelGrid";
import type { Historico } from "../../../../models/historico/Historico";
import FiltroPlacaCor from "../../filtros/filtro-placa-cor-veiculo/FiltroPlacaCor.vue";
import ButtonPesquisa from "../../buttons/button-pesquisa/ButtonPesquisa.vue";
import ButtonOrdenarPlaca from "../../buttons/button-ordenar-placa/ButtonOrdenarPlaca.vue";
import ButtonLimparFiltro from "../../buttons/button-limpar-filtro/ButtonLimparFiltro.vue";
import { HistoricoService } from "../../../../../services/HistoricoService";
import TablePaginacao from "../table-paginacao/TablePaginacao.vue";

export default defineComponent({
  components: {
    FiltroPlacaCor,
    ButtonPesquisa,
    ButtonOrdenarPlaca,
    ButtonLimparFiltro,
    TablePaginacao,
  },

  data() {
    return {
      historico: [] as Historico[],
      historicoBkp: [] as Historico[],
      paginaAtual: 1,
      itensPorPagina: 10,
      filtro: {
        marca: "",
        proposito: "",
        placaCor: "",
      },
    };
  },

  computed: {
    totalPaginas() {
      return Math.ceil(this.historico.length / this.itensPorPagina);
    },

    paginatedItems() {
      const start = (this.paginaAtual - 1) * this.itensPorPagina;
      const end = start + this.itensPorPagina;
      return this.historico.slice(start, end);
    },
  },

  methods: {
    concatHistoricoLabelGrid,

    onPaginaProxima() {
      if (this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
      }
    },

    onPaginaAnterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
      }
    },

    getStyleActivePage(page: number, currentPage: number) {
      return {
        backgroundColor: page === currentPage ? "#007Df0" : "white",
        color: page === currentPage ? "white" : "black",
      };
    },

    onFiltroPlacaCorChanged(placaCor: string) {
      this.filtro.placaCor = placaCor;
    },

    onClickedOrdenarPorPlaca() {
      this.historico.sort((a, b) => a.placa.localeCompare(b.placa));
    },

    onClickedLimpar() {
      this.filtro.placaCor = "";
    },

    onClicked(): Historico[] {
      return (this.historico = this.historicoBkp.filter((historico) => {
        return (
          this.filtro.placaCor === "" ||
          historico.placa.includes(this.filtro.placaCor)
        );
      }));
    },

    async carregarDados() {
      await HistoricoService.getHistorico().then((historico: Historico[]) => {
        this.historico = historico;
        this.historicoBkp = historico;
      });
    },
  },

  async mounted() {
    await this.carregarDados();
  },
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

td {
  padding: 20px 8px;
  text-align: left;
  background-color: #fff;
  border-top: 1px solid #ddd;
}

.item-historico {
  align-items: center;
}

.container-icon {
  gap: 10px;
  display: flex;
}

.pagination-buttons {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
