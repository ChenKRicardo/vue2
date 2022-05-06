<template>
  <div id="app">
    <Top @receiveTodo="receiveTodo" />
    <List :todos="todos" />
    <Footer
      :todos="todos"
      @deleteTodoing="deleteTodoing"
      @checkTodos="checkTodos"
    />
  </div>
</template>

<script>
import Top from "./components/Top.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
export default {
  data() {
    return {
      todos: [
        { id: 1, hobby: "明日方舟", done: true },
        { id: 2, hobby: "原神", done: false },
        { id: 3, hobby: "崩坏3rd", done: true },
      ],
    };
  },
  methods: {
    receiveTodo(todo) {
      this.todos.unshift(todo);
    },
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done;
      });
    },
    //全选或取消全选
    checkTodos(done) {
      this.todos.forEach((todo) => {
        todo.done = done;
      });
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id != id;
      });
    },
    deleteTodoing() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
    editTodo(id,newHobby) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.hobby = newHobby;
        }
      });
    },
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("deleteTodo", this.deleteTodo);
    this.$bus.$on("editTodo", this.editTodo);
  },
  beforeDestroy() {
    this.$bus.$off(["checkTodo", "deleteTodo", "editTdod"]);
  },
  components: {
    Top,
    List,
    Footer,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  width: 500px;
  border: 1px solid black;
  margin: 0 auto;
}
button {
  float: right;
  background-color: rgb(160, 78, 78);
  color: aliceblue;
  height: 34px;
  border-radius: 3px;
  display: none;
  border: 1px solid rgb(160, 78, 78);
}
.btn-edit {
  background-color: rgb(6, 230, 238);
  color: aliceblue;
  margin-right: 5px;
  border: 1px solid skyblue;
}
</style>
