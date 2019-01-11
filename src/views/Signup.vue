<template>
  <div class="signup">
    <div class="errors" v-if="form.errors.length">
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
            <input :class="{'is-danger': !form.validateDisplayName() && form.displayName, 'is-success': form.validateDisplayName() && form.displayName}" class="input" type="text" placeholder="Your desired display name" v-model="form.displayName">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span v-if="form.displayName.length" class="icon is-small is-right">
              <i v-if="form.validateDisplayName()" class="fas fa-check"></i>
            </span>
          </div>
          <p v-if="!form.validateDisplayName() && form.displayName" class="help is-danger">Display name must be atleast 6 characters long.</p>

        </div>

        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left has-icons-right">
            <input :class="{'is-danger': !form.validateUsername() && form.username, 'is-success': form.validateUsername() && form.username}" class="input" type="text" placeholder="Your username" v-model="form.username">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span v-if="form.username.length" class="icon is-small is-right">
              <i v-if="form.validateUsername()" class="fas fa-check"></i>
            </span>
          </div>
          <p v-if="!form.validateUsername() && form.username" class="help is-danger">Username must be atleast 6 characters long.</p>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input :class="{'is-danger': !form.validateEmail() && form.email, 'is-success': form.validateEmail() && form.email}" class="input" type="email" placeholder="Your email address" v-model="form.email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span v-if="form.email" class="icon is-small is-right">
              <i v-if="form.validateEmail()" class="fas fa-check"></i>
            </span>
          </div>
          <p v-if="!form.validateEmail() && form.email" class="help is-danger">This email is invalid.</p>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input :class="{'is-danger': !form.validatePasswords(), 'is-success': form.validatePasswords() && form.passwordconfirm && form.password}" class="input" type="password" placeholder="Your password" v-model="form.password">
            <span class="icon is-small is-left">
              <i class="fa fa-key"></i>
            </span>
            <span v-if="form.validatePasswords() && form.password && form.passwordconfirm" class="icon is-small is-right">
              <i v-if="form.validatePasswords()" class="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control has-icons-left has-icons-right">
            <input :class="{'is-danger': !form.validatePasswords(), 'is-success': form.validatePasswords() && form.passwordconfirm && form.password}" class="input" type="password" placeholder="Confirm password" v-model="form.passwordconfirm">
            <span class="icon is-small is-left">
              <i class="fa fa-key"></i>
            </span>
            <span v-if="form.validatePasswords() && form.password && form.passwordconfirm" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
          <p v-if="!form.validatePasswords()" class="help is-danger">Passwords do not match.</p>
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
import store from "@/store.js";

class Error {
  constructor() {
    this.dismissed = false;
    this.msg = "";
  }
  dismiss() {
    this.dismissed = true;
  }
}

class Form {
  constructor() {
    this.displayName = "";
    this.username = "";
    this.email = "";
    this.password = "";
    this.passwordconfirm = "";
    this.avatarData = "https://bulma.io/images/placeholders/128x128.png";
    this.errors = [];
  }

  newError(msg) {
    let err = new Error();
    err.msg = msg;
    this.errors.push(err);
  }

  validateForm() {
    return (
      this.validateEmail() &&
      this.validateDisplayName() &&
      this.validateUsername() &&
      this.validatePasswords() &&
      this.email &&
      this.displayName &&
      this.password &&
      this.passwordconfirm &&
      this.username
    );
  }

  validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = true;
    valid = re.test(this.email);

    return valid;
  }
  validateDisplayName() {
    let valid = true;
    if (this.displayName.length < 6) {
      valid = false;
    }
    console.log("valid display:", valid);
    return valid;
  }
  validateUsername() {
    let valid = true;
    if (this.username.length < 6) {
      valid = false;
    }
    console.log("valid username:", valid);
    return valid;
  }

  validatePasswords() {
    let valid = true;
    if (this.passwordconfirm != this.password) {
      valid = false;
    }
    return valid;
  }

  handleSubmit() {
    this.errors = [];

    if (!this.validateDisplayName() && this.displayName) {
      this.newError("Display name must be at least 6 characters long.");
    }
    if (!this.validateUsername() && this.username) {
      this.newError("Username must be at least 6 characters long.");
    }
    if (!this.validateEmail() && this.email) {
      this.newError("Invalid email address.");
    }
    if (!this.validatePasswords() && this.password && this.passwordconfirm) {
      this.newError("Passwords do not match.");
    }
    if (this.validateForm()) {
      // this.errors.size == 0
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
            tags: [this.email]
          })
          .then(() => {
            axios
              .post(`http://localhost:8000/users`, {
                tinodeUID: client.getCurrentUserID(),
                displayName: this.form.fullName,
                username: this.form.username,
                email: this.form.email,
                avatarData: this.form.avatarData
              })
              .then(response => {
                if (response.status == 200) {
                  // account was created successfully, change views
                  this.$router.push({ name: "login" });
                }
              })
              .catch(e => {
                console.log("error on POST: ", e);
                this.form.errors.push(e);
              });
          });
      });
    } else {
      console.log("errors detected");
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
