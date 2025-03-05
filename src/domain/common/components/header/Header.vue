<template>
   <div class="header">
    <a href="#" @click="openLogin">
      <img src="../../../../assets/logotipo.png" alt="Logotipo RotaLocadora"></img>
    </a>
      <button class="btn-vehicles" :class="{ 'active': activeTab === 'veiculos' }" @click="$emit('changed', 'veiculos'); changeTab('veiculos')">VEÍCULOS</button>

      <button class="btn-historic " :class="{ 'active': activeTab === 'historico' }" @click="$emit('changed', 'historico'); changeTab('historico')">HISTÓRICO DE ATIVIDADES</button>

      <div class="profile-information">
        <span>Olá, <b>Maria Clara da Silva</b>  </span>
        <img src="../../../../assets/profileIcon.png" alt="Imagem de perfil" />
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      activeTab: "veiculos",
    }
  },

  props: {
  },


  methods: {
    openLogin(){
      this.$router.push("/")
    },

    changeTab(tabName: string){
      this.activeTab = tabName;
      this.$emit("changed", tabName);
    }

  },

  computed: {},

  mounted() {
  }
});
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
  top: 0;
  padding-top: 0;
  display: flex;
  align-items: center;
}

.header img {
  width: 188px;
  height: 38px;
  border-radius: 5px;
  border: 2px;
  right: 12px;
  margin-right: 40px;
  margin-left: 12px;
}

.btn-vehicles {
  width: 87px;
  height: 38px;
  border-radius: 5px;
  padding: 12px;
  gap: 10px;
  background-color: #dfdfdf;
  border: none;
  color: #1f1f1f;
  cursor: pointer;
  margin-right: 20px;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: bold;
}

.btn-historic {
  width: 196px;
  height: 38px;
  border-radius: 5px;
  padding: 12px;
  gap: 10px;
  border: none;
  background-color: #dfdfdf;
  color: #1f1f1f;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: bold;
}

.btn-vehicles.active{
  background-color: #007DF01A;
  color: #007DF0;
}

.btn-historic.active{
  background-color: #007DF01A;
  color: #007DF0;
}

.profile-information {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.profile-information img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px;
  gap: 34px;
  margin-right: 10px;
}

@media (max-width: 768px) {
  *{
    width: 100%;
    padding: 10px;
  }
}
</style>