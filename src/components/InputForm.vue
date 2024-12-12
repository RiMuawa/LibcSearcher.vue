<template>
  <div class="input-section">
    <label>
      函数名:
      <input v-model="symbol.name" placeholder="例如: system" />
    </label>
    <label>
      地址:
      <input v-model="symbol.address" placeholder="例如: 0x12345" />
    </label>
    <button @click="handleAdd">添加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      symbol: { name: '', address: '' },
    };
  },
  methods: {
    handleAdd() {
      if (this.symbol.name && this.symbol.address.startsWith('0x')) {
        this.$emit('add-symbol', { ...this.symbol });
        this.symbol = { name: '', address: '' };
      } else {
        alert('函数名和地址为空/地址字段不合法');
      }
    },
  },
};
</script>

<style scoped>
.input-section {
  margin-bottom: 20px;
}

.input-section input {
  margin-right: 10px;
}
</style>
