<template>
  <div class="page">
    <Header />

    <main
      class="mt-5 d-flex flex-column flex-md-row align-items-center justify-content-center"
    >
      <section class="d-flex flex-column align-items-center mb-4 col-md-2">
        <img
          :src="getUserData.avatar"
          alt="avatar image"
          class="rounded-circle mb-2"
        />
        <button class="btn btn-danger py-1 col-12" v-b-modal.modalAvatar>
          Update Avatar
        </button>
      </section>
      <section class="col-md-4 mx-md-4">
        <BFormGroup label="Name" label-for="input-name">
          <BFormInput
            id="input-name"
            class="my-1 px-1 border-0 border-bottom"
            type="text"
            v-model="getUserData.name"
            readonly
          />
        </BFormGroup>
        <BFormGroup label="Username" label-for="input-username">
          <BFormInput
            id="input-username"
            class="my-1 px-1 border-0 border-bottom"
            type="text"
            v-model="getUserData.username"
            readonly
          />
        </BFormGroup>
        <BFormGroup label="Email" label-for="input-email">
          <BFormInput
            id="input-email"
            class="my-1 px-1 border-0 border-bottom"
            type="text"
            v-model="getUserData.email"
            readonly
          />
        </BFormGroup>

        <button class="btn btn-danger my-2 py-1 col-12" v-b-modal.modalPassword>
          Update Password
        </button>
      </section>
    </main>

    <BModal
      id="modalAvatar"
      title="New Avatar Image"
      ok-only
      ok-title="Update"
      ok-variant="danger"
      @ok="formAvatar"
    >
      <BFormGroup label="New Avatar Image" label-for="input-avatar">
        <BFormInput
          id="input-avatar"
          class="my-1 px-1"
          type="url"
          v-model="avatar"
          required
        />
      </BFormGroup>
    </BModal>

    <BModal
      id="modalPassword"
      title="New Password"
      ok-only
      ok-title="Update"
      ok-variant="danger"
      @ok="formPassword"
    >
      <BFormGroup label="New Password" label-for="input-password">
        <BFormInput
          id="input-password"
          class="my-1 px-1"
          type="password"
          v-model="password"
          required
        />
      </BFormGroup>
      <BFormGroup label="Confirm New Password" label-for="input-confPassword">
        <BFormInput
          id="input-confPassword"
          class="my-1 px-1"
          type="password"
          v-model="confPassword"
          required
        />
      </BFormGroup>
    </BModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { BFormGroup, BFormInput, BModal } from "bootstrap-vue";
import Header from "../components/Header.vue";

export default {
  name: "Landing",
  components: {
    Header,
    BFormGroup,
    BFormInput,
    BModal,
  },
  data() {
    return {
      avatar: "",
      password: "",
      confPassword: "",
    };
  },
  methods: {
    formAvatar() {
      if (!this.avatar) {
        alert("Please provide avatar image to update!");
      } else {
        this.updateProfile({ avatar: this.avatar })
          .then(() => location.reload())
          .catch((err) => alert(err));
      }
    },
    formPassword() {
      if (!this.password || !this.confPassword) {
        alert("Please provide password to update!");
      } else if (this.password !== this.confPassword) {
        alert("Passwords are different!");
      } else {
        this.updateProfile({ password: this.password }).catch((err) =>
          alert(err)
        );
      }
    },
    ...mapActions(["updateProfile"]),
  },
  computed: {
    ...mapGetters(["getUserData"]),
  },
};
</script>

<style scoped>
img {
  width: 10rem;
}
</style>
