import { createHashRouter } from "react-router-dom"
import FrontLayout from '../layout/FrontLayout'
import Home from '../pages/Home'

const router = createHashRouter([
  {
    path: '/',
    element: <FrontLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
])

export default router