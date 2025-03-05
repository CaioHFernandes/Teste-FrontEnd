<template>
  <div class="modal-principal">
    <div class="modal-content">
      <div class="header-modal">
        <h2>{{ isModoEdicao ? "Editar veículo" : "Cadastro de veículos" }}</h2>
        <div class="close-modal" @click="fecharModal">
          <img
            src="../../../../../assets/xmark.png"
            alt="Ícone de fechar modal"
          />
        </div>
      </div>

      <div class="modal-body">
        <form class="grid">
          <div class="col-6">
            <input
              class="w-full"
              type="text"
              placeholder="Digite a placa do veículo"
              v-model="formulario.placa"
              :disabled="isModoEdicao"
            />
          </div>
          <div class="col-6">
            <select v-model="formulario.marca" class="w-full">
              <option value="">Selecione a marca do veículo</option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Chery">Chery</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Citroen">Citroen</option>
              <option value="Fiat">Fiat</option>
              <option value="Ford">Ford</option>
            </select>
          </div>
          <div class="col-6">
            <input
              class="w-full"
              type="text"
              placeholder="Digite o modelo do veículo"
              v-model="formulario.modelo"
            />
          </div>

          <div class="col-6">
            <input
              class="w-full"
              type="text"
              placeholder="Digite ano do veículo"
              v-model="formulario.ano"
            />
          </div>

          <div class="col-6">
            <input
              class="w-full"
              type="text"
              placeholder="Digite cor do veículo"
              v-model="formulario.cor"
            />
          </div>

          <div class="col-6">
            <select v-model="formulario.propositoUso" class="w-full">
              <option value="">Selecione o propósito de uso</option>
              <option value="Uso pessoal">Uso pessoal</option>
              <option value="Veículo para locação">Veículo para locação</option>
              <option value="Uso da empresa">Uso da empresa</option>
            </select>
          </div>
          <div class="col-12">
            <label for="localRepouso">Local de Repouso do veículo</label>
          </div>
          <div class="col-6">
            <input
              id="localRepouso"
              class="w-full"
              type="text"
              placeholder="Digite a latitude do veículo"
              v-model="formulario.latitude"
            />
          </div>
          <div class="col-6">
            <input
              class="w-full"
              type="text"
              placeholder="Digite a longitude do veículo"
              v-model="formulario.longitude"
            />
          </div>
          <div class="grid w-full">
            <div class="col-12">
              <div class="flex">
                <label class="mt-4">Nível de conforto:</label>
                <span
                  v-for="n in 5"
                  :key="n"
                  :class="{
                    selected: n <= formulario.nivelConforto,
                  }"
                  @click="setNivelConforto(n)"
                  class="star"
                >
                  &#9733;
                </span>
              </div>
            </div>
          </div>

          <div class="grid w-full">
            <div class="col-1">
              <input type="checkbox" v-model="formulario.zeroKm" />
            </div>
            <div class="col-11 mt-3">
              <label>Veículo zero quilômetro</label>
            </div>
          </div>

          <div class="grid w-full">
            <div class="col-2 col-offset-10">
              <button class="w-full" type="submit" @click="salvar()">
                Salvar
              </button>
            </div>
          </div>
        </form>
        <div v-if="alertaSucesso" class="alert-success">
          Veículo cadastrado com sucesso!
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Veiculo } from "../../../../models/veiculo/Veiculo";
import { uuid } from "vue-uuid";
import { VeiculoService } from "../../../../../services/VeiculoService";

export default defineComponent({
  props: {
    modalAberto: Boolean,
    veiculo: {
      type: Object as PropType<Veiculo | null>,
      required: true,
    },
  },

  data() {
    return {
      formulario: {
        placa: "",
        marca: "",
        modelo: "",
        ano: "",
        cor: "",
        propositoUso: "",
        latitude: "",
        longitude: "",
        nivelConforto: 0,
        zeroKm: false,
      } as Veiculo,

      isModoEdicao: false,
      alertaSucesso: false,
    };
  },

  methods: {
    salvar() {
      if (this.isModoEdicao) {
        this.editarVeiculo();
      } else {
        this.cadastrarVeiculo();
      }
    },

    async editarVeiculo() {
      await VeiculoService.editar(this.formulario);

      this.$emit("veiculo-editado", this.formulario);

      this.alertaSucesso = true;
      setTimeout(() => {
        this.alertaSucesso = false;
      }, 2000);
    },

    async cadastrarVeiculo() {
      const objVeiculo = {
        ...this.formulario,
        id: uuid.v4(),
      } as Veiculo;

      await VeiculoService.salvar(objVeiculo);

      this.$emit("veiculo-cadastrado", objVeiculo);

      this.alertaSucesso = true;
      setTimeout(() => {
        this.alertaSucesso = false;
      }, 2000);
    },

    setHistoricoLocalStorage(acao: "CADASTRADO" | "EDITADO" | "DELETADO") {
      VeiculoService.setHistoricoLocalStorage(this.formulario.placa, acao);
    },

    setNivelConforto(nivel: number) {
      this.formulario.nivelConforto = nivel;
    },

    resetModal() {
      this.formulario = {
        placa: "",
        marca: "",
        modelo: "",
        ano: "",
        cor: "",
        propositoUso: "",
        latitude: "",
        longitude: "",
        nivelConforto: 0,
        zeroKm: false,
      } as Veiculo;

      this.isModoEdicao = false;
      this.alertaSucesso = false;
    },

    fecharModal() {
      this.$emit("fechar-modal");
      this.resetModal();
    },
  },

  async mounted() {
    if (this.veiculo?.id) {
      this.isModoEdicao = true;
      this.formulario = { ...this.veiculo };
    }
  },
});
</script>

<style scoped>
.modal-content {
  background-color: #fff;
  width: 650px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden; /* Cabeçalho integrado ao modal */
}

.header-modal {
  width: 650px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /* padding: 10px 8px; */
  gap: 12px;
  background-color: #007df0;
  color: white;

  .close-modal {
    width: 53px;
    height: 53px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    cursor: pointer;
    width: 13px;
    width: 13px;
  }
}

.modal-principal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-body {
  padding: 20px;
}

.modal-body input {
  width: 49%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
  padding: 12px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.modal-body select {
  width: 50%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
  padding: 12px;
  margin-bottom: 10px;
  box-sizing: border-box;
  background-color: #fff;
}

.modal-body span {
  margin: 15px;
  display: flex;
}

.modal-body button {
  width: auto;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007df0;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-end;
}

.star {
  font-size: 32px;
  -webkit-text-stroke: 1px #007df0;
  color: transparent;
  cursor: pointer;
}

.star.selected {
  color: #007df0;
}

.zero-km input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.alert-success {
  width: 250px;
  height: 36px;
  margin-top: 10px;
  border-radius: 5px;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
