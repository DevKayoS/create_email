import { Plus } from "lucide-react";
import { useState,  useEffect, FormEvent} from "react";
import { Toaster, toast } from "sonner";
import { ButtonCopy } from "../components/ButtonCopy";
import { ButtonTrash } from "../components/buttonTrash";
// import axios from 'axios';

export function CreateEmail(){

  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [text, setText] = useState(localStorage.getItem("text") || "")
  // const textAreaRef = useRef(null)

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


// Função para adicionar uma linha
// async function adicionarLinha() {
//   try {
//     // Substitua "URL_DA_SUA_ROTA" pela URL real da sua rota
//     const response = await axios.post("URL_DA_SUA_ROTA/addRow", {
//       values: ["valor1", "valor2", "valor3"] // Substitua pelos valores que deseja adicionar
//     });

//     console.log(response.data); // Exibe a resposta do servidor
//   } catch (error) {
//     console.error(error); // Trata qualquer erro de requisição
//   }
// }



  return(
    <div className="flex justify-center gap-10 items-center">
       <form onSubmit={addEmailHandler} 
      className="h-80 bg-slate-400/25 rounded-md w-96 flex flex-col items-center justify-center  shadow-lg shadow-sky-950 space-y-10 mt-20  mb-20">
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