import Vue from "vue"

// + 导入App.vue
import App from "@/App.vue";

import Login from "@/pages/Login";

import Register from "@/pages/Register";

import Personal from "@/pages/Personal";

import EditProfile from "@/pages/EditProfile";

import UserFollow from "@/pages/UserFollow";

import UserComment from "@/pages/UserComment";



// 前端页面
import Index from "@/pages/Index";

import PostDetail from "@/pages/PostDetail";

import PostComment from "@/pages/comment/Comment.vue";

import Search from "@/pages/Search";

// 导入vant-UI组件
import Vant from "vant";

import {
    Toast
} from "vant"

// 导入axios
import axios from "axios";

// 路由：1、导入路由构造函数
import VueRouter from "vue-router"

// 在.vue 文件中要使用router-link或者router-view，需要注册一下插件
Vue.use(VueRouter);

Vue.use(Vant);

// 把axios挂载到原型
// 基准路径，以后每次请求都会自动在前面加上该路径
Vue.prototype.$axios = axios; // this.$axios
axios.defaults.baseURL = "http://localhost:3000";

// 路由：2、创建路由配置
const routes = [{
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/personal",
        component: Personal
    },
    {
        path: "/edit_profile",
        component: EditProfile
    },
    {

        path: "/user_follow",
        component: UserFollow

    },
    {
        path: "/user_comment",
        component: UserComment
    },


    // 前端页面路由配置
    {
        path: "/",
        component: Index
    },
    {
        path: "/index",
        component: Index
    },
    {
        path: "/postdetail/:id",
        component: PostDetail
    }, {

        path: "/postcomment/:id",
        component: PostComment

    },
    {
        path: "/search",
        component: Search
    }
]

// 路由：3、创建对象
const router = new VueRouter({
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    // 是否有token
    const hasToken = localStorage.getItem("token");

    // 是否是个人中心 判断是否需要登录权限的页面
    if (to.path === '/personal' || to.path === "/edit_profile") {
        // 判断本地是否有token
        if (hasToken) {
            return next();
        } else {
            // 没有token则跳转到登录页
            return next("/login")
        }
    } else {
        // 所有人都可以访问到的页面正常浏览
        next();
    }

})

// axios的统一拦截器，拦截响应
//固定的声明
axios.interceptors.response.use(res => {
    var {
        message,
        statusCode
    } = res.data;
    if (message && statusCode === 401) {
        Toast.fail(message)
    }
    // token过期了，或者token无效，一般引起的原因可能token被清空，密码修改了
    if (message === "用户信息验证失败") {
        // 跳转到登录页
        router.push("/login");
    }
    // 必须要返回res
    return res;
}, function (err) {
    // 请求后台失败时候的错误
    return Toast.fail("网络错误")
})


// 创建根实例
new Vue({
    el: "#app",

    // - 删除该data
    // data: {
    //     message: "hello webpack and vue!"
    // }

    // 路由：4、挂载到根实例
    router,
    // 指定一个组件渲染根实例，这个组件可以成为最底层的组件
    render(createElement) {
        // render函数使用固定的写法，只有APP是可变
        return createElement(App)
    }
})