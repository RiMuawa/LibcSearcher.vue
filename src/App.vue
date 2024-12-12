<template>
  <div class="app">
    <h1>libc 地址查询工具</h1>
    <InputForm @add-symbol="addSymbol" />
    <SymbolList :symbols="symbols" @remove-symbol="removeSymbol" />
    <button @click="submitData">提交数据</button>
    <Results :results="results" />
  </div>
</template>

<script>
import {ref} from 'vue';
import InputForm from './components/InputForm.vue';
import SymbolList from './components/SymbolList.vue';
import Results from './components/Results.vue';
import axios from 'axios';

export default {
  components: {
    InputForm,
    SymbolList,
    Results,
  },
  data() {
    return {
      symbols: [],//symbols是指提交的symbols
      results: [],
      LeakAddress: [],
    };
  },
  methods: {
    addSymbol(symbol) {
      this.symbols.push(symbol);
    },
    removeSymbol(index) {
      this.symbols.splice(index, 1);
    },
    async submitData() {
      if (this.symbols.length === 0) {
        alert('请添加至少一个函数名和地址');
        return;
      }

      const payload = {
        symbols: Object.fromEntries(
          this.symbols.map(({ name, address }) => [name, address]),
          //写入address,给Results.vue用来做真实地址计算
        ),
      };

      try {
        const response = await axios.post('https://libc.rip/api/find', payload);
        this.results = response.data;
      } catch (error) {
        console.error('请求失败:', error);
        alert('查询失败，请检查网络或输入数据');
      }
    },
  },
};
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  margin: 20px;
}
</style>
