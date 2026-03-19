import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
