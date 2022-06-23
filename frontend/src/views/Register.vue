<template>
  <div class="page">
    <header class="d-flex justify-content-between align-items-center p-3">
      <Logo />
      <div>
        <button class="px-2 py-1 btn" @click="goLogin">Log in</button>
        <button class="px-2 py-1 btn btn-danger fw-bold" @click="goRegister">
          Start for free
        </button>
      </div>
    </header>

    <main class="d-flex flex-column align-items-center">
      <h2 class="my-4">Create Account</h2>
      <BForm class="col-8 col-md-4" @submit.prevent="register">
        <BFormGroup label="Username" label-for="input-username">
          <BFormInput
            id="input-username"
            class="my-1 px-1 border-0 border-bottom"
            type="text"
            v-model="form.username"
            placeholder="Enter username"
            required
          />
        </BFormGroup>
        <BFormGroup label="Name" label-for="input-name">
          <BFormInput
            id="input-name"
            class="my-1 px-1 border-0 border-bottom"
            type="text"
            v-model="form.name"
            placeholder="Enter name"
            required
          />
        </BFormGroup>
        <BFormGroup label="Email" label-for="input-email">
          <BFormInput
            id="input-email"
            class="my-1 px-1 border-0 border-bottom"
            type="email"
            v-model="form.email"
            placeholder="Enter email"
            required
          />
        </BFormGroup>
        <BFormGroup label="Password" label-for="input-password">
          <div class="d-flex align-items-center">
            <b-input-group-prepend is-text @click="changeVisibilityPassword">
              <BIconEye v-if="!isPasswordVisible" />
              <BIconEyeSlash v-if="isPasswordVisible" />
            </b-input-group-prepend>
            <BFormInput
              id="input-password"
              class="my-1 px-1 border-0 border-bottom"
              :type="passwordType"
              v-model="form.password"
              placeholder="Enter password"
              required
            />
          </div>
        </BFormGroup>
        <BFormGroup label="Confirm Password" label-for="input-cpassword">
          <div class="d-flex align-items-center">
            <b-input-group-prepend is-text @click="changeVisibilityConfirm">
              <BIconEye v-if="!isConfirmVisible" />
              <BIconEyeSlash v-if="isConfirmVisible" />
            </b-input-group-prepend>
            <BFormInput
              id="input-cpassword"
              class="my-1 px-1 border-0 border-bottom"
              :type="confirmType"
              v-model="form.confirm"
              placeholder="Enter password"
              required
            />
          </div>
        </BFormGroup>
        <button class="col-12 px-2 py-1 mt-4 btn btn-danger fw-bold">
          Create Account
        </button>
      </BForm>

      <div class="mt-4 col-4">
        <p class="alert alert-success p-1" role="alert" v-if="message">
          {{ message }}
        </p>
        <p class="alert alert-danger p-1" role="alert" v-if="error">
          {{ error }}
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import router from "../router";
import {
  BForm,
  BFormGroup,
  BFormInput,
  BIconEye,
  BIconEyeSlash,
} from "bootstrap-vue";
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        name: "",
        email: "",
        password: "",
        confirm: "",
      },
      isPasswordVisible: false,
      isConfirmVisible: false,
      passwordType: "password",
      confirmType: "password",
      message: "",
      error: "",
    };
  },
  methods: {
    goRegister() {
      router.push({ name: "Register" });
    },
    goLogin() {
      router.push({ name: "Login" });
    },
    changeVisibilityPassword() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.passwordType = this.isPasswordVisible ? "text" : "password";
    },
    changeVisibilityConfirm() {
      this.isConfirmVisible = !this.isConfirmVisible;
      this.confirmType = this.isConfirmVisible ? "text" : "password";
    },
    register() {
      this.message = "";
      this.error = "";
      if (this.form.password !== this.form.confirm) {
        this.error = "Passwords are different!";
      } else {
        this.message = "";
        this.error = "";
        this.registerAccount(this.form).then((text) => {
          this.message = text;
          this.logAccount(this.form).then(() => location.reload());
        });
      }
    },
    ...mapActions(["registerAccount", "logAccount"]),
  },
  components: {
    Logo,
    BForm,
    BFormGroup,
    BFormInput,
    BIconEye,
    BIconEyeSlash,
  },
};
</script>

<style scoped></style>
