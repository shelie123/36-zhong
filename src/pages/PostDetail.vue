<template>
  <div>
    <div class="top">
      <i class="iconfont iconjiantou2" @click="$router.back()"></i>
      <div class="iconfont iconnew logo"></div>
      <span class="focus guanzhu" v-if="!detail.has_follow" @click="handleFollow">关注</span>
      <span class="focus focus_active" v-else @click="handleUnFollow">已关注</span>
    </div>
    <div class="head-title">
      <h3>{{detail.title}}</h3>
      <div class="head-foot">
        <span>{{detail.user.nickname}}</span>
        <em>2019-9-28</em>
      </div>
    </div>

    <div class="content" v-html="detail.content"></div>
    <div class="footed">
      <div class="footed-left">
        <!-- 点赞 -->
        <span @click="handleLike" :class="{like_active:detail.has_like}">
          <i class="iconfont icondianzan"></i>
          {{detail.like_length}}
        </span>
      </div>
      <div class="footed-right">
        <i class="iconfont iconweixin"></i>微信
      </div>
    </div>

    <div class="footed">
      <PostFooter :post="detail" @handleStar="handleStar" />
    </div>
  </div>
</template>

<script>
// 引入底部模板
import PostFooter from "@/components/PostFooter";

export default {
  data() {
    return {
      // 文章的详情
      detail: {
        //   user需要在模板中渲染，不然页面会报错
        user: {}
      }
    };
  },
  // 注册组件
  components: {
    PostFooter
  },
  //   事件函数
  methods: {
    // 关注当前的作者
    handleFollow() {
      // 通过作者id关注用户
      this.$axios({
        url: "/user_follows/" + this.detail.user.id,
        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        var { message } = res.data;

        if (message === "关注成功") {
          // 修改关注的按钮的状态
          this.detail.has_follow = true;
          this.$toast.success(message);
        }
      });
    },
    // 取消关注
    handleUnFollow() {
      // 通过作者id取消关注用户
      this.$axios({
        url: "/user_unfollow/" + this.detail.user.id,
        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        var { message } = res.data;

        if (message === "取消关注成功") {
          // 修改关注的按钮的状态
          this.detail.has_follow = false;
          this.$toast.success(message);
        }
      });
    },
    // 点赞
    handleLike() {
      // 通过作者id点赞用户
      this.$axios({
        url: "/post_like/" + this.detail.id,
        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data);
        var { message } = res.data;

        if (message === "点赞成功") {
          // 修改关注的按钮状态
          this.detail.has_like = true;
          this.detail.like_length++;
        }
        if (message === "取消成功") {
          // 修改关注的按钮状态
          this.detail.has_like = false;
          this.detail.like_length--;
        }
        this.$toast.success(message);
      });
    },
    // 收藏
    handleStar() {
      // 通过作者id点赞用户
      this.$axios({
        url: "/post_star/" + this.detail.id,
        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data);
        var { message } = res.data;

        if (message === "收藏成功") {
          // 修改关注的按钮状态
          this.detail.has_like = true;
        }
        if (message === "取消成功") {
          // 修改关注的按钮状态
          this.detail.has_like = false;
        }
        this.$toast.success(message);
      });
    }
  },
  //   页面加载完成时触发事件
  mounted() {
    //   请求文章的详情
    var { id } = this.$route.params;

    // token
    var token = localStorage.getItem("token");

    // 请求配置
    var config = { url: "/post/" + id };

    // 如果有token的就带上，才可能获取到是否关注，是否收藏的属性
    if (token) {
      config.headers = {
        Authorization: token
      };
    }

    this.$axios(config).then(res => {
      console.log(res.data);
      var { data } = res.data;
      //   保存到详情
      this.detail = data;
    });
  }
};
</script>

<style scoped lang="less">
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  .logo {
    flex: 1;
    font-size: 50/360 * 100vw;
    padding-left: 10px;
  }
  .guanzhu {
    width: 40/360 * 100vw;
    text-align: center;
    font-size: 12px;
    border: 1px red solid;
    padding: 5px 12px;
    border-radius: 50px;
    color: #fff;
    background: red;
  }
  .focus_active {
    width: 40/360 * 100vw;
    font-size: 12px;
    text-align: center;
    border: 1px #666 solid;
    padding: 5px 12px;
    border-radius: 50px;
    color: #666;
  }
}
.head-title {
  font-size: 18px;
  padding: 10px 20px;

  .head-foot {
    padding-top: 10px;
    font-size: 14px;
    color: #666;

    span {
      padding-right: 15px;
    }
  }
}
.content {
  padding: 10px 20px;
  line-height: 1.8;
  font-size: 14px;

  //   img是有服务器返回的标签，不属于当前的页面，不受scope的影响
  /deep/img {
    max-width: 100%;
  }
}
.footed {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
  padding-bottom: 40px;
  .footed-left {
    border: 1px #999 solid;
    padding: 5px 13px;
    border-radius: 50px;
  }
  .footed-right {
    border: 1px #999 solid;
    padding: 5px 13px;
    border-radius: 50px;
    .iconweixin {
      color: #81d842;
      padding-right: 5px;
    }
  }
  .like_active {
    .icondianzan {
      color: red;
    }
  }
}
</style>