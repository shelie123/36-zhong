<template>
  <div class="box">
    <!-- 头部 -->
    <HeaderNormal title="编辑资料" />

    <div class="image">
      <img :src="profile.head_img" alt />
    </div>

    <div>
      <CellBar label="昵称" :text="profile.nickname" />
      <CellBar label="密码" :text="profile.password" type="password" />
      <CellBar label="性别" :text="profile.gender===1?'男':'女'" />
    </div>
  </div>
</template>

<script>
// 引入头部
import HeaderNormal from "@/components/HeaderNormal";
// 引入条形组件
import CellBar from "@/components/CellBar";

export default {
  data() {
    return {
      // 用户详情
      profile: {}
    };
  },
  // 注册组件
  components: {
    HeaderNormal,
    CellBar
  },
  //   页面加载完触发
  mounted() {
    // 请求个人资料的接口
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      //   添加头部信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      var { data } = res.data;
      if (data) {
        // 保存到data
        this.profile = data;

        // 如果用户有头像
        if (data.head_img) {
          this.profile.head_img = this.$axios.defaults.baseURL + data.head_img;
        } else {
          this.profile.head_img = "./static/touxiang.png";
        }
      }
    });
  }
};
</script>

<style scoped lang="less">
.box {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #eee;

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    img {
      display: block;
      width: 100/360 * 100vw;
      height: 100/360 * 100vw;
      border-radius: 50%;
    }
  }
}
</style>