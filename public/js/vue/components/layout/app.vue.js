
import Navigation from "/js/vue/components/navigation/app.vue.js";
export default {
    components: { Navigation },
    template: `
<div id="app">
    <div class="text-center">
        <navigation></navigation>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</div>
    `
}