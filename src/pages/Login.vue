<template>
  <div class="box">
    <!-- 关闭按钮 -->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>

    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 用户名密码输入框 -->
    <div class="inputs">
      <!-- 输入框组件 -->
      <AuthInput
        placeholder="手机号码"
        :value="form.username"
        @input="handleUsername"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号码格式不正确"
      ></AuthInput>
    </div>
    <div>
      <AuthInput
        placeholder="密码"
        v-model="form.password"
        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="密码格式不正确"
        type="password"
      ></AuthInput>
    </div>
    <div class="button">
      <!-- 登录按钮 -->
      <!-- <button @click="handleSubmit">登录</button> -->
      <AuthButton text="登录" @click="handleSubmit"></AuthButton>
    </div>
  </div>
</template>

<script >
// 导入输入框组件
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

export default {
  data() {
    return {
      // 发送给后台的数据
      form: {
        username: "",
        password: ""
      }
    };
  },
  // 注册组件
  components: {
    AuthInput,
    AuthButton
  },
  methods: {
    // 传递给输入框组件，用于获取用户名
    handleUser(value) {
      this.form.username = value;
    },
    handleSubmit() {
      // console.log(this.from);
      axios({
        url
      });
    }
  }
};
</script>



<style scoped lang="less">
// scoped 作用域样式
// lang 声明样式

.box {
  box-sizing: border-box;
  padding: 0 30px;
}

.close {
  padding: 20px 0;

  span {
    font-size: 27/360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126/360 * 100vw;
    color: #d81e06;
  }
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
.button {
  margin-top: 30px;
}

/* 组件样式 */
</style>