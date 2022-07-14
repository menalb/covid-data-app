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


      </header>
      <main className="container mx-auto">
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
          <p className="text-3xl text-gray-700 font-bold mb-5">
            Welcome!
          </p>
          <p className="text-gray-500 text-lg">
            COVID  Data
          </p>
        </div>
        <QueryClientProvider client={queryClient}>
          <IndexPage />
        </QueryClientProvider>
      </main>
    </div>
  )
}

export default App
