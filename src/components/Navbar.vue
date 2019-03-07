<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="logo">
        <router-link class="navbar-item" :to="{ name: 'landing' }" @click="tab='home'">Tino IM</router-link>
      </a>
      <a role="button" @click="navBurgerActivated = !navBurgerActivated"  :class="{'is-active': navBurgerActivated}" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu is-dark" :class="{'is-active': navBurgerActivated}">
      <div class="navbar-start">
        <a class="navbar-item"  @click="tab = 'home'">
          <router-link v-if="!isAuthenticated" :to="{ name: 'landing' }">Home</router-link>
          <router-link v-else :to="{ name: 'chat' }">Chat</router-link>
        </a>
        <a class="navbar-item" @click="tab = 'discover'">
          <router-link :to="{ name: 'discover' }">Discover</router-link>
        </a>
        <a class="navbar-item" @click="tab = 'faq'">
          <router-link :to="{ name: 'faq' }">FAQ</router-link>
        </a>
        <a class="navbar-item" v-if="isAuthenticated" @click="tab = 'dashboard'">
          <router-link :to="{ name: 'dashboard' }">My Dashboard</router-link>
        </a>
      </div>


      <!-- Signup and Login controls -->
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="userInfo" v-if="isAuthenticated">

            <div class="avatar image is-32x32">
              <img class="is-rounded" :src="profile.avatar.data">
            </div>

            <div class="displayName">
              <span style="color:#00a1ff">{{ profile.displayName }}</span>
            </div>

            <div class="userID">
              [<span style="color:#00a1ff">{{ userID }}</span>]
            </div>

          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a v-if="!isAuthenticated" class="button">
              <router-link :to="{ name: 'signup' }">Signup</router-link>
            </a>

            <a @click="logout" v-if="isAuthenticated" class="button">Logout</a>
            <a v-else class="button">
              <router-link :to="{ name: 'login' }">Login</router-link>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import store from "@/store/store.js";

export default {
  name: "Navbar",

  data() {
    return {
      navBurgerActivated: false,
      tab: "home"
    };
  },
  computed: {
    isAuthenticated() {
      return store.state.client.tinodeClient.isAuthenticated();
    },
    userID() {
      return store.state.client.tinodeClient.getCurrentUserID();
    },
    profile() {
      return store.getters.profile;
    }
  },
  methods: {
    logout() {
      store.dispatch("logout");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.is-dark {
  background: $grey-darker;
}

.logo {
  a {
    color: $accent;
    font-size: 30px;
    transition: color 1s ease;
    &:hover {
      color: white;
    }
  }
}

.level {
  justify-content: center;
}

.navbar-menu {
  justify-content: center;
}

.buttons {
  a {
    background: $grey-dark;
    color: $accent;
    border: none;
  }
}
.userInfo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-menu {
  a {
    transition: color 0.25s ease;
    color: white;
    &:hover {
      color: $accent;
      background: none;
    }
  }
}
</style>
