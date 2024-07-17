import { Plus } from "lucide-react";
import { Toaster, toast } from "sonner";
import { ButtonCopy } from "../components/ButtonCopy";
import { ButtonTrash } from "../components/buttonTrash";
import { useState,  useEffect } from "react";
import axios from "axios";
import { adicionarLinha } from "../helpers/addNewRow";
import { gerarSenhaAleatoria } from "../helpers/generateRandomPassword";
import {copy} from '../helpers/copy'
import Select, { SingleValue } from 'react-select'
import  {Store} from '../helpers/storeList'
import { formatInput } from "../helpers/formatInput";

export function CreateUser(){
  // criando os estados
  const [fullName, setFullName] = useState("")
  const [name, setName] = useState("") //estado do nome
  const [lastname, setLastname] = useState("") //estado sobrenome
  const [cpf, setCpf] = useState("") //estado do cpf
  const [textUser, setTextUser] = useState(localStorage.getItem("textUser") || "") //estado para salvar o texto
  const [textEmail, setTextEmail] = useState(localStorage.getItem("textEmail") || "")
  const [path, setPath] = useState<string | null>(null)

  
  //usando o useEffect para que só haja alteração quando o text for alterado
  useEffect(()=>{
    localStorage.setItem("textUser", textUser)
    localStorage.setItem("textEmail", textEmail)
  }, [textUser, textEmail])

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

    const senhaAleatoria = gerarSenhaAleatoria();
    
    
    const formatedName = formatInput(name)
    const formatedLastname = formatInput(lastname)
    
    const email = formatInput(`${name.toLocaleLowerCase()}-${lastname.toLocaleLowerCase()}@grupoamp.com.br`)
    const password = formatPassword(formatedName, formatedLastname, cpf);
    const newText = `${formatedName};${formatedLastname};${name.toLocaleLowerCase()}-${lastname.toLocaleLowerCase()}@grupoamp.com.br;${senhaAleatoria};exchange/basic5gb`
    
    const formData = {
      username: `${formatedName} ${formatedLastname}`,
      password: formatInput(password),
      firstName: formatedName,
      lastName: formatedLastname,
      email: email,
      ou: path,
    };

    console.log(formData)

    try {
      const response = await axios.post('http://192.168.2.61:3000/createUser', formData);
      console.log('User created successfully:', response.data);
      toast.success('Usuário criado no AD com sucesso', {
        description: `${formData.username} foi criado com sucesso`
      });
      if(response){
        adicionarLinha(fullName.toUpperCase(), email, senhaAleatoria)
      }
      
      setTextUser((prevText) =>
        prevText ? `${prevText}\nusuário: ${name.toLowerCase()}-${lastname.toLowerCase()}\nemail: ${name.toLocaleLowerCase()}-${lastname.toLocaleLowerCase()}@grupoamp.com.br\nsenha: ${password}\nramal: (em desenvolvimento)\n ______________` : `usuário: ${name.toLowerCase()}-${lastname.toLowerCase()}\nemail: ${name.toLocaleLowerCase()}-${lastname.toLocaleLowerCase()}@grupoamp.com.br\nsenha: ${password}\nramal: (em desenvolvimento)\n ______________`
      );
     setTextEmail((prevText) => prevText ? `${prevText}\n${newText}` : newText)
      setFullName('')
      setName('');
      setLastname('');
      setCpf('');
      setPath(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error.message);
      toast.error(`Erro ao criar o usuário ${formData.username}`,{
        description:  error.message
      });
    }
  };

function handleDeleteUser(){
  setTextUser('')
  toast.error('Texto apagado com sucesso!')
}
function handleDeleteEmail(){
  setTextEmail('')
  toast.error('Texto apagado com sucesso!')
}
// criando uma lista para o select
const options = Store.map((store) => ({ value: store, label: store }));


type OptionType = {
  value: string,
  label: string
}
function handleChange(selectedOption: SingleValue<OptionType>){
  setPath(selectedOption ? selectedOption.value : null);
}


  return(
    <div className="flex  justify-center gap-10 items-center mt-12">
    <form onSubmit={addUserHandler} 
    className="bg-slate-400/25 rounded-md w-96 flex flex-col items-center justify-center p-6  shadow-xl shadow-black space-y-10 ">
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
            <input 
           type="text" 
           placeholder="CPF" 
           className="rounded-md py-2 border-b-2 border-black outline-none px-2" 
           value={cpf}
           onChange={(e)=> setCpf(e.target.value)}
           />

          <Select 
            defaultValue={path ? {value: path, label: path}: null} 
            onChange={handleChange} 
            options={options} 
          />
   </div>
    <button 
    type="submit" 
    className="hover:bg-sky-600 text-xl px-4 py-2 bg-slate-950/30 rounded-lg font-medium text-slate-50/80 shadow-md shadow-black flex items-center justify-center ">
     <Plus className="size-5"/> Adicionar</button>
 </form>

 <div className=" flex flex-col gap-3 justify-center ">
  <div className="flex gap-3">
    <div>
      <h1 className="text-2xl text-slate-50 font-medium ">Criar Usuário:</h1>
    <textarea 
      className="w-[650px] h-96 rounded-md p-5 outline-none sshadow-xl border-2 shadow-black bg-slate-300"

      value={textUser}
      onChange={(e)=> setTextUser(e.target.value)}
    ></textarea>
    </div>
   <div className="p-2 mt-5">
     <Toaster richColors/>
       <ButtonTrash onClick={handleDeleteUser}/>
       <ButtonCopy onClick={()=> copy(textUser)}/>
   </div>
  </div>
  <div className="flex gap-3">
    <div>
      <h1 className="text-2xl text-slate-50 font-medium ">Criar email:</h1>
    <textarea 
      className="w-[650px] h-96 rounded-md p-5 outline-none shadow-xl border-2 shadow-black bg-slate-300"

      value={textEmail}
      onChange={(e)=> setTextEmail(e.target.value)}
    ></textarea>
    </div>
   <div className="p-2 mt-5">
     <Toaster richColors/>
       <ButtonTrash onClick={handleDeleteEmail}/>
       <ButtonCopy onClick={()=> copy(textEmail)}/>
   </div>
  </div>
 </div>
 </div>
  )
}