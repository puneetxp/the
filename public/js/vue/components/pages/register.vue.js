import { registerService } from "/js/vue/Service/Login.js";
import loginState from "/js/vue/Store/Login.js"
export default {
  template: `  
<div class="my-5 d-flex justify-content-center align-items-center">
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="border border-3 border-primary"></div>
        <div class="card bg-white shadow-lg">
          <div class="card-body p-5">
            <form class="mb-3 mt-md-4" @submit.prevent="registerService(name,email,password)">
              <h2 class="fw-bold mb-2 text-uppercase ">Register</h2>
              <p class=" mb-5">Please enter your Name, login and password!</p>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="name" type="name" class="form-control" id="name" placeholder="Tillakaratne Dilshan">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label ">Email address</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label ">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="*******">
              </div>
              <p class="small"><a class="text-primary" href="forget-password.html">Forgot password?</a></p>
              <div class="d-grid">
                <button class="btn btn-outline-dark" type="submit">Login</button>
              </div>
            </form>
            <div>
              <p class="mb-0  text-center">Don't have an account? 
                <router-link to="login" class="text-primary fw-bold">
                  Login
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  data() {
    return {
      name: '',
      email: '',
      password: '',
      registerService,
      loginState
    }
  },
  computed: {
    loggedIn() {
      return this.loginState.login;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      fetch('/api/register', {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password
        })
      }).then((response) => response.json()).then(i => {
        loginState.login = i;
        this.$router.push("/");
      }).catch(i => {
        loginState.login = false;
      })
    }
  }
}