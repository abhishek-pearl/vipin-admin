import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import CryptoJS from 'crypto-js'; // Add crypto library for encrypti

const useAppStore = create(
  persist(
    (set, get) => ({
      userData: {},
      updateUserData: (userData) => set({ userData:userData }),
    }),
    {
      name: 'app-storage', // name of the item in the storage (must be unique)
    // storage: {
    //     getItem: (name) => {
    //       const encryptedData = localStorage.getItem(name);
    //       if (!encryptedData) return null;

    //       // Decrypt data
    //       const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret-key').toString(CryptoJS.enc.Utf8);
    //       return JSON.parse(decryptedData);
    //     },
    //     setItem: (name, value) => {
    //       // Encrypt data
    //       const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), 'secret-key').toString();
    //       localStorage.setItem(name, encryptedData);
    //     },
    //     removeItem: (name) => localStorage.removeItem(name),
    //   },
    },
  ),
)

export default useAppStore