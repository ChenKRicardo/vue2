<template>
  <div class="container">
    <Category title="food">
      <img src="../public/avator.jpg" alt="" />
    </Category>
    <Category title="fruit" :listData="fruit">
      <ul>
        <li v-for="(game, index) in games" :key="index">{{ game }}</li>
      </ul>
    </Category>
    <Category title="game" :listData="games">
      <img src="../public/avator.jpg" alt="" />
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category.vue";
export default {
  data() {
    return {
      foods: ["冰淇淋", "蛋糕", "火锅"],
      fruit: ["香蕉", "苹果", "西瓜"],
      games: ["崩坏", "原神", "明日方舟"],
    };
  },
  components: {
    Category,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.container {
  display: flex;
  justify-content: space-around;
}
li {
  list-style: none;
  margin: 20px;
}
</style>