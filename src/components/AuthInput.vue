<template>
  <!-- 如果给组件传递v-model，就相当于给组件传递了两个属性 1、value -->
  <!-- @input事件是输入框每次输入时候都会触发 -->
  <input type="text" class="input" />
</template>

<script>
export default {
  props: ["placeholder", "value", "name", "rule"],
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
  height: 38/360 * 100vw;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  border: none;
  border-bottom: 1px #666 solid;
  outline: none;
}
</style>