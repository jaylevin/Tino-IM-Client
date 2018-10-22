<template>

  <nav class="navbar level is-dark">
    <p class="level-item has-text-centered">
      <router-link v-if="!isAuthenticated" :to="{ name: 'landing' }">Home</router-link>
      <router-link v-else :to="{ name: 'chat' }">Home</router-link>
    </p>
    <p class="level-item has-text-centered">
      <router-link :to="{ name: 'discover' }">Discover</router-link>
    </p>
    <p class="level-item has-text-centered">
      <router-link class="logo" :to="{ name: 'landing' }">Tino IM</router-link>
    </p>
    <p class="level-item has-text-centered">
      <router-link v-if="isAuthenticated" :to="{ name: 'dashboard' }">My Dashboard</router-link>
      <router-link v-else :to="{ name: 'faq' }">FAQ</router-link>
    </p>
    <p class="level-item has-text-centered">
      <a @click="logout"v-if="isAuthenticated" class="link is-info">Logout</a>
      <a @click="test" v-else class="link is-info">Login</a>
    </p>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store.js";

export default {
  name: "Navbar",
  props: {},
  computed: {
    ...mapGetters({
      // map `this.isAuthenticated` to `this.$store.getters.isAuthenticated`
      isAuthenticated: "isAuthenticated"
    })
  },
  methods: {
    test() {
      store.dispatch("login");
    },
    logout() {
      store.dispatch("logout");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$accent: #00a1ff;

.logo {
  transition: color 0.5s ease;
  &:hover {
    color: white;
  }
  color: $accent;
  font-size: 30px;
}
nav {
  a {
    transition: color 0.5s ease;
    &:hover {
      color: $accent;
    }
    color: white;
  }
}
</style>
