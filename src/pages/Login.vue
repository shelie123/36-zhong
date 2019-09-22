<template>
  <div>
    <!-- 关闭按钮 -->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>

    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 用户名密码输入框 -->
    <div>
      <AuthInput placeholder="手机号码" v-model="form.username"></AuthInput>
    </div>
    <div>
      <input type="password" placeholder="请输入密码" />
    </div>

    <!-- 登录按钮 -->
    <button>登录</button>
  </div>
</template>

<script >
// 导入输入框组件
import AuthInput from "@/components/authInput";

export default {
  data() {
    return {
      // 发送给后台的数据
      form: {
        username: "",
        password: "",
      }
    };
  },
  components: {
    AuthInput
  },
  methods:{
    handle
  }
};
</script>



<style scoped lang="less">
// scoped 作用域样式
// lang 声明样式

.close {
  padding: 20px;

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

/* 组件样式 */
</style>