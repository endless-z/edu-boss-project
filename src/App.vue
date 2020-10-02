<template>
  <div id="app">
    <h1>大白菜</h1>
    <!-- 根路由出口 -->
    <button @click="test">测试</button>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class App extends Vue {
  name = '大白菜'
  age = '18'
  userInfo = {
    title: '1',
    age: 20
  }

  test () {
    console.log(this.age)
  }
}
</script>

<!--<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      name: '大白菜',
      age: '18',
      userInfo: {
        title: '1',
        age: 20
      }
    }
  },
  methods: {
  }
})
</script>-->

<!-- <script>
// 1、编辑器给的类型提示
// 2、TypeScript 编译期间的类型验证
export default {
  data () {
    return {
      name: '大白菜',
      age: '18',
      userInfo: {
        title: '1',
        age: 20
      }
    }
  },
  methods: {
    test () {
      // this.data.
      this.age.abc()
    }
  }
}
</script>-->

<style lang="scss" scoped></style>
