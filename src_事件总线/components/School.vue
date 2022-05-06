<template>
  <div class="school">
    <h2>学校名称:{{ name }}</h2>
    <h2>学校地址:{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "南工",
      address: "北京",
    };
  },
  mounted() {
    this.$bus.$on('hello',data=>{
      console.log('School',data);
    })
  },
  beforeDestroy() {
    this.$bus.$off('hello')//解绑
  },
};
</script>
<style>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>