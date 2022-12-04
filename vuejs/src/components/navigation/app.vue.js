import loginState from "/src/Store/Login.js"
import { logoutService } from "/src/Service/Login.js";
export default {
    template: `
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <router-link  class="navbar-brand"  to="/">Home</router-link>
            <button class="navbar-toggler bootstrap" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav" v-if="loginState.login ==false">
                    <li class="nav-item">
                        <router-link  class="nav-link" active-class="active" aria-current="page" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link  class="nav-link" active-class="active" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link  class="nav-link" active-class="active" to="/register">Pricing</router-link>
                    </li>
                </ul>            
                <ul class="navbar-nav" v-if="loginState.login != false">
                    <li class="nav-item">
                        <router-link  class="nav-link" active-class="active" to="/dashboard">Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link  class="nav-link" active-class="active" to="/product">Product</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link  class="nav-link" active-class="active" to="/admin/product">Admin Product</router-link>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-secondary" @click="logoutService()">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
`,
    data() {
        return {
            loginState,
            logoutService,
        }
    }
}