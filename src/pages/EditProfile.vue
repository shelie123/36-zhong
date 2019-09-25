<template>
  <div class="box">
    <!-- 头部 -->
    <HeaderNormal title="编辑资料" />

    <div class="image">
      <img :src="profile.head_img" alt />

      <!-- vant上传组件 -->
      <van-uploader :after-read="afterRead" class="uploader" />
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
  //   事件函数
  methods: {
    // 选择图片之后的回调函数，file返回选中的图片
    afterRead(file) {
      // 构造表单数据
      var formData = new FormData();

      // 通过表单使用append方法追加数据
      formData.append("file", file.file);

      this.$axios({
        url: "/upload",
        method: "POST",

        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        },
        // 把表单数据上传到服务器
        data: formData
      }).then(res => {
        var { data } = res.data;

        // 替换用户资料的头像
        this.profile.head_img = this.$axios.defaults.baseURL + data.url;

        // 把头像url上传到用户资料
        this.$axios({
          url: "/user_update/" + localStorage.getItem("user_id"),
          method: "POST",

          // 添加头信息
          headers: {
            Authorization: localStorage.getItem("token")
          },

          data: {
            head_img: data.url
          }
        }).then(res => {
          var { message } = res.data;

          // 成功的弹窗提示
          if (message === "修改成功") {
            this.$toast.success(message);
          }
        });
      });
    }
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
    position: relative;
    img {
      display: block;
      width: 100/360 * 100vw;
      height: 100/360 * 100vw;
      border-radius: 50%;
    }
    .uploader {
      position: absolute;
      opacity: 0;
    }

    // 如果要修改第三方组件库的样式时候，需要再前面加上/deep/,因为组件库的样式不受scoped的影响
    /deep/ .van-uploader__upload {
      width: 100/360 * 100vw;
      height: 100/360 * 100vw;
    }
  }
}
</style>