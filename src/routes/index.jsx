import { createHashRouter } from "react-router-dom"
import FrontLayout from '../layout/FrontLayout'
import Home from '../pages/Home'
import About from "../pages/About"
import Skills from "../pages/Skills"
import Portfolio from "../pages/Portfolio"

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
        path: 'skills',
        element: <Skills />,
      }
    ],
  },
])

export default router