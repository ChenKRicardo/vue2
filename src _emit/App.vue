<template>
  <div id="app">
    <h1>{{msg}}</h1>
     <!-- 第一种方式 -->
    <School :receiveSchool='receiveSchool' ref="child"/>
     <!-- 第二种方式 -->
    <!-- <Student @ck="receiveStudent" @demo='myevent'/> -->
     <!-- 第三种方式 -->
     <Student ref="Student" @click.native="show" />
     <button @click="getSchool">ref父传子</button>
  </div>
</template>

<script>
import School from './components/School';
import Student from './components/Student'
export default {
  name: 'App',
  data() {
    return {
      msg:['hello']
    }
  },
  methods: {
   receiveSchool(name){
     this.msg.unshift(name)
   },
   receiveStudent(name,...parms){
     this.msg.unshift(name,...parms)
   },
   myevent(){
     console.log('触发事件');
   },
   show(){
     alert('实例绑定原生事件')
   },
   getSchool(){
     this.$refs.child.receiveApp(this.msg)
   }
  },
  mounted() {
   this.$refs.Student.$on('ck',this.receiveStudent)
    // setTimeout(()=>this.$refs.Student.$on('ck',this.receiveStudent) ,3000)
  },
  components: {
      School,
      Student
  },
}
</script>

<style>
  #app{
    background-color: aquamarine;
    padding:5px;
  }
</style>
