import { Router } from 'express';
import { CategoriaController } from '../controller/CategoriaController';

export function createCategoriaRouter(categoriaController: CategoriaController): Router {
  const router = Router();

  router.get('/', (req, res) => categoriaController.getAllCategorias(req, res));
  router.get('/:id', (req, res) => categoriaController.getCategoriaById(req, res));
  router.post('/', (req, res) => categoriaController.createCategoria(req, res));
  router.put('/:id', (req, res) => categoriaController.updateCategoria(req, res));
  router.delete('/:id', (req, res) => categoriaController.deleteCategoria(req, res));

  return router;
}
