import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { Categoria } from './model/Categoria';
import { Produto } from './model/Produto';
import { CategoriaRepository } from './repository/CategoriaRepository';
import { ProdutoRepository } from './repository/ProdutoRepository';
import { CategoriaService } from './service/CategoriaService';
import { ProdutoService } from './service/ProdutoService';
import { CategoriaController } from './controller/CategoriaController';
import { ProdutoController } from './controller/ProdutoController';
import { createCategoriaRouter } from './router/categoriaRouter';
import { createProdutoRouter } from './router/produtoRouter';

// Configuração do DataSource (banco de dados)
const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Categoria, Produto],
  migrations: [],
  subscribers: [],
});

// Inicialização da aplicação
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas de saúde
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API está funcionando corretamente!' });
});

// Inicializar banco de dados e rotas
appDataSource
  .initialize()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    // Instanciar repositories
    const categoriaRepository = new CategoriaRepository(appDataSource);
    const produtoRepository = new ProdutoRepository(appDataSource);

    // Instanciar services
    const categoriaService = new CategoriaService(categoriaRepository);
    const produtoService = new ProdutoService(produtoRepository, categoriaService);

    // Instanciar controllers
    const categoriaController = new CategoriaController(categoriaService);
    const produtoController = new ProdutoController(produtoService);

    // Configurar rotas
    app.use('/api/categorias', createCategoriaRouter(categoriaController));
    app.use('/api/produtos', createProdutoRouter(produtoController));

    // Rota raiz
    app.get('/', (req, res) => {
      res.status(200).json({
        message: 'API de Gerenciamento de Produtos e Categorias',
        version: '1.0.0',
        endpoints: {
          health: 'GET /api/health',
          categorias: {
            listar: 'GET /api/categorias',
            obter: 'GET /api/categorias/:id',
            criar: 'POST /api/categorias',
            atualizar: 'PUT /api/categorias/:id',
            deletar: 'DELETE /api/categorias/:id',
          },
          produtos: {
            listar: 'GET /api/produtos',
            obter: 'GET /api/produtos/:id',
            porCategoria: 'GET /api/produtos/categoria/:categoriaId',
            criar: 'POST /api/produtos',
            atualizar: 'PUT /api/produtos/:id',
            deletar: 'DELETE /api/produtos/:id',
          },
        },
      });
    });

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  });

export default app;
