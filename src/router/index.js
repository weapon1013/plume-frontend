import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/PageHome.vue'


const routes = [
    {
        path: '/',       // 스프링으로 치면 킨트롤러부분같은 느낌이다.
        name: 'PageHome',  
        component: PageHome
    },
    {
        path: '/feed',
        name: 'Feed',
        component: () => import(/* webpackChunkName: "about" */ '../views/PageFeed.vue')
    },
    {
        path: '/recommend',       // 스프링으로 치면 킨트롤러부분같은 느낌이다.
        name: 'PageRecommend',  
        component: () => import(/* webpackChunkName: "about" */ '../views/PageRecommend.vue')
    },
    {
        path: '/rank',       // 스프링으로 치면 킨트롤러부분같은 느낌이다.
        name: 'PageRank',  
        component: () => import(/* webpackChunkName: "about" */ '../views/PageRank.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router