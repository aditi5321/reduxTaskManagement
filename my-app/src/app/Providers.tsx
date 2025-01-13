'use client'
import { Store } from "@/features/Store";
import { Provider } from "react-redux";

export function Providers({children}:{children:React.ReactNode}){
    return <Provider store={Store}>{children}</Provider>
}