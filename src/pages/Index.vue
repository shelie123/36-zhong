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
          <!-- v-model:列表是否在加载 -->
          <!-- finished：是否加载完毕 -->
          <!-- load:到底部触发的事件 -->
          <!-- immediate-check 禁止list立即出发onload -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <!-- 文章模块组件，post是单篇文章详情 -->
            <PostCard v-for="(item,index) in item.posts" :key="index" :post="item" />
          </van-list>
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
      cid: 999,

      // 是否在加载，加载完毕后需要手动变为false
      loading: false,

      // 是否有更多数据，如果加载完所有的数据,改为true
      finished: false,

      // 分页的变量
      pageIndex: 1,

      // 每页加载条数这个值不用去修改
      pageSize: 5
    };
  },

  //   监听active变化获取栏目的id
  watch: {
    active() {
      this.cid = this.categories[this.active].id;

      // console.log(this.cid);

      // 切换栏目时候加载当前栏目的数据
      this.onLoad();
    }
  },

  //   注册组件
  components: {
    PostCard
  },

  // 事件函数
  methods: {
    // 加载下一页的数据
    onLoad() {
      setTimeout(() => {
        console.log("已经滚动到底部");

        // this.loading = false;
        // this.finished = true;

        var category = this.categories[this.active];
        console.log(category);

        // 请求文章列表
        this.$axios({
          url: `/post?category=${this.cid}&pageIndex=${category.pageIndex}&pageSize=${this.pageSize}`
        }).then(res => {
          var { data } = res.data;

          // 没有更多的数据了
          if (data.length < this.pageSize) {
            category.finished = true;
          }

          // 默认赋值给头条的列表
          category.posts = [...category.posts, ...data];

          // 页数加一
          category.pageIndex++;

          // 告诉onLoad事件这次的数据加载已经完毕，下次可以继续的触发onLoad
          category.loading = false;
        });
      }, 300);
    }
  },

  // 页面加载完之后触发
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

      var newData = [];

      // 循环给栏目中每一项都添加四个独立的属性
      data.forEach(v => {
        v.posts = [];
        v.loading = false;
        v.finished = false;
        v.pageIndex = 1;
        newData.push(v);
      });

      // 保存栏目列表
      this.categories = newData;

      console.log(this.categories);
    });

    // 请求文章列表
    // 必须要先等待栏目请求完毕，再请求文章列表
    this.$axios({
      url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
    }).then(res => {
      var { data } = res.data;

      // 默认赋值给头条的列表
      // this.posts = data;
      this.categories[this.active].posts = data;

      // 页面加一
      // this.pageIndex++;
      this.categories[this.active].pageIndex++;
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