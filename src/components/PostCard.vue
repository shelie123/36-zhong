<template>
  <div class="box">
    <!-- 单张图显示的布局 -->

    <div class="content" v-if="post.cover.length>0 && post.cover.length<3 && post.type === 1">
      <div class="content-left">
        <router-link :to="`/postdetail/${post.id}`">
          <div class="title">{{post.title}}</div>
        </router-link>
        <p>
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </p>
      </div>
      <router-link :to="`/postdetail/${post.id}`">
        <img :src="post.cover[0].url" alt />
      </router-link>
    </div>

    <!-- 多张图显示的布局 -->
    <div class="img-cart" v-if="post.cover.length>=3">
      <div class="post-title">
        <router-link :to="`/postdetail/${post.id}`">{{post.title}}</router-link>
      </div>
      <router-link :to="`/postdetail/${post.id}`">
        <div class="img-list">
          <img v-for="(item, index) in post.cover" :key="index" :src="item.url" v-if="index < 3" />
        </div>
      </router-link>
      <p class="post-info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>

    <!-- 视频显示的布局 -->
    <div class="video-cart" v-if="post.type === 2 && post.cover.length === 1">
      <div class="post-title">
        <router-link :to="`/postdetail/${post.id}`">{{post.title}}</router-link>
      </div>
      <router-link :to="`/postdetail/${post.id}`">
        <div class="video">
          <img :src="post.cover[0].url" />
          <span class="video-layer">
            <i class="iconfont iconshipin"></i>
          </span>
        </div>
      </router-link>
      <p class="post-info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],

  mounted() {
    // 判断封面图片是否包含http
    this.post.cover.forEach(v => {
      if (v.url.indexOf("http") === -1) {
        v.url = this.$axios.defaults.baseURL + v.url;
      }
    });
  }
};
</script>

<style scoped lang="less">
.box {
  box-sizing: border-box;

  // 单图片显示布局
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 1px #ddd solid;

    .content-left {
      flex: 1;
      height: 1.8;
      padding-right: 10px;
      height: 75/360 * 100vw;

      .title {
        margin-bottom: 15px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      p {
        color: #666;
        font-size: 14px;
      }
    }

    img {
      display: block;
      width: 121/360 * 100vw;
      height: 75/360 * 100vw;
      object-fit: cover;
    }
  }
  // 多图片显示布局
  .img-cart {
    padding: 20px 10px;

    .post-title {
      padding-bottom: 5px;
      line-height: 1.8;
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .img-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 5px;

      img {
        display: block;
        width: 32.5%;
        height: 80/360 * 100vw;
        object-fit: cover;
      }
    }
    .post-info {
      font-size: 12px;
      color: #666;
    }
  }
  // 视频显示布局
  .video-cart {
    padding: 15px 10px;
    border-bottom: 1px #ccc solid;

    .post-title {
      font-size: 15px;
      line-height: 1.8;
      margin-bottom: 5px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .video {
      position: relative;
      margin-bottom: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        width: 100%;
        // height: 170/360 * 100vw;
      }
      .video-layer {
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        width: 46/360 * 100vw;
        height: 46/360 * 100vw;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        i {
          color: #fff;
          font-size: 30px;
        }
      }
    }
    .post-info {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>