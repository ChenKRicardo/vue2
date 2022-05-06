<template>
  <div id="list">
    <ul>
      <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInRight"
        leave-active-class="animate__fadeOutRight"
      >
        <Item v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" />
      </transition-group>
    </ul>
  </div>
</template>

<script>
import Item from "./Item.vue";
export default {
  props: ["todos"],
  components: {
    Item,
  },
};
</script>

<style>
#list {
  width: 301px;
  margin: 0 auto;
  border: 1px solid black;
}
ul {
  list-style: none;
}
</style>