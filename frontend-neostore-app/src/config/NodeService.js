import axios from 'axios';
import {MAIN_URL} from './Url';

let token=localStorage.getItem('token');

let email = localStorage.getItem("email")
// let pro_id = localStorage.getItem("single_pro_id")

//register user
export function registerUser(data){
    return axios.post(`${MAIN_URL}register`,data);
}

// social_register
export function registerSocialUser(data){
    console.log(data)
    return axios.post(`${MAIN_URL}social_register`,data);
}

//login user
export function loginUser(data){
    return axios.post(`${MAIN_URL}login`,data);
}

//verify email
export function verifyEmail(data){
    console.log(data)
    return axios.post(`${MAIN_URL}email_Verification/${email}`,data)
}

//get state for verified email
export function getVerifyEmailState(){
    return axios.get(`${MAIN_URL}verifyState/${email}`)
}

//resend email verification mail
export function resend_VerifyEmail(data){
    console.log(data)
    return axios.post(`${MAIN_URL}email_Verification`,data)
}

//forget password
export function forgetPassword(data){
    return axios.post(`${MAIN_URL}forgetpassword`,data)
}

//reset password
export function resetPassword(data){
    return axios.put(`${MAIN_URL}resetpassword`,data)
}

//get customer info
export function getCustomer(uid){
    console.log(uid)
    return axios.get(`${MAIN_URL}getCustomerProfile/${uid}`,{
        headers:{"Authorization":`Bearer ${token}`}})
}


//update password or change password
export function updatePassword(data,uid){
    console.log(uid)
    return axios.post(`${MAIN_URL}changepassword/${uid}`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}

//update user profile
export function updateuser(data,uid){
    console.log(uid,data)
    return axios.put(`${MAIN_URL}profile/${uid}`,data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
//updateProfileImage
export function updateProfileImage(formdata,config){
    console.log(formdata,config)
    return axios.put(`${MAIN_URL}propic`,formdata,config)
}

//Add address
export function addAddr(data,uid){
    console.log(data,uid)
    return axios.post(`${MAIN_URL}addAddress/${uid}`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}

//get all customer address
export function getCustAddress(uid){
    console.log(uid)
    return axios.get(`${MAIN_URL}getCustAddress/${uid}`,{
    headers:{"Authorization":`Bearer ${token}`}})
}

//edit address
export function editAdd(data){
    console.log(data)
    return axios.put(`${MAIN_URL}editAddress`,data,{
    headers:{"Authorization":`Bearer ${token}`}})
}

//delete address
export function delAdd(data){
    console.log(data.del_id)
    return axios.delete(`${MAIN_URL}deleteAddress/${data.del_id}`,{
        headers:{"Authorization":`Bearer ${token}`}})
}

//fetch all products
export function commonProduct(){
    return axios.get(`${MAIN_URL}commonproducts`)
}

//get single product info
export function getProduct(id){
    // console.log(`${pro_id}`)
    return axios.get(`${MAIN_URL}getSingleProduct/${id}`)
}

//add product to Cart when user is login
export function addToCart(uid,data){
    console.log(uid)
    console.log(data)
    return axios.post(`${MAIN_URL}addtocart/${uid}`,data);
}
//fetch all cart Data
export function fetchCartArray(uid){
    console.log(uid)
    return axios.get(`${MAIN_URL}fetchCartArray/${uid}`)
}
//add order or place order
export function addToOrder(uid,data){
    console.log(uid)
    console.log(data)
    return axios.post(`${MAIN_URL}addproducttocartcheckout/${uid}`,data)
}
//fetch or get order details
export function getOrderDetails(uid){
    console.log(uid)
    return axios.get(`${MAIN_URL}getOrderDetails/${uid}`)
}


// export function generateInvoice(data){
//     console.log(data)
//     console.log("Inside NodeService")
//     return axios.post(`${MAIN_URL}generateinvoice`,data);
// }

// export function fetchinvoice(){
//     return axios.get(`${MAIN_URL}fetchinvoice`);
// }