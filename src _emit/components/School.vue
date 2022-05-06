<template>
  <div class="school">
    <h2>{{ app }}</h2>
    <h2>学校名称:{{ name }}</h2>
    <h2>学校地址:{{ address }}</h2>
    <button @click="sendSchool">点击往APP添加信息</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "南工",
      address: "北京",
      app: [],
    };
  },
  methods: {
    sendSchool() {
      this.receiveSchool(this.name);
    },
    receiveApp(msg) {
      this.app = msg;
    },
  },
  props: ["receiveSchool"],
};
</script>
<style>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>