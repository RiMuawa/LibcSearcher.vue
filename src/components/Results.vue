<!--处理返回的json,并展示数据-->
<template>
  <div v-if="results.length > 0">
    <h2>返回结果</h2>
    <div v-for="(result, index) in results" :key="index" class="result">
      <button @click="toggleCollapse(index)">
        {{ collapsedIndexes.includes(index) ? '展开' : '折叠' }}
      </button>
      <div v-if="collapsedIndexes.includes(index)">
        {{ extractFilename(result.download_url) }}
      </div>
      <div v-else>
        <p><strong>Build ID:</strong> {{ result.buildid }}</p>
        <p>
          <strong>Download URL:</strong>
          <a :href="result.download_url" target="_blank">{{ result.download_url }}</a>
        </p>
        <p><strong>Symbols:</strong></p>
        <ul>
          <li v-for="(addr, sym) in result.symbols" :key="sym">
            {{ sym }}: {{ addr }}
          </li>
          <h3>
            libc_base:{{ libc_base }}
            <br>
            可能的system_addr:{{ system_addr }}
          </h3>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    symbols: {//symbol是用户输入!!!!!!!!!
      type: Array,
      required: true,
    },
    results: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      libc_base : 0x00,
      system_addr : 0x00,
      collapsedIndexes: [], // 存储折叠的结果索引
    };
  },
  computed: {
    libc_base: {
      get() {
        
        return 
      },
    },
    system_addr: {
      get(){
        return libc_base + 
      }
    }
  },
  methods: {
    toggleCollapse(index) {
      const isCollapsed = this.collapsedIndexes.includes(index);
      if (isCollapsed) {
        // 如果已折叠，展开
        this.collapsedIndexes = this.collapsedIndexes.filter(i => i !== index);
      } else {
        // 如果未折叠，折叠
        this.collapsedIndexes.push(index);
      }
    },
    extractFilename(url) {
      try {
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        return filename.split('.so')[0]; // 提取.so前的部分
      } catch {
        return '未知文件';
      }
    },
  },
};
</script>

<style scoped>
.result {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-bottom: 10px;
}
</style>
