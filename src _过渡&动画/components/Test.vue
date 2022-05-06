<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group appear name="animation1">
      <h1 v-show="!isShow" key="1">Hello</h1>
      <h1 v-show="isShow" key="2">ck</h1>
    </transition-group>
  </div>
</template>

<script>
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
.animation1-enter-active {
  animation: display 1s linear;
}
.animation1-leave-active {
  animation: display 1s reverse;
}
@keyframes display {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>