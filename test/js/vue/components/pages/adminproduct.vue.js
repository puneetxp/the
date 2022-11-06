
// export default {
//     template: `
//     <form class="navbar navbar-expand-lg navbar-light" ref="update" @submit.prevent="product_action"  style="background-color: #e3f2fd;">
//         <input v-model="form.name"/>
//         <button> {{form.id ? 'Update' : 'Submit'}}</button>
//     </form>
//     <div class="d-grid">
//         <div class="d-flex my-2 justify-content-between" v-for="product in products">
//             <div>
//                 {{ product.name }}
//             </div>
//             <div>
//                 <button class="btn btn-primary ms-1" @click="set_product(product,'update')">
//                     Edit
//                 </button>
//                 <button class="btn btn-danger ms-1" @click="del_product(product.id)">
//                     Delete
//                 </button>
//             </div>
//         </div>
//     </div>
//     `,
//     data() {
//         return {
//             form: {
//                 name: '',
//             },
//             products: []
//         }
//     },
//     computed: {
//         allproduct() {
//             fetch('/api/product').then(
//                 (response) => response.json()
//             ).then((i) => { this.products = i });
//         },
//     },
//     created() {
//         this.allproduct;
//     },
//     methods: {
//         set_product(product, refName) {
//             this.form = product;
//             let element = this.$refs[refName];
//             let top = element.offsetTop;
//             window.scrollTo(0, top);
//         },
//         product_action() {
//             if (this.form.id) {
//                 this.update();
//             } else {
//                 this.create();
//             }
//         },
//         create() {
//             fetch('/api/product', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(this.form)
//             }).then(
//                 (response) => response.json()
//             ).then((i) => { this.products.push(i) })
//         },
//         update() {
//             fetch('/api/product/' + this.form.id, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(this.form)
//             }).then(
//                 (response) => response.json()
//             ).then((i) => { this.products = this.products.filter(p => p.id != i.id); this.products.push(i) })
//         },
//         del_product(id) {
//             fetch('/api/product/' + id, {
//                 method: 'DELETE',
//                 headers: { 'Content-Type': 'application/json' }
//             }).then(
//                 (response) => response.json()
//             ).then((i) => { this.products = this.products.filter(p => p.id != id); })
//         }
//     },
// }