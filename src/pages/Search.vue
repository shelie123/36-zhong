<template>
  <div>
    <div class="head">
      <div>
        <i class="iconfont iconjiantou2" @click="$router.back()"></i>
      </div>
      <div class="head-search">
        <span class="iconfont iconsearch"></span>
        <input type="text" placeholder="请输入你要搜索的内容" v-model="keyword" />
      </div>
      <div class="search-btn" @click="handleSearch">搜索</div>
    </div>
    <div class="list">
      <!-- 调用首页用过的文章模块的组件 -->
      <PostCard v-for="(item,index) in list" :key="index" :post="item" />
    </div>
  </div>
</template>

<script>
// 调用文章模板
import PostCard from "@/components/PostCard";

export default {
  name: "search", //可以命名为任意字符串
  data() {
    return {
      // 搜索的关键字
      keyword: "",

      // 文章的列表
      list: []
    };
  },
  //   注册组件
  components: {
    PostCard
  },

  //   事件函数
  methods: {
    //   处理搜索
    handleSearch() {
      this.$axios({
        url: `/post_search?keyword=${this.keyword}`
      }).then(res => {
        console.log(res.data);
        var { data } = res.data;

        // 赋值给list
        this.list = data;

        console.log(this.list);
      });
    }
  },
  // 组件内的路由守卫，判断如果是首页进入到搜索页的，清空页面的缓存数据
  beforeRouteEnter(to, from, next) {
    console.log(from);
    // 在渲染该组件的对应路由被 confirm 前调用,不！能！获取组件实例 `this`, 因为当守卫执行前，组件实例还没被创建

    //  如果from.path的值等于斜杠,最好转译一下\
    if (from.path === "/") {
      next(vm => {
        // 通过 `vm` 访问组件实例,vm 其实就是this
        vm.keyword = "";
        vm.list = [];
      });
    }
    next();
  }
};
</script>

<style scoped lang="less">
.head {
  display: flex;
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;

  .head-search {
    flex: 1;
    box-sizing: border-box;
    padding: 0 20px;
    position: relative;

    .iconsearch {
      position: absolute;
      top: 28%;
      left: 10%;
    }

    input {
      width: 100%;
      padding: 5px 0;
      border-radius: 50px;
      border: 1px #999 solid;
      font-size: 14px;
      text-indent: 2em;
    }
  }
}
</style>