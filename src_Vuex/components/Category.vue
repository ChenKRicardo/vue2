<template>
  <div>
    <h3>当前求和:{{ sum }}</h3>
    <h3>扩大10倍:{{bigSum}}</h3>
    <h3>专业:{{ subject }}</h3>
    <h3>总人数:{{personList.length}}</h3>
    <select v-model.number="number">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add(number)">+</button>
    <button @click="del(number)">-</button>
    <button @click="oddAdd(number)">求和为奇数+</button>
    <button @click="delayAdd(number)">延迟+</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      number: 1,
    };
  },
  methods: {
    // add() {
    //   this.$store.commit("JIA", this.number);
    // },
    // del() {
    //   this.$store.commit("JIAN", this.number);
    // },
    //简写 借助mapMutations生成对应的方法调用commit联系Mutation
    ...mapMutations('countAbout',{ add: "JIA", del: "JIAN" }), //对象写法
    // ...mapMutations(['JIA','JIAN']),//数组写法
    // oddAdd() {
    //   this.$store.dispatch("oddAdd", this.number);
    // },
    // delayAdd() {
    //   this.$store.dispatch("delayAdd", this.number);
    // },
    //简写 借助mapActions生成对应的方法调用depatch联系Actions
    ...mapActions('countAbout',["oddAdd", "delayAdd"]),
  },
  computed: {
    // sum(){
    //   return this.$store.state.sum
    // },
    //借助mapState,mapGetters生成计算属性
    //...mapState(['sum','subject','personList']),//数组中sum相当于上面。第一次生成sum(),第二次查找sum
    ...mapGetters('countAbout',['bigSum']),

    //模块后写法:
    ...mapState("countAbout", ["sum", "subject"]),
    ...mapState("personAbout", ["personList"]),
  },
};
</script>

<style>
select,
button {
  margin: 10px;
}
</style>

