import { Plus } from "lucide-react";
import { useState,  useEffect, FormEvent} from "react";
import { Toaster, toast } from "sonner";
import { ButtonCopy } from "../components/ButtonCopy";
import { ButtonTrash } from "../components/buttonTrash";
import { adicionarLinha } from "../helpers/addNewRow";
import { gerarSenhaAleatoria } from "../helpers/generateRandomPassword";

export function CreateEmail(){
  const [fullName, setFullName] = useState("")
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [text, setText] = useState(localStorage.getItem("text") || "")
  // const textAreaRef = useRef(null)

  useEffect(()=>{
    localStorage.setItem("text", text)
  }, [text])

  const addEmailHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const senhaAleatoria = gerarSenhaAleatoria();
    const newText = `${name};${lastname};${name.toLocaleLowerCase()}-${lastname.toLocaleLowerCase()}@grupoamp.com.br;${senhaAleatoria};exchange/basic5gb`

    const email = `${name.toLocaleLowerCase()}-${lastname.toLocaleLowerCase()}@grupoamp.com.br`
    
    
    adicionarLinha(fullName.toUpperCase(), email, senhaAleatoria)
  
    console.log(fullName, email, senhaAleatoria)

    
    setText((prevText) => prevText ? `${prevText}\n${newText}` : newText)
    setFullName('')
    setName('')
    setLastname('')
  
  }

  function copy(){
    navigator.clipboard.writeText(text)
    toast.success('Copiado com sucesso!')
    
}

function handleDelete(){
  setText('')
  toast.error('Texto apagado com sucesso!')
}

  return(
    <div className="flex justify-center gap-10 items-center mt-28">
       <form onSubmit={addEmailHandler} 
      className="bg-slate-400/25 rounded-md w-96 flex flex-col items-center justify-center p-6 shadow-xl shadow-black  space-y-10 ">
        <div className="flex flex-col space-y-8">
            <input 
              type="text" 
              placeholder="Nome completo" 
              className="rounded py-2 border-b-2 border-black outline-none px-2" 
              value={fullName}
              onChange={(e)=> setFullName(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Nome" 
              className="rounded py-2 border-b-2 border-black outline-none px-2" 
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Sobrenome" 
              className="rounded-md py-2 border-b-2 border-black outline-none px-2" 
              value={lastname}
              onChange={(e)=> setLastname(e.target.value)}
              />
      </div>
       <button 
       type="submit" 
       className="hover:bg-slate-950/60 text-xl px-4 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black flex items-center justify-center ">
        <Plus className="size-5"/> Adicionar</button>
    </form>

    <div className=" flex gap-3 justify-center ">
      <textarea 
        className="w-[650px] h-96 rounded-md p-5 outline-none shadow-lg border-2 shadow-sky-950 bg-slate-300"
        value={text}
        onChange={(e)=> setText(e.target.value)}
      ></textarea>
      <div className="flex flex-col gap-4 mt-8">
        <Toaster richColors/>
          <ButtonTrash onClick={handleDelete}/>
          <ButtonCopy onClick={copy}/>
      </div>
    </div>
    </div>
  )
}