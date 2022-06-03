<template>
  <div class="d-flex align-items-center">
    <BIconPencilFill
      class="rounded-circle bg-danger py-2"
      variant="light"
      font-scale="3"
    />
    <h1 class="mx-2">MyTodos</h1>
  </div>
</template>

<script>
import { BIconPencilFill } from "bootstrap-vue";

export default {
  name: "Logo",
  components: {
    BIconPencilFill,
  },
};
</script>

<style scoped></style>
