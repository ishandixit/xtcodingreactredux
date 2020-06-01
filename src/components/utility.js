import { base_url } from "./globals"

import Axios from "axios";
import { history } from "../history"

//Fetch Data template
export const fetchData = (url, data,responseType='json', time = 30000 ) => {
     let headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
    if(url!=='/login'){
        headers={
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "authorization":"Bearer "+data.token
        }
        delete data.token

    }
    let elem = document.getElementById("preloader")
        var instance = M.Modal.getInstance(elem);
        instance.open()
    return Axios(base_url + url, {
        method: "post",
        headers:headers,
        timeout: time,
        data,
        responseType,
    }).then(function (response) {
        instance.close()
        if(responseType==='blob'){
          return response
         }
        return response.data
    }).catch(function (error) {
        instance.close()
        let msg
        if(error.response){
            return error.response.data;
            msg = error.response.data.error || error.response.statusText
        }else if(error.message){
            msg = error.message
        }else if(error.request){
            msg = error.request
        }
        history.replace({ state: { ...history.location.state, alertMsg: msg } })
        // $('#alert').modal('open')
        throw new Error(error)
    });
}

//Get Data template
export const getData = (url,responseType='json',token,time = 30000) => {
    let headers={
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       "Access-Control-Allow-Origin": "*",
       "authorization":"Bearer "+token
      }

   let elem = document.getElementById("preloader")
       var instance = M.Modal.getInstance(elem);
       instance.open()
   return Axios(base_url + url, {
       method: "get",
       headers:headers,
       timeout: time,
       responseType,

   }).then(function (response) {
       instance.close()
       if(responseType==='blob'){
        return response
       }
       return response.data
   }).catch(function (error) {
       instance.close()
       let msg
       if(error.response){
           msg = error.response.data.error || error.response.statusText
       }else if(error.message){
           msg = error.message
       }else if(error.request){
           msg = error.request
       }
       return error.response.data
     
   });
}
//Delete Data template
export const deleteData = (url, data, time = 30000,responseType='json') => {
    let headers={
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       "Access-Control-Allow-Origin": "*",
       "authorization":"Bearer "+data.token
   }
   let elem = document.getElementById("preloader")
        var instance = M.Modal.getInstance(elem);
        instance.open()

   return Axios(base_url + url, {
       method: "delete",
       headers:headers,
       timeout: time,
       responseType,

   }).then(function (response) {
    instance.close()
       return response.data
   }).catch(function (error) {
    instance.close()
       let msg
       if(error.response){
           msg = error.response.data.error || error.response.statusText
       }else if(error.message){
           msg = error.message
       }else if(error.request){
           msg = error.request
       }
    //    history.replace({ state: { ...history.location.state, alertMsg: msg } })
       throw new Error(error)
   });
}

//Update Data template
export const updateData = (url, data, time = 30000,responseType='json') => {
    let headers={
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       "Access-Control-Allow-Origin": "*",
       "authorization":"Bearer "+data.token
   }
   delete data.token

   let elem = document.getElementById("preloader")
        var instance = M.Modal.getInstance(elem);
        instance.open()
   return Axios(base_url + url, {
       method: "patch",
       headers:headers,
       timeout: time,
       data:data,
       responseType

   }).then(function (response) {
    instance.close()
       return response.data
   }).catch(function (error) {
    instance.close()
       let msg
       if(error.response){
           msg = error.response.data.error || error.response.statusText
       }else if(error.message){
           msg = error.message
       }else if(error.request){
           msg = error.request
       }
       throw new Error(error)
   });
}
export function validateForm(data, error) {
    let flag = 1
    Object.keys(data).forEach(element => {
        if (data[element] == "" || error[element] != "")
            flag = 0
    })
    return flag
}


export const RegEx = {
    email: /\S+@\S+\.\S+/,
    text: /^[a-zA-Z ]+$/,
    number: /^[0-9]+$/,
    varchar: /^[a-zA-Z0-9 \- \/ , .]+$/,
    date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
    pin: /^[0-9]{6}/,
    pan: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
    aadhar: /^[0-9]{12}$/,
    mobile: /^[0-9]{10}$/,
    select: /^[a-zA-Z0-9 \- \/ , .]+$/,
    password: /^.{4,}/,
    otp: /^[0-9]{4}/,
    // application_id: /^([a-zA-z]){3,4}([0-9]){13}?$/
    application_id: /^([a-zA-Z0-9 \- \/ , .]){6,17}?$/,
}
