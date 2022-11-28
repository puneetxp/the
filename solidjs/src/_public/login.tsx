
import { Component } from "solid-js";
import { A, Navigate } from "../router/src";
import InputFloatRed from "../shared/component/input/float_red";
import { FormFetch } from "../shared/functions/form";
import { Login } from "../shared/interface/Login";
import { LoginService } from "../shared/Service/Login";
const LoginPage: Component = () => {
  const LoginForm = (event: Event) => {
    FormFetch(event).then(response => response.json()).
      then((i: Login) => {
        LoginService.set(i);
      });
  }
  return (
    <div class="m-auto w-full sm:w-auto">
      <div class="max-w-xl mx-auto py-10 sm:p-10 w-full sm:w-auto bg-red-500/20 my-10 rounded-md ">
        <h2 class="text-4xl mb-5 text-slate-800 text-center font-bold">
          Login
        </h2>
        <div class="m-4 w-full px-2 xs:w-72 sm:w-96 mx-auto rounded-md grid grid-cols-1">
          <form action="/api/login" method="post" onSubmit={LoginForm} class="flex gap-4 flex-col">
            <InputFloatRed type={"email"} label={"Email"} name={"email"} required={true} placeholder={''} />
            <InputFloatRed type={"password"} label={"Password"} name={"password"} placeholder={''} pattern={"(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}"} title={"Minimum 6 Charcters with AlphaNumaric with Upper and Lower Case"} required={true} />
            <div class="flex justify-center content-center mt-5">
              <button class="mx-auto w-96 bg-orange-800 hover:bg-red-800 text-xl font-semibold text-white p-2 rounded-lg">
                Login
              </button>
            </div>
            <div class="flex justify-center content-center mt-5">
              <A href="/register" class="text-center mx-auto w-96 bg-orange-800 hover:bg-red-800 text-xl font-semibold text-white p-2 rounded-lg">
                Register
              </A>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default LoginPage;