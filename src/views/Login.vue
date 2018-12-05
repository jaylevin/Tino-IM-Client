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
    this.username = "";
    this.password = "";
    this.err = "";
  }
  setError(err) {
    if (err.includes("authentication failed")) {
      this.err = "Username and password do not match. Please try again.";
    } else if (err.includes("already authenticated")) {
      this.err = "You're already authenticated, silly goose!";
    }
  }
}

export default {
  name: "Login",
  props: ["tinodeClient"],
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
    handleLogin() {
      if (this.form.err != "") {
        this.form.err = "";
      }
      let comp = this;
      let tinode = this.$tinodeClient
        .connect()
        .then(() => {
          return this.$tinodeClient.loginBasic(
            this.form.username,
            this.form.password
          );
        })
        .then(ctrl => {
          console.log("Received ctrl message:", ctrl);
          var me = this.$tinodeClient.getMeTopic();

          me.onMeta = function(meta) {
            meta.sub.forEach(function(sub) {
              var topic = comp.$tinodeClient.getTopic(sub.topic);
              console.log(topic);
              store.dispatch("addContact", {
                name: topic.public.FN,
                uid: topic.name
              });
              var subRequest = topic
                .subscribe()
                .then(ctrl => {
                  topic.getMeta({ what: "data" });
                })
                .catch(err => {
                  console.log("err encountered:", err);
                });
            });
            console.log("Loaded contacts list.");
            comp.$router.push({ name: "chat" });
          };
          me.subscribe({ what: "sub" });
        })
        .catch(err => {
          comp.$router.push({ name: "chat" });
          comp.form.setError(err.message);
        });
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
