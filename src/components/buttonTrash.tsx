import { Trash2Icon } from "lucide-react";

interface ButtonTrashProps{
  onClick: ()=> void
}

export function ButtonTrash({onClick}: ButtonTrashProps){
  return(
    <button 
        onClick={onClick}
        className="flex items-center gap-2 hover:bg-slate-950/60 text-2xl px-4 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black">
        <Trash2Icon/>
    </button>
  )
}