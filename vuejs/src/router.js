
import { createRouter, createWebHistory } from "/cdn/js/vue-router.js";
import { auth, notauth } from "/src/guard/auth.js";
const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/logout',
        component: () => import("/src/components/pages/logout.vue.js"),
        beforeEnter: [notauth],
    }, {
        path: '/',
        component: () => import("/src/components/layout/app.vue.js"),
        children: [{
            path: '',
            component: () => import("/src/components/pages/home.vue.js"),
            name: "Home",
        }, {
            path: '/login',
            component: () => import("/src/components/pages/login.vue.js"),
            beforeEnter: [notauth],
        }, {
            path: '/register',
            component: () => import("/src/components/pages/register.vue.js"),
            beforeEnter: [notauth],
        }, {
            path: '',
            children: [
                {
                    path: 'product/',
                    component: () => import("/src/components/pages/product.vue.js"),
                    name: "Product"
                }]
        }, {
            path: '/dashboard/',
            component: () => import("/src/components/pages/dashboard.vue.js"),
            beforeEnter: [auth],
        }, {
            path: '/admin/',
            beforeEnter: [auth],
            children: [{
                path: 'product',
                component: () => import("/src/components/pages/_adminproduct.vue.js"),
            }]
        }
        ],
    }],
});
export default router;