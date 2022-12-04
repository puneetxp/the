import { loginService } from "/src/Service/Login.js";
import loginState from "/src/Store/Login.js"
import { FormFetch } from "/src/the.js";
export default {
  template: `
<div class="my-5 d-flex justify-content-center align-items-center">
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="border border-3 border-primary"></div>
        <div class="card bg-white shadow-lg">
          <div class="card-body p-5">
            <form class="mb-3 mt-md-4"  action="/api/login" method="POST" @submit.prevent="login()">
              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class=" mb-5">Please enter your login and password!</p>
              <div class="mb-3">
                <label for="email" class="form-label ">Email address</label>
                <input name="email" type="email" class="form-control" id="email" placeholder="name@example.com">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label ">Password</label>
                <input name="password" type="password" class="form-control" id="password" placeholder="*******">
              </div>
              <p class="small"><a class="text-primary" href="forget-password.html">Forgot password?</a></p>
              <div class="d-grid">
                <button class="btn btn-outline-dark" type="submit">Login</button>
              </div>
            </form>
            <div>
              <p class="mb-0  text-center">Don't have an account? 
                <router-link to="register" class="text-primary fw-bold">
                  Sign Up
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
      email: '',
      password: '',
      loginService,
      loginState,
      FormFetch
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
      FormFetch(event).then((response) => response.json()).then(i => {
        loginState.update(i);
        this.$router.push("/");
      }).catch(i => {
        loginState.update(false);
      })
    }
  }
}