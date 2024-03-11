import {atom, selector} from "recoil";
import axios from 'axios';
export const Cardsatom=atom({
    key:"Cardsatom",
    default:selector({
        key:"Cardsatom/selector",
        get:async ()=>{
            await new Promise((r)=>{
                setTimeout(r,2000);
            })
            let cards=await axios.get("http://localhost:3000/card",{
                headers:{
                    'token':localStorage.getItem("token")
                }
            });
            console.log(cards.data);
            return cards.data;
        }
    })
})