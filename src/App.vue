<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- 
      当用户在使用封装的按钮时,需要向HintButton组件传递相应的参数
      对EL-button进行二次封装
     -->
    <HintButton type='primary' icon='el-icon-delete' size='mini' title="这是一个annual"
    @click="handler"
    />
  </div>
</template>

<script>
import HintButton from "./components/HintButton.vue";
export default {
  name: "App",
  components: {
    HintButton,
  },
  methods:{
    handler(){
      alert('listener')
    }
  }
};
</script>
