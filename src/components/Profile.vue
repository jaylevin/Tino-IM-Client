<template>
  <div class="columns">
    <div class="column is-one-third">
      <figure class="image is-128x128">
        <img class="is-rounded" :src="avatarURI" v-model="avatarURI">
      </figure>
      <div class="file has-name is-fullwidth">
        <label class="file-label">
          <input class="file-input" @change="onAvatarChange" type="file" name="resume">
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
    <div class="column">
      <div class="field">
        <label class="label">Display Name</label>
        <div class="control">
          <input v-model="displayName" class="input" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input v-model="username" class="input" type="text" readonly>
        </div>
      </div>
      <div class="field">
        <label class="label">Email address</label>
        <div class="control">
          <input v-model="email" class="input" type="email">
        </div>
      </div>
      <div class="control">
        <button class="button is-link" @click="handleUpdateAccount">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  name: "Profile",
  data() {
    return {
      username: store.getters.getProfile.username,
      displayName: store.getters.getProfile.displayName,
      avatarURI: store.getters.getProfile.avatar.Data,
      email: ""
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
        vm.avatarURI = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.form.avatarURI = "";
    },
    handleUpdateAccount() {
      var currProfile = store.getters.getProfile;
      var newDisplayName = currProfile.displayName;
      var newAvatar = currProfile.avatar;
      var updated = false;

      if (currProfile.displayName != this.displayName) {
        newDisplayName = this.displayName;
        updated = true;
      }
      console.log("currProfile.avatar:", currProfile.avatar);
      if (currProfile.avatar != this.avatarURI) {
        newAvatar = this.avatarURI;
        updated = true;
      }

      var pub = {
        FN: newDisplayName,
        Photo: {
          Data: newAvatar,
          Type: "png"
        }
      };

      if (updated) {
        store.dispatch("handleUpdateProfile", pub);
      }
    }
  },
  computed: {
    profile() {
      return store.getters.getProfile;
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  color: white;
}
</style>
