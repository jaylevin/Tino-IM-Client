<template>
  <div class="discover">
    <h1>Discover View</h1>
    <div class="content">
      Discover new topics, groups, and users.
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  name: "Faq",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$accent: #00a1ff;

.discover {
  color: $accent;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 5%;
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
  h1 {
    // padding-top: 2%;
    font-size: 1.5em;
  }
  .content {
    color: white;
  }
}
</style>
