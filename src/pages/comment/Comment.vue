<template>
  <div class="box">
    <div class="head">
      <HeaderNormal title="我的跟帖" />
    </div>
    <!-- 评论模块 -->
    <!-- v-model：是否在加载
    finished：是否加载完毕
    load：到底部触发加载-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="content" v-for="(item,index) in comments" :key="index">
        <div class="comment">
          <div class="image">
            <img :src="$axios.defaults.baseURL+item.user.head_img" v-if="item.user.head_img" alt />
            <img src="../../../static/touxiang.png" v-else alt />
          </div>
          <div class="comment-center">
            <span>{{item.user.nickname}}</span>
            <i>2小时前</i>
          </div>
          <div class="reply" @click="handleReply(item)">回复</div>
        </div>
        <!-- 渲染评论楼层的组件 -->
        <CommentFloor v-if="item.parent" :data="item.parent" @handleReply="handleReply" />
        <div class="content-bottom">{{item.content}}</div>
      </div>
    </van-list>
    <!-- 页脚组件 -->
    <!-- post文章的详情，
    replyComment：要回复的评论
    getComments：发布评论成功后重新请求评论的列表-->
    <PostFooter
      :post="detail"
      :replyComment="replyComment"
      @handleReply="handleReply"
      @getComments="getComments"
    />
  </div>
</template>

<script>
import config from "./comment.js";

export default config;
</script>

<style scoped lang="less">
@import url("./comment.less");
</style>