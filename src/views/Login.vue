<template>
  <div class="box signup">

    <form @submit.prevent="handleLogin">
      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Your login name" v-model="form.username">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <!-- <p class="help is-success">This username is available</p> -->
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="Your password" v-model="form.password">
          <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <!-- <p class="help is-danger">This email is invalid</p> -->
      </div>

      <p style="color:red; padding-bottom:5px;" v-if="form.err">
        {{form.err}}
      </p>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Login</button>
        </div>
        <div class="control">
          <button class="button is-link is-success">Signup</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/store.js";
import router from "@/router.js";

export default {
  name: "Login",

  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    handleLogin() {
      console.log(
        "Sending login request:",
        this.form.username,
        this.form.password
      );
      store
        .dispatch("authenticate", {
          username: this.form.username,
          password: this.form.password
        })
        .then(data => {
          console.log("Data:", data);
        })
        .catch(err => {
          console.log("ERRR:", error);
        });
    },
    onAvatarChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.form.avatarData = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.form.avatarData = "";
    }
  }
};
</script>

<style scoped lang="scss">
label {
  color: white;
}

.signup {
  text-align: left;
  margin-top: 5em;
  display: inline-block;
  width: 500px;
  background-color: rgba(54, 54, 54, 0.3);
}
</style>
