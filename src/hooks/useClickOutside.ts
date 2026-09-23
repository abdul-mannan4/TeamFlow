"use client"
import { useEffect,useRef } from "react"

export default function UseClickOutside<T extends HTMLElement>(
    onOutsideClick:()=>void
) {

    const ref=useRef<T>(null)
    useEffect(()=>{
        const handleClickOutsode=(event:MouseEvent)=>{

            if(
                ref.current && 
                !ref.current.contains(event.target as Node)){
                    onOutsideClick();
                }
            }
            document.addEventListener("mousedown",handleClickOutsode);
            return()=>{
                document.removeEventListener("mousedown",handleClickOutsode)
            }
        }
,[onOutsideClick])
 return ref
}
