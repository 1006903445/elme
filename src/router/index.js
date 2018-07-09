import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import home from '@/components/home/home'
import goods from '@/components/home/content/goods/goods'
import ratings from '@/components/home/content/ratings/ratings'
import seller from '@/components/home/content/seller/seller'
import admin from '@/components/admin/admin'

import config from '../lib/config/config'

Vue.use(Router)
Vue.use(config);

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	config.url = 'http://localhost:8080' + config.url;
	return config;
}, function (err) {
	return Promise.reject(err);
});
// 添加响应拦截器
axios.interceptors.response.use(function (res) {
	if(res.status == 200){
		return res.data;
	}else{
		return {
			errno: res.status,
          	data: [],
          	msg: res.statusText
		};
	}
}, function (err) {
	return Promise.reject(err);
});
Vue.prototype.Axios = axios;

export default new Router({
	linkActiveClass: 'z-active',
	routes: [
		{
			path: '/',
			component: home,
			children: [
				{
					path: '/',
					redirect: '/goods',
					component: goods
				},
                {
                	path: 'goods',
                	component: goods
                },
                {
                	path: 'ratings',
                	component: ratings
                },
                {
                	path: 'seller',
                	component: seller
                },
			]
		},
		{
			path: '/admin',
			component: admin
		}
	]
})
