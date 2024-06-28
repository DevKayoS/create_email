export function gerarSenhaAleatoria() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|<>?';
  
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