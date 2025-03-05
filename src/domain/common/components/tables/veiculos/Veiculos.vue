<template>
  <div>
    <div class="grid pt-4">
      <div class="col-1">
        <button class="cad-vehicle" @click="modalCriacaoEdicaoAberto = true">
          Cadastrar Veículo
        </button>
      </div>
      <div class="col-2 col-offset-4">
        <FiltroMarcaVeiculo
          @changed="onFiltroMarcaVeiculoChanged($event)"
          :marca="filtro.marca"
        ></FiltroMarcaVeiculo>
      </div>

      <div class="col-2">
        <FiltroPropositoUso
          @changed="onFiltroPropositoUsoChanged($event)"
          :proposito="filtro.proposito"
        ></FiltroPropositoUso>
      </div>

      <div class="col-2">
        <FiltroPlacaCor
          :filtro="filtro"
          @changed="onFiltroPlacaCorChanged($event)"
        >
        </FiltroPlacaCor>
      </div>

      <div class="col-fixed" style="width: 140px">
        <ButtonPesquisa @filtrar="onClicked()"></ButtonPesquisa>

        <ButtonLimparFiltro @limpar="onClickedLimpar()"></ButtonLimparFiltro>

        <ButtonOrdenarPlaca
          @ordenar="onClickedOrdenarPorPlaca"
        ></ButtonOrdenarPlaca>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Placa</th>
          <th>Marca/Modelo</th>
          <th>Ano</th>
          <th>Cor</th>
          <th>Propósito de uso</th>
          <th>Zero-quilômetro?</th>
          <th>Nível de conforto</th>
          <th>Local de repouso (lat, long)</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(veiculo, index) in paginatedItems" :key="index">
          <td>{{ veiculo.placa }}</td>
          <td>{{ `${veiculo.marca} / ${veiculo.modelo}` }}</td>
          <td>{{ veiculo.ano }}</td>
          <td>{{ veiculo.cor }}</td>
          <td>{{ veiculo.propositoUso }}</td>
          <td>{{ veiculo.zeroKm ? "Sim" : "Não" }}</td>
          <td>{{ veiculo.nivelConforto }} &#9733;</td>
          <td>
            {{
              !isEmpty(veiculo.latitude) && !isEmpty(veiculo.longitude)
                ? `${veiculo.latitude}, ${veiculo.longitude}`
                : "Não informado"
            }}
          </td>
          <td>
            <div class="menu-container">
              <button class="btn-edit" @click="onOpenMenu(index)">
                <img
                  src="../../../../../assets/ellipsis-h.png"
                  alt="Botão de edição"
                />
              </button>

              <div v-if="menuAcoes === index" class="actions-menu">
                <a href="#" @click="onAbrirModal(veiculo, 'edicao')">Editar</a>
                <a href="#" @click="onAbrirModal(veiculo, 'detalhes')"
                  >Detalhes</a
                >
                <a href="#" @click="() => onDeletarVeiculo(veiculo)">Deletar</a>
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

    <ModalVeiculo
      v-if="modalCriacaoEdicaoAberto"
      :veiculo="veiculoSelecionado"
      @veiculo-cadastrado="onAdicionarVeiculo"
      @veiculo-editado="onEditarVeiculo"
      @fechar-modal="fecharModal"
    />

    <ModalDetalhesVeiculo
      v-if="modalDetalhesAberto"
      :veiculo="veiculoSelecionado"
      @fechar-modal="fecharModalDetalhes"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Veiculo } from "../../../../models/veiculo/Veiculo";
import ModalVeiculo from "../../modals/modal-veiculo/ModalVeiculo.vue";
import ModalDetalhesVeiculo from "../../modals/modal-detalhes/ModalDetalhesVeiculo.vue";
import { isEmpty } from "../../../../../core/utils/functions/is-empty/IsEmpty";
import { VeiculoService } from "../../../../../services/VeiculoService";
import TablePaginacao from "../table-paginacao/TablePaginacao.vue";
import FiltroMarcaVeiculo from "../../filtros/filtro-marca-veiculo/FiltroMarcaVeiculo.vue";
import FiltroPropositoUso from "../../filtros/filtro-proposito-uso/FiltroPropositoUso.vue";
import FiltroPlacaCor from "../../filtros/filtro-placa-cor-veiculo/FiltroPlacaCor.vue";
import ButtonPesquisa from "../../buttons/button-pesquisa/ButtonPesquisa.vue";
import ButtonLimparFiltro from "../../buttons/button-limpar-filtro/ButtonLimparFiltro.vue";
import ButtonOrdenarPlaca from "../../buttons/button-ordenar-placa/ButtonOrdenarPlaca.vue";
import { HistoricoService } from "../../../../../services/HistoricoService";

export default defineComponent({
  components: {
    ModalVeiculo,
    ModalDetalhesVeiculo,
    TablePaginacao,
    FiltroMarcaVeiculo,
    FiltroPropositoUso,
    FiltroPlacaCor,
    ButtonPesquisa,
    ButtonLimparFiltro,
    ButtonOrdenarPlaca,
  },

  data() {
    return {
      modalCriacaoEdicaoAberto: false,
      modalDetalhesAberto: false,
      veiculos: [] as Veiculo[],
      veiculosBkp: [] as Veiculo[],
      veiculoSelecionado: null as Veiculo | null,
      menuAcoes: null as number | null,
      filtro: {
        marca: "",
        proposito: "",
        placaCor: "",
      },
      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    totalPaginas() {
      return Math.ceil(this.veiculos.length / this.itensPorPagina);
    },

    paginatedItems() {
      const start = (this.paginaAtual - 1) * this.itensPorPagina;
      const end = start + this.itensPorPagina;

      return this.veiculos.slice(start, end);
    },
  },

  methods: {
    isEmpty,

    async onAdicionarVeiculo(veiculo: Veiculo) {
      this.modalCriacaoEdicaoAberto = false;

      if (veiculo) {
        await this.carregarDados();
        await HistoricoService.adicionarHistorico(veiculo.placa, "CADASTRADO");
        this.$emit("historico-atualizado");
      }
    },

    async onEditarVeiculo(veiculo: Veiculo) {
      this.modalCriacaoEdicaoAberto = false;

      if (veiculo) {
        await this.carregarDados();
        await HistoricoService.adicionarHistorico(veiculo.placa, "EDITADO");
        this.$emit("historico-atualizado");
      }
    },

    onAbrirModal(veiculo: Veiculo, tipoModal: "edicao" | "detalhes") {
      this.veiculoSelecionado = veiculo;
      this.menuAcoes = null;
      tipoModal == "edicao"
        ? (this.modalCriacaoEdicaoAberto = true)
        : (this.modalDetalhesAberto = true);
    },

    fecharModal() {
      this.modalCriacaoEdicaoAberto = false;
      this.veiculoSelecionado = null;
    },

    fecharModalDetalhes() {
      this.modalDetalhesAberto = false;
      this.veiculoSelecionado = null;
    },

    async carregarDados() {
      await VeiculoService.getVeiculos().then((veiculos: Veiculo[]) => {
        this.veiculos = veiculos;
        this.veiculosBkp = veiculos;
      });
    },

    async onDeletarVeiculo(veiculo: Veiculo) {
      this.veiculoSelecionado = veiculo;
      await VeiculoService.deletar(veiculo);
      await this.carregarDados();
      this.$emit("historico-atualizado");
    },

    onOpenMenu(index: number) {
      this.menuAcoes = this.menuAcoes === index ? null : index;
    },

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

    onFiltroMarcaVeiculoChanged(marca: string) {
      this.filtro.marca = marca;
    },

    onFiltroPropositoUsoChanged(proposito: string) {
      this.filtro.proposito = proposito;
    },

    onFiltroPlacaCorChanged(placaCor: string) {
      this.filtro.placaCor = placaCor;
    },

    filtrarVeiculos(): Veiculo[] {
      return (this.veiculos = this.veiculosBkp.filter((veiculo) => {
        return (
          (this.filtro.marca === "" || veiculo.marca === this.filtro.marca) &&
          (this.filtro.proposito === "" ||
            veiculo.propositoUso === this.filtro.proposito) &&
          (this.filtro.placaCor === "" ||
            veiculo.placa.includes(this.filtro.placaCor) ||
            veiculo.cor.includes(this.filtro.placaCor))
        );
      }));
    },

    onClicked() {
      this.filtrarVeiculos();
    },

    onClickedLimpar() {
      this.filtro.marca = "";
      this.filtro.proposito = "";
      this.filtro.placaCor = "";
      this.filtrarVeiculos();
    },

    onClickedOrdenarPorPlaca() {
      this.veiculos.sort((a, b) => a.placa.localeCompare(b.placa));
    },
  },

  async mounted() {
    await this.carregarDados();
  },
});
</script>

<style scoped>
.buttons {
  display: flex;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-radius: 10px;
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
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 700;
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

.cad-vehicle {
  width: fit-content;
  height: 36px;
  border-radius: 5px;
  background-color: #007df0;
  color: #fff;
  border: none;
  cursor: pointer;
}

.cadastro-filtros {
  padding: 16px 12px;
  display: flex;
  align-items: center;
  gap: 20px;
}

@media (max-width: 768px) {
  * {
    width: 100%;
    padding: 10px;
  }
}
</style>
