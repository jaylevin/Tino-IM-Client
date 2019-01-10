<template>
  <div class="faq">
    <h1>FAQ View</h1>
    <div class="content">
      Frequently asked questions and how-tos.
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
.faq {
  color: $accent;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 5%;
  margin-top: 15%;
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
