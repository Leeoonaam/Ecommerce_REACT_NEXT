'use client'
import { ProvedorCarrinho } from "@/data/constants/contextoCarrinho";

export default function Layout(props: any){
    return(
        <ProvedorCarrinho>{props.children}</ProvedorCarrinho>
    )
}