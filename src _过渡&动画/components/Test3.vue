<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition 
    appear 
    name="animate__animated animate__bounce"
    enter-active-class="animate__shakeY"
    leave-active-class="animate__backOutLeft"
    >
      <h1 v-show="isShow">Hello</h1>
    </transition>
  </div>
</template>

<script>
import "animate.css";
export default {
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<style scoped>
h1 {
  background-color: aqua;
}
</style>