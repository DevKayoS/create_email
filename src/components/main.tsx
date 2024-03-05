import { Plus } from "lucide-react"
import { FormEvent, useState } from "react"
interface Props {
  name: string,
  lastname: string,
}


export function Main({name, lastname}: Props){
  const [primeiroNome, setPrimeiroNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")

  const addEmailHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

  }


  return (
    <form onSubmit={addEmailHandler} className="bg-slate-300 rounded-md w-96 flex flex-col items-center justify-center m-auto space-y-10 mt-20 h-72">
      <h1 className=" text-xl">Por favor insira o nome:</h1>
      <div className="flex flex-col space-y-8">
          <input type="text" placeholder="Nome" className="rounded py-2 border-b-2 border-black outline-none" value={name}/>
          <input type="text" placeholder="Sobrenome" className="rounded-md py-2 border-b-2 border-black outline-none" value={lastname}/>
      </div>
       <input type="submit" className="border-2 py-2 px-6 rounded-md border-sky-400 hover:bg-sky-400 flex items-center justify-center gap-1"><Plus className="size-5"/> Adicionar</input>
    </form>
  )
}