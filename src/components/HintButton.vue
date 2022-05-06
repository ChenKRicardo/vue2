<template>
  <a title="title">
    <el-button v-bind='$attrs' v-on="$listeners">饿了么默认按钮</el-button>
  </a>
</template>

<script>
export default {
  name: "HintButton",
  props: ["title"],
  mounted() {
    console.log(this.$attrs);
     console.log(this.$listeners);
  },
};
</script>

<style></style>
