<template>
  <div class="login-form">
    <img
      class="bg-image"
      src="../../../../assets/background.png"
      alt="Imagem de Fundo"
    />
    <div class="login-box">
      <div class="icon-login">
        <img src="../../../../assets/car-garage-solid.png" alt="" />
      </div>
      <h2>Login</h2>
      <form @submit.prevent="loginTeste()">
        <FloatLabel variant="on">
          <InputText
            id="on_label"
            v-model="formulario.email"
            :pt="{
              root: { style: { width: '400px', height: '40px' } },
            }"
          />
          <label for="on_label">Digite o e-mail</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Password
            v-model="formulario.senha"
            toggleMask
            :pt="{
              root: { style: { width: '400px', height: '40px' } },
            }"
          />
          <label for="on_label">Digite a senha</label>
        </FloatLabel>
        <button type="submit">ENTRAR</button>
        <a href="#" @click="openCadastro()">Criar Conta</a>
      </form>
      <div v-if="loginSucesso" class="alerta-sucesso">
        Login efetuado com sucesso!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Password from "primevue/password";

export default defineComponent({
  components: {
    InputText,
    FloatLabel,
    Password,
  },

  props: {},

  data() {
    return {
      mensagem: "Olá, Vue com TypeScript!",
      formulario: {
        email: "" as string | undefined,
        senha: "" as string | undefined,
      },
      loginSucesso: false,
    };
  },

  methods: {
    /* Método responsável pelo login e redirecionamento para a home */
    loginTeste() {
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          nome: this.formulario.email,
          senha: this.formulario.senha,
        })
      );
      this.loginSucesso = true;

      setTimeout(() => {
        this.$router.push("/home");
        this.loginSucesso = false;
      }, 2000);
    },

    openCadastro() {
      this.$router.push("/cadastro");
    },
  },
});
</script>

<style scoped>
.login-form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

.login-box {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  width: 480px;
  height: 460px;
  top: 344px;
  left: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.icon-login {
  width: 100%;
  height: 70px;
  justify-content: center;
  align-content: center;
  display: flex;
}

.login-box form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.login-box h2 {
  text-align: center;
  color: #333333;
}

.login-box input {
  width: 400px;
  height: 40px;
  top: 197px;
  left: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.login-box button {
  width: 400px;
  height: 40px;
  border-radius: 5px;
  padding: 10px;
  gap: 10px;
  background-color: #007df0;
  color: #fff;
  border: none;
  cursor: pointer;
}

.login-box a {
  color: #a9a7a9;
  cursor: pointer;
  text-decoration: none;
}

.alerta-sucesso {
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
