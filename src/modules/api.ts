import axios from "axios"


const baseURL = process.env.NEXT_PUBLIC_API_URL

export async function registerPlayer(name: string): Promise<any> {
  return await axios.post(`${baseURL}/play`, { name })
}

export async function generateCode(): Promise<any> {
  return await axios.post(`${baseURL}/create`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tickToken")}`,
    }
  })
}