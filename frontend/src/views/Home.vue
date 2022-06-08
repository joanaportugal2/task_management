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

    <main class="mt-5 d-flex flex-column align-items-center">
      <h2 class="mb-2">Organize your work and life.</h2>
      <button
        class="px-2 py-1 btn btn-danger fw-bold col-4"
        @click="goRegister"
      >
        Start for free
      </button>

      <h3 class="mt-5">Start organizing your life right now.</h3>

      <section class="mx-5 my-3 px-3 py-2 border d-flex flex-column">
        <h3 class="text-center mb-2">What can I do here?</h3>

        <p class="mb-4 border-bottom pb-2">
          Personalize your own categories: maybe "school", "work" or "personal"
          isn't enough. Be more specific!
        </p>
        <p class="mb-4 border-bottom pb-2">
          Separate all your tasks by activities!
        </p>
        <p class="mb-4 border-bottom pb-2">
          Invite more people for an activity!
        </p>
        <p class="mb-4 border-bottom pb-2">
          Get notifications of tasks you need to do ASAP!
        </p>
        <p class="mb-2 border-bottom pb-2">See statistics!</p>
      </section>
    </main>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import router from "../router";

export default {
  name: "Home",
  components: {
    Logo,
  },
  methods: {
    goRegister() {
      router.push({ name: "Register" });
    },
    goLogin() {
      router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
section {
  box-shadow: 6px 6px 2px 1px rgba(255, 0, 0, 0.2);
}

section p:nth-of-type(2n) {
  text-align: right;
}
</style>
