<template>
  <div class="signup">
    <div class="errors" v-if="">
      <div v-if="!err.dismissed" v-for="err in form.errors" class="notification is-danger">
        <button @click="err.dismiss()" class="delete"></button>
        {{err.msg}}
      </div>
    </div>
    <div class="form">
      <form @submit.prevent="form.handleSubmit">
        <div class="field">
          <label class="label">Display Name</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Your desired display name" v-model="form.displayName">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>

          </div>

        </div>

        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left has-icons-right">
            <input  class="input" type="text" placeholder="Your desired username" v-model="form.username">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i  class="fas fa-check"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Your email address" v-model="form.email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i  class="fas fa-check"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="password" placeholder="Your password" v-model="form.password">
            <span class="icon is-small is-left">
              <i class="fa fa-key"></i>
            </span>

          </div>
        </div>
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="password" placeholder="Confirm password" v-model="form.passwordconfirm">
            <span class="icon is-small is-left">
              <i class="fa fa-key"></i>
            </span>

          </div>
        </div>

        <div class="column is-one-third">
            <figure class="image is-128x128">
              <img class="is-rounded" :src="form.avatarData" v-model="form.avatarData">
            </figure>
          <div class="file has-name is-fullwidth">
            <label class="file-label">
              <input class="file-input" type="file" @change="onAvatarChange" name="resume">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Upload new avatar
                </span>
              </span>
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox">
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>


        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Create Account</button>
          </div>
          <div class="control">
            <button class="button is-danger">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/store.js";

export default {
  name: "Signup",
  data() {
    return {
      form: {
        avatarData:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" // avatar placeholder
      }
    };
  },
  methods: {
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
.errors {
  .notification {
    padding: 5px;
  }
  margin-bottom: 25px;
}
label {
  color: white;
  font-weight: lighter;
}
.signup {
  text-align: left;
  margin: 5em;
  background-color: rgba(0, 0, 0, 0.33);
  .form {
    padding: 2%;
  }
}
</style>
