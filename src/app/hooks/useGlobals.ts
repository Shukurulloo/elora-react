import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

interface GlobalInterface {
    authMember: Member | null; // member yoki member emas
    setAuthMember: (member: Member | null) => void;
}

// createContext methoti ni
export const GlobalContext = createContext<GlobalInterface | undefined>(
    undefined
);

export const useGlobals = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) throw new Error("useGlobals withit Provider");
    return context;
;}
