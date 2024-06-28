import axios from "axios";

export async function adicionarLinha(fullName: string, email: string, password: string) {
  try {
    const response = await axios.post("https://api-create-email.onrender.com/addRow", {
      values: [fullName, email, password]
    });

    // Verifica se a resposta foi bem-sucedida (status 200)
    if (response.status === 200) {
      console.log("Linha adicionada com sucesso:", response.data);
    } else {
      console.error("Erro ao adicionar linha:", response.statusText);
    }
  } catch (error){
    console.log(error)
  }
}