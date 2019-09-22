<template>
  <!-- 如果给组件传递v-model，就相当于给组件传递了两个属性 1、value -->
  <!-- @input事件是输入框每次输入时候都会触发 -->
  <input
    type="text"
    class="input"
    :class="{success:status==='success',error:status==='error'}"
    :placeholder="placeholder"
    :value="value"
    @input="handleInput"
    @change="handleChange"
  />
</template>

<script>
export default {
  data() {
    return {
      status: ""
    };
  },
  props: ["placeholder", "value", "name", "rule", "err_message"],
  mounted() {},
  methods: {
    // 每次输入框输入值时候都会触发
    handleInput(event) {
      // this.$emit("input", event.target.value); 
      var { value } = event.target;
      // this.value = value;
      // 触发父组件的input事件，返回输入框的值
      this.$emit("input", value);

      // 如果符合正则就位success，反之是error
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = "success";
        } else {
          this.status = "error";
        }
      }
    },

    // 输入框失去焦点时候触发
    handleChange() {
      if (this.err_message && this.status === "error") {
        // alert(this.err_message);
        this.$toast.fail(this.err_message);
      }
    }
  }
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
  height: 38/360 * 100vw;
  padding: 20px 0;
  box-sizing: border-box;
  background: #fff;
  border: none;
  border-bottom: 1px #666 solid;
  outline: none;
}

.success {
  border-bottom-color: blue;
}

.error {
  border-bottom-color: red;
}
</style>