import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import IndexPage from './pages/IndexPage'
import { QueryClient, QueryClientProvider } from 'react-query'


function App() {
  const [count, setCount] = useState(0)

  const queryClient = new QueryClient()
  return (
    <div>
      <header>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-5">
            COVID  Data
          </h1>
        </div>
      </header>
      <main className="container mx-auto">        
        <QueryClientProvider client={queryClient}>
          <IndexPage />
        </QueryClientProvider>
      </main>
    </div>
  )
}

export default App
