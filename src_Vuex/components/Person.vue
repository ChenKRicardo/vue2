<template>
  <div>
    <input type="text" placeholder="添加信息" v-model="name" />
    <button @click="addPerson">点击添加</button>
    <button @click="addChen">添加姓陈</button>
    <h3>列表中第一个人是:{{ firstPerson }}</h3>
    <ul>
      <li v-for="person in personList" :key="person.id">{{ person.name }}</li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  data() {
    return {
      name: "",
    };
  },
  computed: {
    personList() {
      return this.$store.state.personAbout.personList;
    },
    firstPerson() {
      return this.$store.getters["personAbout/firstPersonName"];
    },
  },
  methods: {
    addPerson() {
      const newPerson = { id: nanoid(), name: this.name };
      this.$store.commit("personAbout/ADDPERSON", newPerson);
      this.name = "";
    },
    addChen() {
      const newPerson = { id: nanoid(), name: this.name };
      this.$store.dispatch('personAbout/addPersonChen',newPerson)
      this.name = ''
    },
  },
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style>
</style>