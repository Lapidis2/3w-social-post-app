

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/authPage/login'
import SocialPage from './pages/socialPage';
import Signup from './pages/authPage/signup';
import { Toaster } from './components/ui/toaster';
const queryClient = new QueryClient();

function App() {
 

  return (
     <QueryClientProvider client={queryClient}>

    <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SocialPage />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

  </QueryClientProvider>
  )
}

export default App
