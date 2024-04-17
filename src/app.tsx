import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Outlet } from "react-router-dom"
import { Division } from "./components/division"

export function App() {
  return (
    <div >
      <Header/>
      <Division/>
      <Outlet/>

    <div className="flex items-center justify-center mt-20">
      <Footer/> 
    </div>
    </div>
  )
}


