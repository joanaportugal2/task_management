<template>
  <button class="btn d-flex align-items-center" @click="goLanding">
    <BIconPencilFill
      class="rounded-circle bg-danger py-2"
      variant="light"
      font-scale="3"
    />
    <h1 class="mx-2">MyTodos</h1>
  </button>
</template>

<script>
import { BIconPencilFill } from "bootstrap-vue";
import router from "../router";

export default {
  name: "Logo",
  components: {
    BIconPencilFill,
  },
  methods: {
    goLanding() {
      router.push({ name: "Landing" });
    },
  },
};
</script>

<style scoped></style>
