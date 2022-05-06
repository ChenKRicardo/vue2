<template>
  <ul>
      <li>人物编号:{{id}}</li>
      <li>人名:{{name}}</li>
  </ul>
</template>

<script>
export default {
    name:'DetailNews',
    props:['id','name'],
    beforeDestroy(){
        console.log('DetailNews被销毁');
    },
    mounted(){
        console.log(this.$route);
    }
}
</script>

<style>

</style>