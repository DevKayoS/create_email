import {Lightbulb} from 'lucide-react'
import { Division } from './division'

export function Header(){
  return (
    <div className="w-full h-16 text-slate-200 flex  items-center justify-between ">
      <h1 className="text-2xl flex items-center ml-2 hover:text-sky-400"> < Lightbulb className='size-12'/> grupoAMP</h1>
      <Division/>
    </div>
  )
}