import { createHashRouter } from "react-router-dom"
import FrontLayout from '../layout/FrontLayout'
import Home from '../pages/Home'
import About from "../pages/About"
import Skills from "../pages/Skills"
import Portfolio from "../pages/Portfolio"
import Piece from "../pages/piece"
import NotFound from "../pages/NotFound"

const router = createHashRouter([
  {
    path: '/',
    element: <FrontLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',     
        element: <About />, 
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'piece/:id',
        element: <Piece />,
      },
      {
        path: 'skills',
        element: <Skills />,
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router