import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const useBasket = () => {
    const cartJson: string | null = localStorage.getItem("cartdata"); // localstorajedan qabul qilamz
    const currentCart = cartJson ? JSON.parse(cartJson) : []; // jsondan objectga aylantrib
    const [cartItems, setCartItems] = useState<CartItem[]>(currentCart); // boshlang'ich qiymatini cartItemsga tengladik 

     // basket logic
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id); // cartItemsdan krib kegan inputni  borligini tekshirib
    if(exist) {
      const cartUpdate = cartItems.map((item: CartItem) => // mavjud bo'lsa faqat productni quantitysi cartda yangilanadi
        item._id === input._id 
        ? {...exist, quantity: exist.quantity + 1} 
        : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartdata", JSON.stringify(cartUpdate)); 
    }else {
      const cartUpdate = [...cartItems, {...input}]; // mavjud bo'lmasa yuqoridagi cart items yangilanadi
      setCartItems(cartUpdate);
      localStorage.setItem("cartdata", JSON.stringify(cartUpdate)); // va localStorham yangilanadi
    }
  }

  const onRemove = (input: CartItem) => {
    const exist: any = cartItems.find(
        (item: CartItem) => item._id === input._id
    );
    if(exist.quantity === 1) {
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

  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id
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