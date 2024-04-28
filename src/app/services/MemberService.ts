import axios from "axios";
import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";


class MemberService {
    private readonly path: string;

    constructor() {
        this.path = serverApi; //  urlni qiymatini pathga tenglaymz
    }
   
    public async getTopUsers(): Promise<Member[]> { // memberdan iborat array
        try {
            const url = this.path + "/member/top-users"; 
            const result = await axios.get(url);  // axiosni get methotiga urlni pas qilamz kutib resultga
            console.log("getTopUsers:", result);

            return result.data // resultni ichida data beriladi u backentdan yuborilgan malumot
        }catch(err) {
            console.log("Error, getTopUsers:", err);
            throw err;
        }
    }

    public async getRestaurant(): Promise<Member> {
        try {
            const url = this.path + "/member/restaurant"; 
            const result = await axios.get(url); 
            console.log("getRestaurant:", result);

            const restaurant: Member = result.data;
            return restaurant;
        } catch(err) {
            console.log("Error, getRestaurant:", err); 
            throw err;
        }
    }
}

export default MemberService;