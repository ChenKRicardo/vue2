<template>
  <div>
    <ul>
      <!-- 跳转路由并携带参数的to:字符串写法 -->
      <!-- <li v-for="msg in messageList" :key="msg.id"><router-link :to="`/home/message/detail/?id=${msg.id}&game=${msg.game}`">{{msg.game}}</router-link></li> -->
      <!-- 对象写法 -->
      <li v-for="msg in messageList" :key="msg.id">
        <router-link
          :to="{
            name: 'detailMsgs',
            query: {
              id: msg.id,
              game: msg.game
            }
          }"
        >
        {{ msg.game }}
        </router-link>
        <button @click="PushShow(msg)">Push查看</button>
        <button @click="Replace(msg)">Replace查看</button>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageList: [
        { id: "001", game: "原神" },
        { id: "002", game: "崩坏" },
        { id: "003", game: "明日方舟" },
      ],
    };
  },
  methods: {
    PushShow(msg) {
      this.$router.push({
        name: 'detailMsgs',
        query: {
          id: msg.id,
          game: msg.game
        }
      })
    },
    Replace(msg){
      this.$router.replace({
        name: 'detailMsgs',
        query: {
          id: msg.id,
          game: msg.game
        }
      })
    }
  },
  mounted() {
    console.log(this.$router);
  }
};
</script>

