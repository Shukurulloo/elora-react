import axios from "axios";
import { serverApi } from "../../lib/config";


class OrderService {
    private readonly path: string;

    constructor() {
        this.path = serverApi; //  urlni qiymatini pathga tenglaymz
    }
}

export default OrderService;