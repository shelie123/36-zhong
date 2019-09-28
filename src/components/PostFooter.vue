<template>
  <div>
    <!-- 普通页脚 -->
    <div class="footed" v-show="!isFocus">
      <div class="footed-left">
        <input type="text" placeholder="写跟帖" @focus="handleFocus" />
      </div>
      <div class="footed-right">
        <span class="comment">
          <em class="pinglun">1020</em>
          <i class="iconfont iconpinglun-"></i>
        </span>

        <i class="iconfont iconshoucang"></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
    </div>

    <!-- 输入评论页脚，这里显示隐藏必须要用v-show，原因是为了获得textarea的dom元素 -->
    <div class="footer" v-show="isFocus">
      <div class="footed-left">
        <textarea
          rows="3"
          placeholder="回复:"
          ref="textarea"
          @blur="isFocus=false"
          :autofocus="isFocus"
        ></textarea>
      </div>
      <div class="send">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 输入框是否获得焦点
      isFocus: false
    };
  },
  methods: {
    // 获得焦点的时候触发
    handleFocus() {
      this.isFocus = true;
    }
  }
};
</script>

<style scoped lang="less">
.footed {
  position: fixed;
  bottom: 0;
  left: 0;
  padding:10px 0;
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
      padding: 0 10px;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  padding:10px 0;
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