import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const useBasket = () => {
  // Refresh bo'lsaham yo'qolmaydi
    const cartJson: string | null = localStorage.getItem("cartdata"); // localstorajedan qabul qilamz cartdata borligini tekshirib
    const currentCart = cartJson ? JSON.parse(cartJson) : []; // agar cartJson bo'lsa uni parse qilamz cartJsonni ishlatib, jsondan objectga aylantrib
    const [cartItems, setCartItems] = useState<CartItem[]>(currentCart); // boshlang'ich qiymatini cartItemsga tengladik 

     // basket logic
  const onAdd = (input: CartItem) => { //onAdd ishga tushsa input kirib keladi
    const exist: any = cartItems.find( // basketda qo'shayotgan product borligini itiration method orqali tekshiramz
      (item: CartItem) => item._id === input._id); // qo'shmoqchi bo'lgan inputni idsini basketni ichidagi mavjud bo'lgan itemlarni idsi bn solishtramz
    if(exist) { // agar basketda u item mavjud bo'lsa faqat productni quantitysi cartda yangilanadi
      const cartUpdate = cartItems.map((item: CartItem) => // map orqali har bir itemsni qo'lga olib
        item._id === input._id      // kirib kelgan input itemga teng bo'lsa
        ? {...exist, quantity: exist.quantity + 1} //yani spread op orqali  sonini 1 ga oshiradi
        : item // qolgan holda itemni o'zi return bo'lsin
      );
      setCartItems(cartUpdate);       // cartUpdateni ishlatib setCartItemsni ishga tushiramz
      localStorage.setItem("cartdata", JSON.stringify(cartUpdate)); // localStoragedaham yangila
    }else { // basketda avvalda u product bo'lmasa uni pasketga joylash
      const cartUpdate = [...cartItems, {...input}]; // spred o orqli cartItemsni qiymatidan foydalanib va kirib kelgan inputni qo'shib yangi  arrayni hosil qiladi
      setCartItems(cartUpdate); // cartUpdateni ishlatib setCartItemsni ishga tushiramz
      localStorage.setItem("cartdata", JSON.stringify(cartUpdate)); // va localStorham yangilanadi
    }//localStoragega kirib setItemni ishga tushirib nomini kiritib JSON formatida joyla
  }

  const onRemove = (input: CartItem) => { // sonini kamaytir -1
    const exist: any = cartItems.find(
        (item: CartItem) => item._id === input._id
    );
    if(exist.quantity === 1) { // eng oxiri 1 bo'lsa o'chir
        const cartUpdate = cartItems.filter((item: CartItem) => item._id !== input._id); // exist productni o'chirib beradi
        setCartItems(cartUpdate);
        localStorage.setItem("cartdata", JSON.stringify(cartUpdate)); // va localStorham yangilanadi
    }else {
        const cartUpdate = cartItems.map((item: CartItem) => 
            item._id === input._id 
        ? {...exist, quantity: exist.quantity -1} // existni qiymati orqali quantityni 1ga kamaytr
        : item  // aks holda itemni o'zini qaytar
    ); 
        setCartItems(cartUpdate);
        localStorage.setItem("cartdata", JSON.stringify(cartUpdate)); // va localStorham yangilanadi
    }
  }

  const onDelete = (input: CartItem) => {  // x bosilsa
    const cartUpdate = cartItems.filter( 
        (item: CartItem) => item._id !== input._id //teng bo'lmaganini qaytarsin deb tengini o'chiramz
    ); 
    setCartItems(cartUpdate);
    localStorage.setItem("cartdata", JSON.stringify(cartUpdate)); // va localStorham yangilanadi
  };

  const onDeleteAll = () => {   // buttton bosilsa
    setCartItems([]);   //itemslarni bo'sh arrayga o'zgartr
    localStorage.removeItem("cartData");  // localstoragedanham o'chr
  }
   
  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  }
};

export default useBasket;