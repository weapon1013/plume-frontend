import { createRouter, createWebHistory } from 'vue-router'

import PageHome         from '@/views/PageHome.vue'
import PageFeed         from '@/views/PageFeed.vue'
import PageRecommend    from '@/views/PageRecommend.vue'
import PageRank         from '@/views/PageRank.vue'

const routes = [
    { path: '/'     , name: 'PageHome'     , component: PageHome        },
    { path: '/feed' , name: 'Feed'         , component: PageFeed        },
    { path: '/recm' , name: 'PageRecommend', component: PageRecommend   },
    { path: '/rank' , name: 'PageRank'     , component: PageRank        },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL, '/plume/'),
    routes
});

export default router;