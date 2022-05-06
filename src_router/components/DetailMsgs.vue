<template>
  <ul>
      <li>游戏编号:{{id}}</li>
      <li>游戏名:{{game}}</li>
  </ul>
</template>

<script>
export default {
    name:'DetailMsgs',
    props:['id','game'],
    mounted(){
        console.log(this.$route);
    }
}
</script>

<style>

</style>