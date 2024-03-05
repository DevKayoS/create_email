import { Header } from "./components/header"
import { Main } from "./components/main"
import { MainList } from "./components/mainList"

export function App() {
  return (
    <div>
      <Header/>
      <Main name={name} lastname={lastname}/>
      <MainList name={name} lastname={lastname}/>
    </div>
  )
}


