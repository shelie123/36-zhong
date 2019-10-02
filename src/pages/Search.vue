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