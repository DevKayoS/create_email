import { toast } from "sonner";

export function copy(text: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log(text);
        toast.success('Copiado com sucesso!');
      })
      .catch(err => {
        console.error("Erro ao copiar o texto: ", err);
        toast.error('Erro ao copiar o texto!');
      });
  } else {
    // Fallback para document.execCommand
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // Evita que o elemento seja visível
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      console.log(text);
      toast.success('Copiado com sucesso!');
    } catch (err) {
      console.error("Erro ao copiar o texto: ", err);
      toast.error('Erro ao copiar o texto!');
    } finally {
      document.body.removeChild(textArea);
    }
  }
}
