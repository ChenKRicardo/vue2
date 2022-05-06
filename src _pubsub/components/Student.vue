<template>
  <div class="student">
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <button @click='sendStudentName'>兄弟组件互传</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: "Student",
  data() {
    return {
      name: "陈康",
      age: "18",
      number: 0,
    };
  },
  methods: {
    sendStudentName() {
      pubsub.publish('hello',this.name)
    },
  },
};
</script>
<style>
.student {
  background-color: rgb(30, 39, 43);
  margin-top: 30px;
}
</style>