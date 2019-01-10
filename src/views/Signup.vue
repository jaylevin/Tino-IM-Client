<template>
  <div class="box signup">
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">Full Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Your first and last name, eg: John Doe" v-model="form.fullName">
        </div>
      </div>

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
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Your email address" v-model="form.email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <!-- <p class="help is-danger">This email is invalid</p> -->
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
      <div class="field">
        <label class="label">Confirm Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="Confirm your password" v-model="form.passwordconfirm">
          <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <!-- <p class="help is-danger">This email is invalid</p> -->
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
          <button class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button class="button is-text">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store.js";
class Form {
  constructor() {
    this.fullName = "";
    this.username = "";
    this.email = "";
    this.password = "";
    this.passwordconfirm = "";
    this.avatarData = "https://bulma.io/images/placeholders/128x128.png";
    this.errors = [];
  }
  submit() {
    if (this.password == this.passwordconfirm) {
      let client = store.getters.getClient;
      let tinode = client.connect().then(() => {
        return client
          .createAccountBasic(this.username, this.password, {
            public: {
              FN: this.fullName,
              Photo: {
                Data: this.avatarData,
                Type: "png"
              }
            },
            tags: [this.email, this.fullName, this.username]
          })
          .then(() => {
            console.log("Account created successfully");
          });
      });
    } else {
      this.errors.push("Your passwords do not match!");
      console.log("passwords don't match!");
    }
  }
}

export default {
  name: "Signup",
  data() {
    return {
      form: new Form()
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
    },
    handleSubmit() {
      console.log(
        "Form submitted:",
        this.form.fullName,
        this.form.username,
        this.form.password,
        this.form.email,
        this.form.avatarData
      );
      this.form.submit();
    }
  }
};
</script>

<style scoped lang="scss">
.signup {
  text-align: left;
  margin: 5em;
}
</style>
