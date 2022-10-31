import { useProductStore } from "/js/vue/Store/Model/Product.js";
import ProductService from "/js/vue/Service/Model/Product.js"
export default {
    template: `
    <div v-for="product in useProductStore().items" @click="form = product">
        {{ product.name }}
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
            products: [],
            useProductStore
        }
    },
    methods: {

    },
}

