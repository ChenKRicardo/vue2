<template>
  <div class="container">
    <Category/>
    <Person/>
  </div>
</template>

<script>
import Category from "./components/Category.vue";
import Person from "./components/Person.vue";

export default {
  components: {
    Category,
    Person
  },
};
</script>

