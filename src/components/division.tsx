import {  NavLink, useLocation } from "react-router-dom";

export function Division() {
  const location = useLocation();

  return (
    <div className="flex flex-col items-end gap-5">
      <NavLink
        className={`flex items-center gap-2 hover:bg-slate-950/60 text-md max-w-80 px-10 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black ${
          location.pathname === "/" ? "bg-slate-950/60" : ""
        }`}
        to={"/"}
      >
        Criar Email
      </NavLink>
      <NavLink
        className={`flex items-center gap-2 hover:bg-slate-950/60 text-md max-w-80 px-8 py-2 bg-slate-950/30 rounded-lg text-slate-50/80 shadow-md shadow-black ${
          location.pathname === "/createuser" ? "bg-slate-950/60" : ""
        }`}
        to={"/createuser"}
      >
        Criar usuário
      </NavLink>
    </div>
  );
}
