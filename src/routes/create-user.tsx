import { Plus } from "lucide-react";
import { Toaster, toast } from "sonner";
import { ButtonCopy } from "../components/ButtonCopy";
import { ButtonTrash } from "../components/buttonTrash";
import { useState,  useEffect } from "react";
import axios from "axios";

export function CreateUser(){
  // criando os estados
  const [name, setName] = useState("") //estado do nome
  const [lastname, setLastname] = useState("") //estado sobrenome
  const [cpf, setCpf] = useState("") //estado do cpf
  const [textUser, setTextUser] = useState(localStorage.getItem("textUser") || "") //estado para salvar o texto
  const [path, setPath] = useState("")
  // const textAreaRef = useRef(null)

  //usando o useEffect para que só haja alteração quando o text for alterado
  useEffect(()=>{
    localStorage.setItem("textUser", textUser)
  }, [textUser])

  function formatPassword(name: string, lastname: string, cpf: string){
    cpf = cpf.replace(/[-.]/g, "") //removendo os caracteres - ou . do cpf
    cpf = cpf.slice(0, -2) //removendo os dois ultimos numeros do cpf

    //pegando a primeira letra do Nome e do Sobrenome
    const firstLetterName = name.charAt(0).toUpperCase()
    const firstLetterLastName = lastname.charAt(0).toLowerCase()

    const userPassword = `#${firstLetterName}${firstLetterLastName}${cpf}`

    return userPassword
  }

  //função que irá formatar as informações
  const addUserHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const password = formatPassword(name, lastname, cpf);

    const formData = {
      username: `${name} ${lastname}`,
      password: password,
      firstName: name,
      lastName: lastname,
      email: `${name.toLowerCase()}-${lastname.toLowerCase()}@teste.com`,
      ou: path,
    };

    try {
      const response = await axios.post('http://192.168.2.61:3000/createUser', formData);
      console.log('User created successfully:', response.data);
      toast.success('Usuário criado no AD com sucesso', {
        description: `${formData.username} foi criado com sucesso`
      });
      setTextUser((prevText) =>
        prevText ? `${prevText}\nusuário: ${name.toLowerCase()}-${lastname.toLowerCase()}\nemail: ${name.toLocaleLowerCase()}-${lastname.toLocaleLowerCase()}@grupoamp.com.br\nsenha: ${password}\nramal: (em desenvolvimento)\n ______________` : `usuário: ${name.toLowerCase()}-${lastname.toLowerCase()}\nemail: ${name.toLocaleLowerCase()}-${lastname.toLocaleLowerCase()}@grupoamp.com.br\nsenha: ${password}\nramal: (em desenvolvimento)\n ______________`
      );
      setName('');
      setLastname('');
      setCpf('');
      setPath('')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error creating user:', error.message);
      toast.error(`Error creating user: ${error.message}`);
    }
  };

  function copy(){
    navigator.clipboard.writeText(textUser)
    toast.success('Copiado com sucesso!')
}

function handleDelete(){
  setTextUser('')
  toast.error('Texto apagado com sucesso!')
}
  return(
    <div className="flex justify-center gap-10 items-center mt-28">
    <form onSubmit={addUserHandler} 
    className="bg-slate-400/25 rounded-md w-96 flex flex-col items-center justify-center p-6  shadow-lg shadow-sky-950 space-y-10 ">
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
            <input 
           type="text" 
           placeholder="CPF" 
           className="rounded-md py-2 border-b-2 border-black outline-none px-2" 
           value={cpf}
           onChange={(e)=> setCpf(e.target.value)}
           />
           <input 
           type="text" 
           placeholder="Pasta" 
           className="rounded-md py-2 border-b-2 border-black outline-none px-2" 
           value={path}
           onChange={(e)=> setPath(e.target.value)}
           />
   </div>
    <button 
    type="submit" 
    className="hover:bg-slate-950/60  text-xl px-4 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black flex items-center justify-center ">
     <Plus className="size-5"/> Adicionar</button>
 </form>

 <div className=" flex gap-3 justify-center ">
   <textarea 
     className="w-[650px] h-96 rounded-md p-5 outline-none shadow-lg border-2 shadow-sky-950 bg-slate-300"

     value={textUser}
     onChange={(e)=> setTextUser(e.target.value)}
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