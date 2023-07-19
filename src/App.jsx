import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/login/login'
import DashboardAlumno from './pages/Alumno/Dashboard'
import PublicRoutes from './router/publicRoutes'
import PrivateRoutes from './router/privateRoutes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();

function App() {


    return(
      <BrowserRouter>
        <QueryClientProvider client={queryClient} >
          
              <AuthProvider>
                    <PublicRoutes/>
                    <PrivateRoutes/>
              </AuthProvider>
           
          </QueryClientProvider>
         
        </BrowserRouter>
      )
 
   
}

export default App
