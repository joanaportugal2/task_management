<template>
  <div class="page">
    <Header />

    <main class="mt-5 d-flex flex-column align-items-center">
      <p>Landing</p>
    </main>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Landing",
  components: {
    Header,
  },
};
</script>

<style scoped></style>
