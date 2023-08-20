# Desenvolvimento do Projeto

### Dar a oportunidade para o aluno aprender a mesma materia em niveis diferentes

**Do lado admin (professor)**:
- Teremos uma base de conteudos que sera persistida por um professor da escola.
  - Ele deve inserir um topico, uma matéria e um texto contendo a explicacao;
  - A aplicação irá retornar o mesmo conteúdo explicado de 2 formas diferentes:
    - Explicação para leigos, o mais simples possivel;
    - Explicação extendida, elaborando melhor os temas do conteudo;
    - E insere na base;
  - O professor valida as versões:
    - Se tiver válido o conteúdo atualiza o status para `approved`;
    - Se nao tiver valido o conteúdo atualiza o status para `rejected`;
  - O professor pode pedir para gerar novas respostas, ou sobrescrever o conteudo base para ter respostas diferentes

**Do lado cliente (aluno)**:
  - Escolher qual matéria e tópico acessar;
  - Exibir o conteudo aprovado pelo professor;


### [Decisões Técnicas](https://github.com/dev-cruz/edu-genius/tree/main/docs/techDecisions.md)

**Features futuras**:
- Buscar o conteúdo por embeddings;
- Implementar as questões;
- Colocar senha para o professor;
- Cadastrar um subject novo;
- Front fazer request pro s3 exibir o texto ao inves de enviar o texto pro front;

Teremos uma base de dados para:
**Teacher**
  - name
  - email

**Subject** - A matéria/topico, apontando para qual outra materia/topico pertence;
  - name;
  - parent_id;

**Content** - Material Base cadastrado pelo professor
  - subject_id;
  - content; (path para o arquivo)

**ContentResult** - Material gerado pela aplicação
  - content_id;
  - content; (path para o arquivo)
  - level (simplefied | expanded);


## Rotas
Para o professor:
`/register_teacher`
```
request: {
  "name": "Teacher",
  "email": "email@email.com"
}
response: {
  "id": 1,
  "name": "Teacher",
  "email": "email@email.com"
}
```

`/create_content`
```
request: {
  subject_id: 1,
  title: "algebra"
  content: "Matematica eh bem legal"
}
response: {
  contentsResults: [
    {
      id: 1,
      content_id: 1,
      content: "Matematica eh bem legal",
      level: "crianca",
      status: "pending"
    },
    {
      id: 2,
      content_id: 1,
      content: "Matematica eh bem legal",
      level: "ponto de vista",
      status: "pending"
    }
  ]
}
```

`/submit_content_review`
```
request: {
  content_result_id: 1,
  status: "approved|rejected"
}
response: ok
```

## Para o aluno:
`/get_contents_by_subject/:id`
```
response: {
  originalContent: {
    id: 1,
    content: "Matematica eh bem legal"
  },
  contentsResults: [
    {
      id: 1,
      content: "Matematica eh bem legal",
      level: "crianca",
    },
    {
      id: 2,
      content: "Matematica eh bem legal",
      level: "ponto de vista",
    }
  ]
}
```

`/list_subjects`
```
response: {
  subjects: [
    {
      id: 1,
      name: "Matemática",
      parent_id: null,
      children: [
        {
          id: 2,
          name: "Álgebra",
          parent_id: 1,
          children: [
            {
              id: 3,
              name: "Álgebra Linear",
              parent_id: 2,
              children: []
            }
          ]
        }
      ]
    }
    ...
  ]
}
```