import { Header } from "./components/header"
import { Plus } from "lucide-react"
import { FormEvent, useRef, useState, useEffect } from "react"



export function App() {
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [text, setText] = useState(localStorage.getItem("text") || "")
  const textAreaRef = useRef(null)

  useEffect(()=>{
    localStorage.setItem("text", text)
  }, [text])


  function gerarSenhaAleatoria() {
    // Definindo os caracteres possíveis.
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?';
    
    // Determinando o tamanho da senha.
    const tamanhoSenha = 8;
    
    // Variável para armazenar a senha.
    let senha = '';
    
    // Gerando a senha.
    for (let i = 0; i < tamanhoSenha; i++) {
      // Escolhendo um caractere aleatório dos possíveis e adicionando à senha.
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      senha += caracteres.charAt(indiceAleatorio);
    }
    
    // Retornando a senha gerada.
    return senha;
  }
  
  // Salvando a senha gerada em uma variável.
  

  const addEmailHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const senhaAleatoria = gerarSenhaAleatoria();
    const newText = `${name};${lastname};${name.toLocaleLowerCase()}-${lastname.toLocaleLowerCase()}@grupoamp.com.br;${senhaAleatoria}`
    
    
    setText((prevText) => prevText ? `${prevText}\n${newText}` : newText)
    setName('')
    setLastname('')
  
  }
 
  

  return (
    <div >
      <Header/>
      <form onSubmit={addEmailHandler} className="bg-slate-300/30 rounded-md w-96 flex flex-col items-center justify-center  m-auto shadow-lg shadow-sky-950 space-y-10 mt-20 h-72 mb-20">
        <h1 className=" text-2xl f">Por favor insira o nome:</h1>
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
       <button type="submit" className="border-2 py-2 px-6 rounded-md border-sky-400 hover:bg-sky-400 flex shadow-lg shadow-sky-950 items-center justify-center gap-1"><Plus className="size-5"/> Adicionar</button>
    </form>

    <div className=" flex items-center justify-center ">
      <textarea 
        className="w-[700px] h-72 rounded-md p-5 outline-none shadow-lg border-2 shadow-sky-950 bg-slate-300"
        ref={textAreaRef}
        value={text}
        onChange={(e)=> setText(e.target.value)}
      ></textarea>
    </div>

     
    </div>
  )
}


