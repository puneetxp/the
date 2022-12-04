import { useProductStore } from "/src/Store/Model/Product.js";
import ProductService from "/src/Service/Model/Product.js"
export default {
    template: `
<form class="navbar navbar-expand-lg navbar-light" ref="update" @submit.prevent="product_action"  style="background-color: #e3f2fd;">
    <input v-model="form.name"/>
    <button> {{form.id ? 'Update' : 'Submit'}}</button>
</form>
<div class="d-grid">
    <div class="d-flex my-2 justify-content-between" v-for="product in useProductStore().items">
        <div>
            {{ product.name }}
        </div>
        <div>
            <button class="btn btn-primary ms-1" @click="set_product(product,'update')">
                Edit
            </button>
            <button class="btn btn-danger ms-1" @click="ProductService.del(product.id)">
                Delete
            </button>
        </div>
    </div>
</div>
    `,
    setup() {
        ProductService.all()
    },
    data() {
        return {
            form: {
                name: '',
            },
            useProductStore,
            ProductService,
        }
    },
    methods: {
        set_product(product, refName) {
            this.form = product;
            let element = this.$refs[refName];
            let top = element.offsetTop;
            window.scrollTo(0, top);
        },
        product_action() {
            if (this.form.id) {
                this.ProductService.update(this.form);
            } else {
                this.ProductService.create(this.form);
            }
        },
    },
}

