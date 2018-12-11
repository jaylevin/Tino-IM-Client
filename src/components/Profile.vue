<template>
  <div class="columns">
    <div class="column is-one-third">
        <figure>
          <img src="https://bulma.io/images/placeholders/480x480.png">
        </figure>
      <div class="file has-name is-fullwidth">
        <label class="file-label">
          <input class="file-input" type="file" name="resume">
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
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" class="input" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input v-model="username" class="input" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Email address</label>
        <div class="control">
          <input v-model="email" class="input" type="email">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      name: "",
      username: this.$tinodeClient.getCurrentLogin(),
      email: "",
      avatarData: ""
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
