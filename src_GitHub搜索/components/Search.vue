<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="keyword"
      />&nbsp;<button @click="sendValue">Search</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    sendValue() {
      this.$bus.$emit("receiveData", {
        isFirst: false,
        isLoading: true,
        errorMsg: "",
        users: [],
      });
      //请求成功后发送的数据
      axios.get(`https://api.github.com/search/users?q=${this.keyword}`).then(
        (response) => {
          this.$bus.$emit("receiveData", {
            isLoading: false,
            errorMsg: "",
            users: response.data.items,
          });
        },
        (error) => {
          this.$bus.$emit("receiveData", { isLoading: false,errorMsg:error.message,users:[]})
        }
      );
    },
  },
};
</script>

<style>
</style>