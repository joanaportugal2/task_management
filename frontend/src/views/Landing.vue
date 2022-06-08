<template>
  <div class="page">
    <header class="d-flex justify-content-between align-items-center p-3">
      <Logo />
    </header>

    <main class="mt-5 d-flex flex-column align-items-center">
      <p>Landing</p>
    </main>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";

export default {
  name: "Landing",
  components: {
    Logo,
  },
};
</script>

<style scoped></style>
