<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <School />
    <Student />
  </div>
</template>

<script>
import School from "./components/School";
import Student from "./components/Student";
export default {
  name: "App",
  data() {
    return {
      msg: "hello",
    };
  },
  components: {
    School,
    Student,
  },
};
</script>

<style>
#app {
  background-color: aquamarine;
  padding: 5px;
}
</style>
