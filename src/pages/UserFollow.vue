<template>
  <div class="box">
    <HeaderNormal title="我的关注" />

    <!-- 关注用户的列表 -->
    <!-- :key="index" 为给for每一个循环的元素打上一个标识，方便页面的数据刷新 -->
    <div class="follow-item" v-for="(item,index) in list" :key="index">
      <img :src="$axios.defaults.baseURL+item.head_img" alt />

      <div class="item-center">
        <p>{{item.nickname}}</p>
        <span>2019-9-25</span>
      </div>
      <span class="cancel" @click="handleCancel(index)">取消关注</span>
    </div>
  </div>
</template>

<script>
// 引入头部
import HeaderNormal from "@/components/HeaderNormal";

export default {
  data() {
    return {
      // 关注列表
      list: []
    };
  },
  components: {
    HeaderNormal
  },
  mounted() {
    // 请求用户关注的列表
    this.$axios({
      url: "/user_follows",
      // 添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      var { data } = res.data;

      // 赋值给关注的列表
      this.list = data;
    });
  },
  methods: {
    // 取消关注
    handleCancel(index) {
      // 要取消关注的用户id
      var id = this.list[index].id;

      this.$axios({
        url: "/user_unfollow/" + id,

        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        var { message } = res.data;

        if (message === "取消关注成功") {
          // 从列表中删除
          this.list.splice(index, 1);

          this.$toast.success(message);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.box {
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #eee;
}
.follow-item {
  padding: 20px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #ccc solid;

  img {
    display: block;
    width: 60/360 * 100vw;
    height: 60/360 * 100vw;
    border-radius: 50%;
  }
  .item-center {
    flex: 1;
    justify-content: left;
    padding-left: 20px;
    p {
      font-size: 14px;
    }
    span {
      font-size: 12px;
    }
  }
  .cancel {
    display: block;
    margin-right: 20px;
    padding: 5px 15px;
    background: #ddd;
    border-radius: 50px;
    font-size: 12px;
  }
}
</style>