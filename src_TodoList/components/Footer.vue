<template>
  <div id="footer" v-show="totalTodo">
    <input type="checkbox" v-model="checkAll" />
    <span>已完成{{ todoing }}</span>
    <strong>/</strong>
    <span>共{{ totalTodo }}条</span>
    <button @click="deleteTodos">删除已选</button>
  </div>
</template>

<script>
export default {
  props: ["todos"],
  methods: {
    deleteTodos() {
      this.$emit("deleteTodoing");
    },
  },
  computed: {
    totalTodo() {
      return this.todos.length;
    },
    todoing() {
      return this.todos.reduce((pre, todo) => {
        return pre + (todo.done ? 1 : 0);
      }, 0);
    },
    checkAll:{
      get() {
        return this.todoing === this.totalTodo && this.totalTodo > 0;
      },
      set(checked) {
        this.$emit("checkTodos", checked);
      },
    },
  },
};
</script>

<style scoped>
#footer {
  width: 300px;
  margin: 20px auto;
  border: 1px solid black;
}
button {
  height: 22px;
}
input {
  margin-left: 10px;
}
button {
  display: block;
}
</style>