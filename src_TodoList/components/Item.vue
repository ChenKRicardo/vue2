<template>
  <li>
    <input
      type="checkbox"
      :checked="todo.done"
      @change="handleCheck(todo.id)"
    />
    <span v-show="!todo.isEdit">{{ todo.hobby }}</span>
    <input
      type="text"
      :value="todo.hobby"
      v-show="todo.isEdit"
      @blur="changeHobby(todo, $event)"
      ref="input"
    />
    <button @click="deleteOne(todo.id)">删除</button>
    <button class="btn-edit" @click="handleEdit(todo)" v-show="!todo.isEdit">
      编辑
    </button>
  </li>
</template>

<script>
export default {
  props: ["todo", "deleteTodo"],
  methods: {
    handleCheck(id) {
      this.$bus.$emit("checkTodo", id);
    },
    handleEdit(todo) {
      if (todo.hasOwnProperty("isEdit")) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },
    changeHobby(todo, e) {
      if (!e.target.value.trim()) return alert("输入不能为空!!");
      this.$bus.$emit("editTodo", todo.id, e.target.value, todo);
      todo.isEdit = false;
      // console.log(e.target.value);
      // console.log(this.todo);
    },
    deleteOne(id) {
      if (confirm("确认删除")) this.$bus.$emit("deleteTodo", id);
    },
  },
};
</script>

<style scoped>
li {
  border: 1px solid black;
}
input {
  margin: 10px;
}
li:hover button {
  display: block;
}
span > input {
  display: none;
}
</style>