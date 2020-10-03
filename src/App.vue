<template>
  <div id="app">
    <!-- 根路由出口 -->
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
<style lang="scss" scoped>
.text {
  color: $success-color
}
</style>
