import React, {ReactNode, useState} from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const cookies = new Cookies(); // browerdagi cookilarni qo'lga olamz
    if(!cookies.get("accessToken")) localStorage.removeItem("memberData"); // cokie o'chirilsa browserni localstoragesida qolib ketgan datani o'chiradi hafszlik uchun
    // cokkini vaqti tugasa

/** har yangilanganda browserdan birinchi access tokkenni tekshiradi
 * saqlangan bo'lsagina localstoragedan datani qayta qabul qiladi
*/
    const [authMember, setAuthMember] = useState<Member | null>(
        localStorage.getItem("memberData")
        ? JSON.parse(localStorage.getItem("memberData") as string)
        : null
    );
    const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
    console.log("=== verify ===");

    return (<GlobalContext.Provider 
        value={{authMember, setAuthMember, orderBuilder, setOrderBuilder}}
        >
        {children}  
        </GlobalContext.Provider>
    );
};

export default ContextProvider