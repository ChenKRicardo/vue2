<template>
  <ul>
    <li v-for="item in newList" :key="item.id">
      <router-link
        :to="{
          name: 'detailNews',
          params: {
            id: item.id,
            name: item.name,
          }
        }"
      >{{ item.name }}</router-link>
      <input type="text" />
    </li>
      <router-view></router-view>
  </ul>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      opacity: 1,
      newList: [
        { id: "004", name: "JK" },
        { id: "001", name: "陈康" },
        { id: "002", name: "我" },
        { id: "003", name: "爱你" },
      ],
    };
  },
  activated() {
    console.log('News组件被激活');
  },
  deactivated() {
    console.log('News组件失活');

  }
};
</script>

