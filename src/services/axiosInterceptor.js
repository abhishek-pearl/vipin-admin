import axios from "axios";
import jwt from "jsonwebtoken"; 
// Creating new axios instance
export const instance = axios.create({
    withCredentials: true,
    baseURL: `${
        import.meta.VITE_REACT_APP_WORKING_ENVIRONMENT === "development"
            ? import.meta.VITE_PUBLIC_API_URL
            : import.meta.VITE_PUBLIC_API_URL_PRODUCTION
    }`,
});

// Request interceptor
instance.interceptors.request.use(
    async (request) => {
      
      let cookies ='' ;
      if(document?.cookie)
      {
        const cookieHeader = document?.cookie;
         cookies = cookieHeader.split(";").reduce((acc, cookie) => {
          const [key, value] = cookie.split("=").map((item) => item.trim());
          acc[key] = value;
          return acc;
      }, {});

      if (cookies?.DHANLAXMI_ACCESS_TOKEN) {
        const decode = jwt.decode(cookies?.DHANLAXMI_ACCESS_TOKEN);
        console.log("Token Expiration Time:", decode.exp);

        // Check if the token is about to expire (or already expired)
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decode.exp < currentTime) {
          console.log("Access token expired. Fetching new tokens...");

          try {
            // Make a request to the /refreshToken endpoint
            const response = await axios.post(
              `${import.meta.VITE_PUBLIC_API_URL}/user/refresh`,
              {},
              { withCredentials: true } // Ensure cookies are sent
            );

          
            // return response;
            

          } catch (error) {
            console.error("Error refreshing token:", error);
            return Promise.reject(error);
          }
        }
  
      }
    }
     
    return request;
    },
    (error) => {
        console.log("[AXIOS REQUEST ERROR]", error);
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        console.log("[AXIOS RESPONSE]", response);
        return response; // Must return response
    },
    (error) => {
        console.log("[AXIOS RESPONSE ERROR]", error);
        return Promise.reject(error);
    }
);



