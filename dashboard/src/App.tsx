// src/App.tsx

import { AppRouter } from "@/app/router/AppRouter"
import { AuthProvider } from "@/app/providers/AuthProvider"
import { QueryProvider } from "@/app/providers/QueryProvider"
import { ThemeProvider } from "./app/providers/ThemeProvider"

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  )
}

export default App
