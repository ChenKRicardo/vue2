<template>
  <div class="category">
    <h3>{{ title }}商品</h3>
    <slot name="center"></slot>
    <slot name="botom"></slot>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style>
.category {
  width: 300px;
  height: 200px;
  background-color: skyblue;
  margin: 20px;
}
h3 {
  background-color: aqua;
  text-align: center;
  margin-top: 10px;
}
img {
  width: 300px;
  height: 150px;
}
</style>