import axios from "axios";
import { serverApi } from "../../lib/ config";
import { Product, ProductInquiry } from "../../lib/types/product";
// backentdan datani olish un hizmat qiladigon service file
class ProductService {
    private readonly path: string;

    constructor() {
        this.path = serverApi; //  urlni qiymatini pathga tenglaymz
    }
   
    public async getProducts(input: ProductInquiry): Promise<Product[]> {   // multy usij methoti
        try {               // axiosda ishlatish un urlni yozdik, o'zgaruvchilarni pathdan olamz uni letga tengladik
            let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
            if(input.productCollection)     // agar inputdan colleshn kelsa urlga qo'shib bersin
                url += `&productCollection=${input.productCollection}`;
            if(input.search) url += `&search=${input.search}`;

            // backentdan yuborlgan datani axiosni ichidan resultni data qismidan qabul qilamz
            const result = await axios.get(url);    // await bn axiosni ishlatib get methoti ichiga urlni pass qilamz
            console.log("getProducts:", result);    // backentdan nima kelayotganini check qilamz

            return result.data;     //resultni ichidagi data bo'limidagi qiymatni qaytarsin u esa array
        }catch(err) {
            console.log("Error, getProducts:", err); // browserni console da ko'rsh un
            throw err;      // errorni qaytaramz
        }
    }

    public async getProduct(productId: string): Promise<Product> {
        try {
            const url = `${this.path}/product/${productId}`;
            const result = await axios.get(url, {withCredentials: true}); // withCredentials: true viewni oshiradi kim murojat qilayotgani
            console.log("getProduct:", result);

            return result.data;

        } catch(err) {
            console.log("Error, getProduct:", err); 
            throw err;
        }
    }

  
}

export default ProductService;