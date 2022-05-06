<template>
    <div class='student'>
        <h2>姓名:{{name}}</h2>
        <h2>年龄:{{18}}</h2>
        <h2>{{number}}</h2>
        <button @click="sendStudent">点击往APP添加信息</button>
        <button @click="unbind">解绑事件</button>
        <button @click="number++">点击+1</button>
        <button @click="death">销毁Student组件实例(vc)</button>
    </div>
</template>

<script>
export default {
    name:'Student',
    data(){
        return {
          name:'陈康',
          age:'18',
          number:0,
        }
    },
    methods: {
        sendStudent(){
            //触发自定义组件实例事件
            this.$emit('ck',this.name,1,23,4,4)
            // this.$emit('demo')
        },
        unbind(){
            this.$off('ck')//只适用于解绑一个事件
            //this.$off(['ck','demo'])//解绑多个
            // this.$off()
        },
        death(){
            this.$destroy()//销毁当前sudent组件实例以及自定义方法都被销毁
        },
        
    },
}
</script>
<style>
    .student{
        background-color:rgb(30, 39, 43);
        margin-top:30px;
    }
</style>