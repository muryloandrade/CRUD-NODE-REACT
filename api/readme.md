# API de Gestão de Funcionários

Esta API desenvolvida em NodeJS permite a gestão de funcionários em uma empresa.

## Funcionalidades

A API permite as seguintes funcionalidades:

- Listar todos os funcionários da empresa;
- Exibir informações sobre um funcionário cadastrado;
- Cadastrar um novo funcionário no sistema;
- Editar informações sobre um funcionário;
- Realizar deleção lógica de um funcionário.

## Informações do Funcionário

Cada funcionário cadastrado no sistema deve possuir as seguintes informações:

- ID (id)
- Nome (name)
- CPF (document)
- E-mail (email)
- Telefone (phone)
- Data de nascimento (birth_date)
- Salário (salary)
- Data de contratação (created_at)

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

## Instalação

Para instalar a API, siga estas etapas:

1. Clone o repositório:

```
git clone https://github.com/muryloandrade/Seven-INC.git
```

2. Instale as dependências:

```
npm install
```

3. Execute o servidor:
```
npm start
```

## Utilização

Para utilizar a API, utilize as seguintes rotas:

| Método | Rota               | Descrição                                                 |
|--------|--------------------|-----------------------------------------------------------|
| GET    | /employee          | Lista todos os funcionários cadastrados na empresa         |
| GET    | /employee/:id      | Exibe as informações de um funcionário cadastrado          |
| POST   | /employee          | Cadastra um novo funcionário no sistema                    |
| PUT    | /employee/:id      | Edita as informações de um funcionário cadastrado           |
| DELETE | /employee/:id      | Realiza a deleção lógica de um funcionário cadastrado       |

### Exemplo de Requisição

Para realizar uma requisição, utilize o seguinte exemplo:

```json
{
"name": "Murylo",
"document": "111.111.111-11",
"email": "murylo@exemplo.com",
"phone": "(11) 1111-1111",
"birth_date": "1990-01-01",
"salary": 5000
}
```