import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { authRoutes, protectedRoutes } from './common/routes'
import AUTHROUTE from "./authRoutes"
import PROTECTEDROUTE from './protectedRoutes'
const AppRoutes = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<AUTHROUTE />} >
               {authRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
               ))}
            </Route>
            <Route element={<PROTECTEDROUTE />}>
               {protectedRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
               ))}
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default AppRoutes
