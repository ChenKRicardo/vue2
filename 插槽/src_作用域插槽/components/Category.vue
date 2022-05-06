<template>
  <div class="category">
    <h3>{{ title }}商品</h3>
    <slot :games="games" x='hello'></slot>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      games: ["崩坏", "原神", "明日方舟"],
    };
  },
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