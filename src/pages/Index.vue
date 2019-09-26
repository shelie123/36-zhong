<template>
  <div class="box">
    <div class="top">
      <span class="iconfont iconnew logo"></span>
      <div class="top-center">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </div>
      <router-link to="/Personal">
        <span class="iconfont iconwode user"></span>
      </router-link>
    </div>
    <div class="head">
      <van-tabs v-model="active" sticky swipeable>
        <!-- title:要显示的内容 -->
        <van-tab v-for="(item,index) in categories" :key="index" :title="item.name">
          <PostCard v-for="(item,index) in posts" :key="index" :post="item" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 引用文章模块
import PostCard from "@/components/PostCard";

export default {
  data() {
    return {
      active: 1,
      //   当前默认的栏目，没有登录应该是0，登录为1，最终的效果为默认显示头条
      active: localStorage.getItem("token") ? 1 : 0,
      categories: [],

      //   默认的头条文章列表
      posts: [],

      //   栏目id
      cid: 999
    };
  },

  //   监听active变化获取栏目的id
  watch: {
    active() {
      this.cid = this.categories[this.active].id;

      console.log(this.cid);
    }
  },

  //   注册组件
  components: {
    PostCard
  },

  mounted() {
    var config = {
      url: "/category"
    };

    //   是否存在token，如果有就给头部加上token验证
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }

    //   请求栏目的数据
    this.$axios(config).then(res => {
      var { data } = res.data;

      // 保存栏目列表
      this.categories = data;
    });

    // 请求文章列表
    this.$axios({
      url: "/post?category=${this.cid}"
    }).then(res => {
      var { data } = res.data;

      // 默认赋值给头条的列表
      this.posts = data;
    });
  }
};
</script>

<style scoped lang="less">
.box {
//   position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #eee;
}
.top {
  //   position: fixed;
  width: 100%;
  display: flex;
  height: 42/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  //   padding: 10px;
  background: #ff0000;
  //   clear: both;

  .logo {
    font-size: 50px;
    padding: 10px;
    color: #fff;
  }

  .top-center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    box-sizing: border-box;
    background: #f97979;
    padding: 5px 10px;
    border-radius: 50px;

    i {
      padding-left: 10px;
    }
  }

  .user {
    font-size: 20px;
    padding: 10px;
    color: #fff;
  }
}
.head {
  /deep/.van-tabs__nav {
    background: #ddd;
  }

  //   /deep/.van-tabs__line{
  //       width:45px;
  //       height: 1px;
  //   }
}
</style>