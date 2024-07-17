import {  NavLink, useLocation } from "react-router-dom";

export function Division() {
  const location = useLocation();

  return (
    <div className="flex mr-5 items-end gap-5">
      <NavLink
        className={`flex items-center gap-2 hover:bg-slate-950/60 text-md max-w-80 px-10 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black ${
          location.pathname === "/" ? "bg-slate-950/80" : ""
        }`}
        to={"/"}
      >
        Criar novo usuário
      </NavLink>
      <NavLink
        className={`flex items-center gap-2 hover:bg-slate-950/60 text-md max-w-80 px-10 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black ${
          location.pathname === "/createEmail" ? "bg-slate-950/80" : ""
        }`}
        to={"/createEmail"}
      >
        Criar apenas email
      </NavLink>
    </div>
  );
}
