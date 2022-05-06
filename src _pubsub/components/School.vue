<template>
  <div class="school">
    <h2>学校名称:{{ name }}</h2>
    <h2>学校地址:{{ address }}</h2>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: "School",
  data() {
    return {
      name: "南工",
      address: "北京",
    };
  },
  mounted() {
   this.pubId = pubsub.subscribe('hello',(eventName,data)=>{
      console.log('事件触发,接受消息',eventName,data);
    })
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pubId )//
  },
};
</script>
<style>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>