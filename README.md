# Criador de email em lote

![image](https://github.com/DevKayoS/create_email/assets/157029608/9d512a5e-8ec2-420c-ab60-7145173d87e2)

###

Esse projeto foi feito pensando na demora na criação de emails para novos colaboradores da empresa onde trabalho, mensalmente entram novos colaboradores para a empresa e o meu setor que é o TI de infraestrutura, tem que criar emails para esses novos colaboradores, porém o site onde fazemos isso demora muito para criar um por um, entretanto existe uma função onde podemos adicionar um excel em .csv, então pensando nisso fiz esse site onde podemos adicioanr o nome e o sobrenome da colaboradora e assim automaticamente ja vai ser criado o que devemos copiar e colar no site de criação o que vai otimizar muito o processo. Além disso, gera uma senha aleatória automaticamente ao criar um email.


## Projeto atualizado: 

Agora ao adicionar um novo email, os dados dessa informação vão para uma planilha de controle de emails, fazendo assim um automação no projeto bem bacana.

Isso é possível, pois eu criei uma api para fazer essa automação conectando numa planilha do google, foi usando a própria documentação do google API que eu consegui desenvolver essa api.


### Criar usuários:

![image](https://github.com/DevKayoS/create_email/assets/157029608/e53ccd3f-3535-4efd-bc35-f939f446bf22)

Essa acima é a rota de criação de usuários, que é mais uma das automações do projeto, porém ainda está sendo implementado e está em fase de testes ainda. Enfim, mas o que essa página faz?
Basicamente ela forma o nome, sobrenome e o Cpf para fazer uma formatação, pois seguimos um padrão na criação de novos usuários, por isso é necessário o cpf, uma vez que utilizamos ele para criar a senha.

O texto que fica no textarea é uma auxilio para os colaboradores do ti de infraestrutura, colocar no chamado de criação de perfil.

### tecnologias de desenvolvimento:
  * React;
  * typescript;
  * Node.js;
  * Google API;
  * React-router-dom;

### ferramentas para Deploy:
  * Vercel;
  * Render;
