1. Status Codes

Os cinco status codes HTTP mais comuns em APIs REST são o 200 OK, 201 Created, 400 Bad Request, 
404 Not Found e 500 Internal Server Error. O código 200 OK indica que uma requisição foi realizada 
com sucesso, como quando fazemos um GET para listar as músicas. O 201 Created indica que um novo recurso 
foi criado com sucesso, como ao cadastrar uma nova música usando POST. O 400 Bad Request indica que a 
requisição possui algum dado inválido ou obrigatório faltando, como tentar criar uma música sem informar 
o nome ou o artista. O 404 Not Found indica que o recurso solicitado não foi encontrado, como procurar 
uma música com um ID que não existe. Já o 500 Internal Server Error indica que ocorreu algum erro interno 
inesperado no servidor durante o processamento da requisição. Esses são os códigos utilizados como referência 
na atividade.

2. Content-Type

O Content-Type é um cabeçalho da resposta HTTP que informa ao cliente qual é o formato dos dados que 
o servidor está enviando. Quando usamos Content-Type: application/json, significa que a resposta está no 
formato JSON, que é o formato normalmente utilizado pelas APIs para enviar dados. Já o Content-Type: text/html 
indica que a resposta contém HTML, que pode ser interpretado e exibido pelo navegador. Essa informação é 
importante porque o cliente, como um navegador ou o REST Client, precisa saber como interpretar corretamente 
os dados recebidos. No Express, quando utilizamos res.json(), o Content-Type é definido automaticamente como 
application/json. Quando utilizamos res.send() enviando uma string HTML, o Express define o tipo de conteúdo 
correspondente.

3. DAO e Persistência

DAO significa Data Access Object, ou Objeto de Acesso a Dados. Ele é um padrão utilizado para separar a 
lógica de acesso e manipulação dos dados da lógica das rotas. No nosso projeto, em vez de as rotas acessarem 
diretamente o array de músicas, elas utilizam os métodos do musicaDAO, como listar, buscar, inserir, atualizar 
e remover músicas. Isso resolve o problema de deixar as rotas diretamente dependentes da forma como os dados 
estão armazenados. Assim, futuramente podemos trocar o array em memória por um arquivo ou por um banco de dados 
sem precisar modificar todas as rotas da aplicação. Atualmente, os dados são armazenados em um array na memória, 
então quando o servidor é reiniciado, os dados adicionados durante a execução são perdidos. Para que os dados 
sobrevivam a uma reinicialização, seria necessário modificar a implementação do DAO para utilizar uma forma de 
persistência permanente, como um arquivo ou um banco de dados. O próprio enunciado cita que futuramente será 
utilizado Supabase/PostgreSQL.

4. Singleton

No musicaDAO.js, exportamos uma única instância da classe usando new MusicaDAO(). Isso faz com que os arquivos 
que importarem o DAO compartilhem a mesma instância e, consequentemente, o mesmo array de músicas. Se exportássemos 
apenas a classe e cada arquivo criasse seu próprio new MusicaDAO(), cada instância teria seu próprio array de músicas. 
Dessa forma, uma rota poderia adicionar ou alterar uma música em um array enquanto outra rota estaria trabalhando com 
outro array diferente. Isso faria com que os dados não fossem compartilhados corretamente entre as partes da aplicação. 
or isso, a atividade utiliza uma única instância do DAO, seguindo o padrão Singleton.

5. PUT vs POST

O método POST é utilizado principalmente para criar um novo recurso. No nosso projeto, usamos POST /api/musicas para 
cadastrar uma nova música. Já o método PUT é utilizado para atualizar um recurso existente. No trabalho, usamos
PUT /api/musicas/:id para alterar o nome e o artista de uma música específica. Se quisermos alterar apenas uma 
parte do recurso, como somente o artista de uma música sem enviar o nome novamente, o método mais adequado seria 
o PATCH, pois ele é utilizado para realizar alterações parciais em um recurso. Portanto, de forma resumida, 
o POST é utilizado para criar, o PUT para atualizar o recurso e o PATCH para fazer uma alteração parcial.