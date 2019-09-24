import Vue from "vue"

// + 导入App.vue
import App from "@/App.vue"

import Login from "@/pages/Login"

import Register from "@/pages/Register";


// 导入vant-UI组件
import Vant, {
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
axios.defaults.baseURL = "http://127.0.0.1:3000";

// 路由：2、创建路由配置
const routes = [{
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    }, {
        path: "/",
        component: Login
    }
]

// 路由：3、创建对象
const router = new VueRouter({
    routes
})

// axios的统一拦截器，拦截响应
axios.interceptors.response.use(res => {
    var {
        message,
        statusCode
    } = res.data;
    if (statusCode === 401) {
        Toast.fail(message)
    }
    // 必须要返回res
    return res;
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
    render(createElement) {
        return createElement(App)
    }
})