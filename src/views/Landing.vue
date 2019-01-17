<template>
  <div class="landing">
    <h1>Landing Page</h1>
    <div class="content">
      Start your journey here.
    </div>
  </div>
</template>

<script>
import store from "@/store/store.js";
export default {
  name: "Landing",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.landing {
  color: $accent;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 5%;
  margin-top: 10%;
  margin-left: 15%;
  margin-right: 15%;
  h1 {
    font-size: 1.5em;
  }
  .content {
    color: white;
  }
}
</style>
