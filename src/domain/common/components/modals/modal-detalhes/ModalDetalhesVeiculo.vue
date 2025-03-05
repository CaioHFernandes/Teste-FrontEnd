<template>
  <div class="modal-principal">
    <div class="modal-content">
      <div class="header-modal">
        <h2>Detalhes do veículo</h2>
        <div class="fechar-modal" @click="fecharModalDetalhes">
          <img
            src="../../../../../assets/xmark.png"
            alt="Ícone de fechar
          modal"
          />
        </div>
      </div>

      <div class="modal-body">
        <div class="container-body">
          <div class="item veiculo">
            <div>
              <img src="../../../../../assets/Vector.png" alt="" />
            </div>
            <div v-if="veiculo">
              <div>
                <span>{{ veiculo.placa }}</span>
              </div>
              <span>Frota 101</span>
            </div>
          </div>
          <div class="item">
            <div class="info-label">
              <div>Marca/Modelo</div>
              <div v-if="veiculo">
                {{ `${veiculo.marca} ${veiculo.modelo}` }}
              </div>
            </div>
          </div>
          <div class="item">
            <div class="info-label">
              <div>Ano</div>
              <div v-if="veiculo">{{ veiculo.ano }}</div>
            </div>
          </div>
          <div class="item">
            <div class="info-label">
              <div>Cor</div>
              <div v-if="veiculo">{{ veiculo.cor }}</div>
            </div>
          </div>
          <div class="item">
            <div class="info-label">
              <div>Propósito de uso</div>
              <div v-if="veiculo">{{ veiculo.propositoUso }}</div>
            </div>
          </div>

          <div class="item">
            <div class="info-label">
              <div>Zero Quilômetro?</div>
              <div v-if="veiculo">{{ veiculo.zeroKm ? "Sim" : "Não" }}</div>
            </div>
          </div>

          <div class="item">
            <div class="info-label">
              <div>Nível de Conforto</div>
              <div v-if="veiculo">{{ veiculo.nivelConforto }} &#9733;</div>
            </div>
          </div>
        </div>

        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Veiculo } from "../../../../models/veiculo/Veiculo";

export default defineComponent({
  props: {
    veiculo: {
      type: Object as PropType<Veiculo | null>,
      required: true,
    },
  },

  methods: {
    fecharModalDetalhes() {
      this.$emit("fechar-modal");
    },
  },
  mounted() {
    this.$nextTick(() => {
      var map = L.map("map").setView(
        [this.veiculo?.latitude, this.veiculo?.longitude],
        15
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.marker([this.veiculo?.latitude, this.veiculo?.longitude]).addTo(map);
    });
  },
});
</script>

<style scoped>
.modal-content {
  background-color: #fff;
  width: 90%;
  max-width: 1000px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden; /* Cabeçalho integrado ao modal */
}

.header-modal {
  width: auto;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  gap: 12px;
  background-color: #007df0;
  color: white;

  .fechar-modal {
    width: 53px;
    height: 53px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    cursor: pointer;
    width: 13px;
    height: 13px;
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
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  justify-content: center;
  align-items: center;
}

.modal-body span:first-child {
  font-weight: bold;
}

.modal-body img {
  background-color: #ff0202;
  color: #fff;
  border-radius: 50%;
  padding: 6px;
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.veiculo {
  display: flex !important;
  grid-template-columns: 1fr !important;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start !important;
  align-items: center !important;
  .img {
    padding-right: 10px;
    display: flex;
    justify-content: end;
    align-items: end;
  }
}

.info-label {
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 80px;
  padding: 5px 0px 5px 0px;
  white-space: nowrap; /*Impede os conteúdos dessa classe de quebrar linha*/
}

.info-label div:first-child {
  color: #888;
}

.info-ano {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 80px;
}

.info-cor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 80px;
}

.info-proposito-uso {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 80px;
}

.info-zero-km {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 80px;
}

.info-nivel-conforto {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

#map {
  height: 380px;
  border-radius: 10px;
}

.container-body {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 5px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

.item {
  display: flex;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
