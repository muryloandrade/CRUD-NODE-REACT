# Aplicação em ReactJS para gerenciamento de funcionários

Aplicação em ReactJS para gerenciamento de funcionários
Este projeto é uma aplicação web em ReactJS que utiliza as bibliotecas Material UI e Formik para gerenciar informações de funcionários, permitindo a visualização, criação, edição e remoção de dados dos mesmos.

## Instalação e Execução


Antes de tudo, se deseja executar somente o front-end, siga os passo abaixo, se não desconsidere:

```
cd client/
```

é necessário instalar as dependências do projeto utilizando o gerenciador de pacotes npm. Na pasta raiz do projeto, execute o seguinte comando no terminal:

```
npm install
```

Para executar a aplicação, utilize o seguinte comando:

```
npm start
```

## UX

No quesito UX coloquei por padrão o acesso rápido, assim o usuário consegue o que ele deseja em até 2 cliques.
Também Optei por utilizar uma paleta com cores únicas não buscando variaar muito para trazer mais "conforto" pro usuário.
Optei por demonstrar ao usuário algo mais intuitivo, utilizando ícones em algumas áreas ao invés de texto, isso não se aplica quando o Administrador precisa ver as informações.

## Funcionalidades

A aplicação possui as seguintes funcionalidades:

### Listagem de funcionários

Na Página inicial temos a listagem de Usuários, Caso não tenha nenhum ele exibe um aviso e um botão para criar

### Edição de Funcionários

Você consegue fazer a edição desses usuários através de um modal, para abrir o modal, basta clicar no botão do lápis.

### Deleção

Ao lado do botão de edição, existe o botão de deleção, que seguindo as orientações, fiz a deleção Lógica, essa qual que posso recuperar o usuário caso deseje.

### Criação

A aplicação também trás a disponibilidade de Criar Usuários seguindo o mesmo padrão de informações da edição.

### Páginas

Fiz duas rotas, uma para o CRUD dos usuários e outra para a lixeira, trazendo a idéia de deleção lógica, a tabela é bem parecida mas traz somente informações mais cruciais para tomada de decisão se aquele usuário deve ser revertido para os demais ou excluído de vez, em "ações" o botão azul é responsável por reverter e o amarelo para apagar pra sempre

## Pré-requisitos

Antes de começar, verifique se você possui os seguintes requisitos:

- NodeJS instalado
- Sistema operacional compatível (Linux, Windows, etc)
- Atenção se o código apresentar alguns erros se atente a olhar o eslint, pois está configurado para o linux(unix) Ex:
```
 "rules": {
        ...
        "linebreak-style": [
            "error",
            "unix"
        ],
 }
```

## Integração com a API

Para integrar o frontend com a API, foram utilizados os métodos HTTP GET, POST, PUT e DELETE para buscar, criar, atualizar e remover os dados dos funcionários, respectivamente. A comunicação com a API foi implementada utilizando a biblioteca axios.