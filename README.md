## Edu Genius API

Esta é a API responsavel por servir a pagina [EduGenius](https://github.com/DhBarboza/frontend-edu-genius)

## Iniciando a aplicação
### Preencher Valores sensiveis
Criar um arquivo .env na raiz do projeto, e preencher com as seguintes chaves
```
  OPENAI_API_KEY=_openai_api_key_
```

### Docker
A aplicação esta configurando para funcionar com o docker, portanto basta subir o container da aplicação e ela ja estara disponivel na porta 3000
```
  docker compose up
```

### Configurando o banco de dados:
Utilizar o makefile para configuração inicial do banco
```
  make setup-db
```
Este comando irá criar o banco com as suas respectivas tabelas, e inserir os dados de materias necessários


[Desenvolvimento do Projeto](https://github.com/dev-cruz/edu-genius/tree/main/docs/development.md)
