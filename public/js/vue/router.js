
import { createRouter, createWebHistory } from "/js/vue/vue-router.js";
import { auth, notauth } from "/js/vue/guard/auth.js";
const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/login',
        component: () => import("/js/vue/components/pages/login.vue.js"),
        beforeEnter: [notauth],
    }, {
        path: '/register',
        component: () => import("/js/vue/components/pages/register.vue.js"),
        beforeEnter: [notauth],
    }, {
        path: '/logout',
        component: () => import("/js/vue/components/pages/logout.vue.js"),
        beforeEnter: [notauth],
    }, {
        path: '/',
        component: () => import("/js/vue/components/layout/app.vue.js"),
        children: [{
            path: '',
            component: () => import("/js/vue/components/pages/home.vue.js"),
            name: "Home",
        }, {
            path: '',
            children: [
                {
                    path: 'product/',
                    component: () => import("/js/vue/components/pages/product.vue.js"),
                    name: "Product"
                }]
        }, {
            path:'/dashboard/',
            component: () => import("/js/vue/components/pages/dashboard.vue.js"),
            beforeEnter: [auth],
        },{
            path: '/admin/',
            beforeEnter: [auth],
            children: [{
                path: 'product',
                component: () => import("/js/vue/components/pages/_adminproduct.vue.js"),
            }]
        }
        ],
    }],
});
export default router;