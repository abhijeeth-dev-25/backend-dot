import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import AuthProvider from '../modules/auth/context/authProvider'
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App