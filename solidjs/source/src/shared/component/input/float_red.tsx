import { Component } from "solid-js";

const InputFloatRed = (props: { type: string, label: string, name: string, required?: boolean, pattern?: string, title?: string, placeholder?: string }) => {
 return (
  <div class="relative z-0">
   <input {...Object.fromEntries(['required', 'pattern', 'title', 'placeholder'].map(k => [k, props[k]]))} type={props.type} name={props.name} id="floating_name" class="peer block w-full appearance-none border-0 border-b-2 border-red-700 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-red-700 focus:outline-none focus:ring-0" />
   <label for="floating_name" class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-red-700 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:border-red-700">{props.label}{props.required ? '*' : ''}</label>
  </div>
 );
}
export default InputFloatRed;