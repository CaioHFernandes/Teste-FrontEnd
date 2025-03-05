<template>
  <div class="cad-form">
    <img
      class="bg-image"
      src="../../../../assets/background.png"
      alt="Imagem de Fundo"
    />
    <div class="cad-box">
      <img
        class="icon-cad"
        src="../../../../assets/car-garage-solid.png"
        alt="Imagem de Cadastro"
      />
      <h2>Novo Cadastro</h2>
      <form @submit.prevent="cadastrarUsuario()">
        <FloatLabel variant="on">
          <InputText
            id="on_label"
            v-model="formulario.nome"
            :pt="{ root: { style: { width: '400px', height: '40px' } } }"
          />
          <label for="on_label">Digite o nome</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <DatePicker
            v-model="formulario.dataNascimento"
            inputId="on_label"
            showIcon
            iconDisplay="input"
            :pt="{ root: { style: { width: '400px', height: '40px' } } }"
          />
          <label for="on_label">Data de Nascimento</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText
            id="on_label"
            v-model="formulario.email"
            :pt="{ root: { style: { width: '400px', height: '40px' } } }"
          />
          <label for="on_label">Digite o e-mail</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Password
            v-model="formulario.senha"
            toggleMask
            :pt="{
              root: { style: { width: '400px', height: '40px' } },
              trigger: {
                class: 'p-password-trigger',
                style: { width: '20px', height: '20px' },
              },
            }"
          />
          <label for="on_label">Digite a senha</label>
        </FloatLabel>
        <button type="submit">CADASTRAR</button>
        <a href="#" @click="openLogin">Fazer login</a>
      </form>
      <div v-if="cadastroSucesso" class="alert-success">
        Cadastro efetuado com sucesso!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Password from "primevue/password";
import DatePicker from "primevue/datepicker";

export default defineComponent({
  components: {
    InputText,
    FloatLabel,
    Password,
    DatePicker,
  },

  props: {},

  data() {
    return {
      formulario: {
        nome: "" as string | undefined,
        dataNascimento: null as Date | null | undefined | (Date | null)[],
        email: "" as string | undefined,
        senha: "",
      },
      cadastroSucesso: false,
    };
  },

  methods: {
    cadastrarUsuario() {
      //Busca usuários existentes no LocalStorage ou cria um array vazio
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

      usuarios.push(this.formulario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      this.cadastroSucesso = true;

      setTimeout(() => {
        this.$router.push("/");
        this.cadastroSucesso = false;
      }, 2000);
    },

    openLogin() {
      this.$router.push("/");
    },
  },

  computed: {},

  mounted() {},
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
  max-width: 83px;
  height: 70px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0 auto;
}
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.5;
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
  justify-content: center;
}

.cad-box h2 {
  font-weight: 700px;
  font-size: 20px;
  line-height: 23.44px;
  text-align: center;
  color: black;
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
  color: #a9a7a9;
  cursor: pointer;
  text-decoration: none;
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
