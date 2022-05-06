<template>
  <div id="top">
    <input type="text" placeholder="回车添加" @keyup.enter="addTodo" />
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  methods: {
    addTodo(e) {
      this.$emit("receiveTodo", {
        id: nanoid(),
        hobby: e.target.value,
        done: false,
      });
      e.target.value = "";
    },
  },
};
</script>

<style scoped>
#top {
  width: 300px;
  height: 45px;
  margin: 20px auto;
}
input {
  text-align: center;
  width: 300px;
}
input:focus {
  box-shadow: 5px 0 15px skyblue;
}
</style>