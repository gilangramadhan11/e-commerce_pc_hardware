import axios from "axios"

const COST_API_KEY =
 import.meta.env.VITE_RAJAONGKIR_COST_KEY
 import.meta.env.VITE_RAJAONGKIR_DELIVER_KEY
 import.meta.env.VITE_RAJAONGKIR_PAYMENT_KEY

const BASE_URL =
"https://rajaongkir.komerce.id/api/v1"

export const getShippingCost = async (
 origin,
 destination,
 weight,
 courier
)=>{

 try{

 const response = await axios.post(

`${BASE_URL}/calculate/domestic-cost`,

{
 origin,
 destination,
 weight,
 courier
},

{
 headers:{
  key:COST_API_KEY
 }
}

 )

 return response.data

 }catch(error){

 console.log(error)

 throw error

 }

}