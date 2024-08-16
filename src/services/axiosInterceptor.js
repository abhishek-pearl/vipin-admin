import axios from "axios";

// Creating new axios instance
export const instance = axios.create({
  withCredentials: false,
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response;
  },
  async (error) => {
    console.log(error)

    let errorMessage = "";
    // Do something with response error
    let loggedInUserName = 'admin';
    let originalRequest = error.config;

    if (
      error.response.status === 401 ||
      (error.response.status === 403 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      try {
        if (loggedInUserName) {
          await instance.post(
            "/auth/refresh",
            { userName: loggedInUserName },
            {
              withCredentials: true,
            }
          );
          return instance(originalRequest);
        } else {
          errorMessage = "Unauthorized Access";
          return Promise.reject(errorMessage);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }

    switch (Number(error.response.status)) {
      case 400:
        errorMessage = error.response.data.message || "Bad Request";
        break;

      case 404:
        errorMessage = error.response.data.message || "Resource Not Found";
        break;

      case 500:
        errorMessage = error.response.data.message || "Internal Server Error";
        break;

      default:
        errorMessage =
          error.response.data.message ||
          "Sorry, something went wrong. Please try again later.";
    }
    return Promise.reject(errorMessage);
  }
);

// ------------------------------------------- THE END -------------------------------------------
