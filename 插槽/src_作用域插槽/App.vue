<template>
  <div class="container">
    <Category title="games" >
      <template v-slot="receiveData">
      <ul>
        <li v-for="(game, index) in receiveData.games" :key="index">{{ game }}</li>
      </ul>
      </template>
    </Category>
    <Category title="games" >
      <template v-slot="receiveData">
      <ol>
        <li v-for="(game, index) in receiveData.games" :key="index">{{ game }}</li>
      </ol>
      <h1>{{receiveData}}</h1>
      </template>
    </Category>
    <Category title="games" >
       <template v-slot="{games}">
      <h4>
        <li v-for="(game, index) in games" :key="index">{{ game }}</li>
      </h4>
      </template>
    </Category>
      </div>
</template>

<script>
import Category from "./components/Category.vue";
export default {
  
  components: {
    Category,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.container,.footer {
  display: flex;
  justify-content: space-around;
}
li {
  margin: 20px;
}

</style>