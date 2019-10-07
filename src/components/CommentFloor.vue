<template>
  <div>
    <!-- 自己再次在这个位置调用了自己 -->
    <comment v-if="data.parent" :data="data.parent" @handleReply="handleReply"></comment>
    <!-- 评论楼层 -->
    <div class="addition">
      <div class="remark">
        <span>{{data.user.nickname}}</span>
        <i>2小时前</i>
        <em @click="handleReply">回复</em>
      </div>
      <div class="addition-bottom">{{data.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件的名字，单纯的针对当前的组件命名，当前的组件可以通过改名字自己调用自己
  name: "comment",
  props: ["data"],

  //   事件函数
  methods: {
    handleReply() {
      this.$emit("handleReply", this.data);
      //   console.log(this.data);
    }
  }
};
</script>

<style scoped lang="less">
.addition {
  box-sizing: border-box;
  padding: 10px 10px;
  margin: 0 10px;
  border: 1px #eee solid;

  .remark {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    i {
      display: block;
      flex: 1;
      padding-left: 15px;
      color: #999;
      font-size: 12px;
    }

    em {
      color: #999;
    }
  }

  .addition-bottom {
    padding: 10px 10px;
  }
}
.addition:not(:first-child) {
  border-top: none;
}
</style>