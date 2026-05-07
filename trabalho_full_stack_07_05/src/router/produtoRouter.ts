import { Router } from 'express';
import { ProdutoController } from '../controller/ProdutoController';

export function createProdutoRouter(produtoController: ProdutoController): Router {
  const router = Router();

  router.get('/', (req, res) => produtoController.getAllProdutos(req, res));
  router.get('/categoria/:categoriaId', (req, res) => produtoController.getProdutosByCategoria(req, res));
  router.get('/:id', (req, res) => produtoController.getProdutoById(req, res));
  router.post('/', (req, res) => produtoController.createProduto(req, res));
  router.put('/:id', (req, res) => produtoController.updateProduto(req, res));
  router.delete('/:id', (req, res) => produtoController.deleteProduto(req, res));

  return router;
}
