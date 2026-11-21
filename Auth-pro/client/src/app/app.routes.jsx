import { createBrowserRouter } from 'react-router'
import RegisterPage from '../modules/auth/pages/registerPage'
import ProfilePage from '../modules/auth/pages/profilePage'

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <RegisterPage />
    },
    {
        path: "/profile",
        element: <ProfilePage />
    }
])