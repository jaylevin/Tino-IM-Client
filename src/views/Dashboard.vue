<template>
  <div class="chat">
    <div class="columns">
      <div class="column is-one-fifth">
        <aside class="menu">
          <p class="menu-label">
            Dashboard
          </p>
          <ul class="menu-list">
            <li><a @click="tab = 'profile'" :class="{'is-active': tab == 'profile'}">Profile</a></li>
            <li><a @click="tab = 'friends'":class="{'is-active': tab == 'friends'}">Friends</a></li>
          </ul>
          <p class="menu-label">
            Settings
          </p>
          <ul class="menu-list">
            <li><a @click="tab = 'groups'" :class="{'is-active': tab == 'groups'}">Groups</a></li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <profile v-if="tab == 'profile'"></profile>
        <div v-if="tab == 'friends'">
          My Friends
        </div>
        <div v-if="tab == 'groups'">
          My Groups
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import Profile from "@/components/Profile.vue";
export default {
  name: "Dashboard",
  components: { Profile },
  props: {},
  data() {
    return {
      tab: "profile",
      fullName: "",
      username: "",
      email: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.menu {
  padding-right: 5px;
  border-right: 1px solid grey;
}
.chat {
  text-align: left;
  margin: 10px;
}
.avatar {
  margin-left: 15px;
  border: 2px solid $accent;
}
.file {
  margin-left: 15px;
  margin-top: 5px;
}
.user-info {
  font-weight: bold;
  font-size: 22px;
  text-align: left;
}
</style>
