// src/App.tsx

import { AppRouter } from "@/app/router/AppRouter"
import { AuthProvider } from "@/app/providers/AuthProvider"
import { QueryProvider } from "@/app/providers/QueryProvider"
import { ThemeProvider } from "./app/providers/ThemeProvider"
import { Toaster } from 'sonner'

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <AppRouter />
          <Toaster richColors closeButton />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  )
}

export default App
