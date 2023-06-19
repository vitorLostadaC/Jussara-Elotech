import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ThemeProvider } from "@mui/material"
import { theme } from "./styles/theme.ts"
import { QueryClientProvider } from "react-query"
import { queryClient } from "./lib/queryClient.ts"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
)
