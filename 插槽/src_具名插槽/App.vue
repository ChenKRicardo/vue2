<template>
  <div class="container">
    <Category title="fruit" :listData="fruit">
      <ul slot="center">
        <li v-for="(game, index) in games" :key="index">{{ game }}</li>
      </ul>
      <template v-slot:botom>
        <a href="#">单机游戏</a>
        <a href="#">网络游戏</a>
      </template>
    </Category>
    <Category title="game" :listData="games">
      <img src="../public/avator.jpg" alt="" slot="center" />
      <template #botom>
        <div class="footer">
          <a href="#">更多电影</a>
          <a href="#">更多电影</a>
          <a href="#">更多电影</a>
        </div>
        <h4>更多精彩观看</h4>
      </template>
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
.container,
.footer {
  display: flex;
  justify-content: space-around;
}
li {
  list-style: none;
  margin: 20px;
}
a,
h4 {
  text-align: center;
  padding-left: 10px;
}
</style>