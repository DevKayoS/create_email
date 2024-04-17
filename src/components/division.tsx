import { Link } from "react-router-dom";

export function Division(){
  return(
    <div className=" justify-end flex-col  flex items-end gap-5">
      <Link
        className="flex items-center gap-2 hover:bg-slate-950/60 text-md max-w-80 px-10 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black" 
        title="home" 
        to={"/"}
        >Criar Email
        </Link>
        <Link
        className="flex items-center gap-2 hover:bg-slate-950/60 text-md max-w-80 px-8 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black" 
        title="home" 
        to={"/createuser"}
        >Criar usuário
        </Link>
    </div>
  )
}