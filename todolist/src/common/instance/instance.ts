import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "0d6fcc4b-d0b8-4c34-b068-91acef8dc727",
  },
})
