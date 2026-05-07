# API de Gerenciamento de Produtos e Categorias

API RESTful com 2 CRUDs (Categorias e Produtos) utilizando TypeORM, Express.js e Node.js.

## 📦 Dependências

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "typeorm": "^0.3.12",
    "reflect-metadata": "^0.1.13",
    "sqlite3": "^5.1.6",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.3.1",
    "typescript": "^5.1.3",
    "ts-node": "^10.9.1"
  }
}
```

## 🚀 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Compilar TypeScript
npm run build

# Rodar versão compilada
npm start
```

API disponível em: `http://localhost:3000`

## 📚 Estrutura do Projeto

```
src/
├── model/              # Entidades (Categoria, Produto)
├── repository/         # Camada de dados (TypeORM)
├── service/            # Lógica de negócio
├── controller/         # Controladores HTTP
├── router/             # Definição de rotas
└── app.ts              # Arquivo principal
```

## 🎯 Funcionalidades

- ✅ CRUD de Categorias
- ✅ CRUD de Produtos
- ✅ Relacionamento Many-to-One (Produto ← Categoria)
- ✅ Listar produtos por categoria
- ✅ Validações de negócio
- ✅ Status HTTP corretos
- ✅ Persistência em SQLite
