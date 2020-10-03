<template>
  <div id="app">
    <h1>大白菜</h1>
    <!-- 根路由出口 -->
    <button @click="test">测试</button>
    <router-view/>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <p class="text"> hello world</p>
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
<style lang="scss" scoped>
.text {
  color: $success-color
}
</style>
