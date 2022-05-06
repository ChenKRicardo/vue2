<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition appear name="animation1">
      <h1 v-show="isShow">Hello</h1>
    </transition>
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
/* 进入的起点,离开的终点 */
.animation1-enter,.animation1-leave-to {
  transform: translateX(-100%);
}
.animation1-enter-active,.animation1-leave-active{
  transition: .5s linear;
}
/*离开的起点,进入的终点 */

.animation1-enter-to,.animation1-leave {
  transform: translateX(0);
}
</style>