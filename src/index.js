import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

//These are not needed, it's just to illustrate that you can set default headers of many kinds
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

//INTERCEPTOR REQUEST
//This is like a middleware, it's called interceptor
axios.interceptors.request.use(
  (request) => {
    console.log(request);

    // You can edit the request before returning it to other functions

    //Always needs to return request to not block other app requests
    return request;
  },
  //Esta é uma segunda função que é aceite pelo método use de interceptors.request que serve para apanhar qql erro de requests
  // It only catches errors that occured during the sending of a request, to catch error when the response is received, you need to use the interceptors.response object with its methods.
  (error) => {
    console.log(error);
    //This return with a Promise.reject it's just to activate any catch methods that could have been implemented locally if needed, doesn't need to be like this necessarily
    return Promise.reject(error);
  }
);

//INTERCEPTOR RESPONSE
const myInterceptor = axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

//REMOVING INTERCEPTOR, just as an example:
axios.interceptors.request.eject(myInterceptor);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
