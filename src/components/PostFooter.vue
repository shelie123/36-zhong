<template>
  <div>
    <!-- 普通页脚 -->
    <div class="footed" v-show="!isFocus">
      <div class="footed-left">
        <input type="text" placeholder="写跟帖" @focus="handleFocus" />
      </div>
      <div class="footed-right">
        <!-- 用事件的方式跳转并且带上参数 -->
        <span class="comment" @click="$router.push(`/postcomment/${post.id}`)">
          <em class="pinglun">{{post.comment_length}}</em>
          <i class="iconfont iconpinglun-"></i>
        </span>
        <!-- 收藏 -->
        <i
          class="iconfont iconshoucang"
          :class="{star_active: post.has_star}"
          @click="$emit('handleStar')"
        ></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
    </div>

    <!-- 输入评论页脚，这里显示隐藏必须要用v-show，原因是为了获得textarea的dom元素 -->
    <div class="footer" v-show="isFocus">
      <div class="footed-left">
        <textarea
          rows="3"
          :placeholder="placeholder"
          v-model="value"
          ref="textarea"
          @blur="handleBlur"
          :autofocus="isFocus"
        ></textarea>
      </div>
      <div class="send" @click="handleSubmit">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 输入框是否获得焦点
      isFocus: false,

      // 评论的内容
      value: "",

      // 输入框的提示文字
      placeholder: "写跟帖"
    };
  },
  // 接收文章的详情
  // replyComment 要回复的评论
  props: ["post", "replyComment"],

  // 监听事件
  watch: {
    replyComment() {
      // 评论回复有值的时候才显示@的用户名
      if (this.replyComment) {
        this.isFocus = true;
        this.placeholder = "@" + this.replyComment.user.nickname;
      }
    }
  },
  methods: {
    // 获得焦点的时候触发
    handleFocus() {
      this.isFocus = true;
    },

    // 输入框失去焦点时候触发
    handleBlur() {
      if (!this.value) {
        this.isFocus = false;

        // 如果有回复的评论，清空回复的评论
        if (this.replyComment) {
          this.$emit("handleReply", null);
          this.placeholder = "写跟帖";
        }
      }
    },

    // 发布评论
    handleSubmit() {
      if (!this.value) {
        return;
      }
      // 评论的参数
      var data = {
        content: this.value
      };

      // 如果有回复的评论，加上parent_id
      if (this.replyComment) {
        data.parent_id = this.replyComment.id;
      }

      this.$axios({
        url: "/post_comment/" + this.post.id,
        method: "POST",
        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data
      }).then(res => {
        var { message } = res.data;

        if (message === "评论发布成功") {
          // 触发父组件方法更新评论的列表
          this.$emit("getComments", this.post.id, "isReply");

          // 隐藏输入框
          this.isFocus = false;

          // 清空输入框的值
          this.value = "";

          // 滚动到底部
          window.scrollTo(0, 0);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.footed {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;

  .footed-left {
    flex: 3;
    display: flex;
    justify-content: left;
    padding-right: 10px;
    padding-left: 10px;

    input {
      padding: 5px;
      text-indent: 1em;
      border-radius: 50px;
      border: none;
      background: #ddd;
      // font-size:14px;
    }
  }
  .footed-right {
    flex: 2;
    padding-right: 10px;

    .comment {
      position: relative;
      .pinglun {
        position: absolute;
        font-size: 10px;
        top: -14px;
        left: 10px;
        background: red;
        color: #fff;
        padding: 2px 4px;
        border-radius: 50px;
      }
    }
    i {
      font-size: 24px;
      padding: 0 8px;
    }
    .star_active {
      color: red;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .footed-left {
    padding-right: 20px;
    textarea {
      width: 240/360 * 100vw;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 5px 10px;
    }
  }
  .send {
    color: #fff;
    margin-right: 10px;
    padding: 5px 20px;
    border-radius: 50px;
    background: red;
  }
}
</style>