<!--该组件实现提交的数据的整理(其实不太需要好像)-->
<template>
  <ul>
    <li v-for="(item, index) in symbols" :key="index">
      {{ item.name }}: {{ item.address }}
      <button @click="$emit('remove-symbol', index)">删除</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    symbols: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
ul {
  margin-bottom: 20px;
}
</style>
