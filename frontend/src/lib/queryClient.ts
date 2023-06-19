import { QueryClient } from "react-query"
import { toast } from "react-toastify"
import { TimeInMs } from "../utils/utils"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: TimeInMs.TenMinutes
    },
    mutations: {
      onError: () => {
        toast.error("Aconteceu um erro")
      }
    }
  }
})
