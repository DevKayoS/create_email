import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Outlet } from "react-router-dom"

export function App() {
  return (
    <div >
      <Header/>
    <div className="flex items-center justify-center mb-20">
      <Outlet/>
    </div>
      <Footer/> 
    </div>
  )
}


