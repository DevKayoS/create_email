import { Header } from "./components/header"
import { Copy, Plus, Trash2Icon } from "lucide-react"
import { FormEvent, useRef, useState, useEffect } from "react"
import { Footer } from "./components/footer"
import {Toaster, toast} from 'sonner'



export function App() {
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [text, setText] = useState(localStorage.getItem("text") || "")
  const textAreaRef = useRef(null)

  useEffect(()=>{
    localStorage.setItem("text", text)
  }, [text])


  function gerarSenhaAleatoria() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|"<>?';
    
    const tamanhoSenha = 8;
    
    let senha = '';
  
    for (let i = 0; i < tamanhoSenha; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      senha += caracteres.charAt(indiceAleatorio);
    }

    const haveUpperCase = /[A-Z]/.test(senha)
    const haveLowerCase = /[a-z]/.test(senha)
    const haverNumber = /[0-9]/.test(senha)
    const haveSymbols = /[^A-Za-z0-9]/.test(senha)

    if (haveUpperCase && haveLowerCase && haverNumber && haveSymbols ){
      return senha
    } else {
      return gerarSenhaAleatoria()
    }
    
  }
  
  // Salvando a senha gerada em uma variável.
  

  const addEmailHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const senhaAleatoria = gerarSenhaAleatoria();
    const newText = `${name};${lastname};${name.toLocaleLowerCase()}-${lastname.toLocaleLowerCase()}@grupoamp.com.br;${senhaAleatoria};exchange/basic5gb`
    
    
    setText((prevText) => prevText ? `${prevText}\n${newText}` : newText)
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
 
  

  return (
    <div >
      <Header/>
      <form onSubmit={addEmailHandler} 
      className="h-80 bg-slate-400/25 rounded-md w-96 flex flex-col items-center justify-center  m-auto shadow-lg shadow-sky-950 space-y-10 mt-20  mb-20">
        <h1 className=" text-3xl font-semibold text-black/70">Por favor insira o nome:</h1>
        <div className="flex flex-col space-y-8">
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
       className="hover:bg-slate-950/60 text-2xl px-4 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black flex items-center justify-center ">
        <Plus className="size-5"/> Adicionar</button>
    </form>

    <div className=" flex flex-col items-center justify-center ">
      <textarea 
        className="w-[700px] h-72 rounded-md p-5 outline-none shadow-lg border-2 shadow-sky-950 bg-slate-300"
        ref={textAreaRef}
        value={text}
        onChange={(e)=> setText(e.target.value)}
      ></textarea>
      <div className="flex gap-4 mt-8">
      <Toaster richColors/>
        <button 
        onClick={handleDelete}
        className="flex items-center gap-2 hover:bg-slate-950/60 text-2xl px-4 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black">
          <Trash2Icon/>Apagar</button>
        <button 
        onClick={copy}
        className="flex items-center gap-2 hover:bg-slate-950/60 text-2xl px-4 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black">
          <Copy/> Copiar</button>
      </div>
    </div>

    <div className="flex items-center justify-center mt-20">
      <Footer/> 
    </div>

    </div>
  )
}


