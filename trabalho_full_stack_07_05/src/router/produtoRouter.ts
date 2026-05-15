import { Router } from 'express';
import { ProdutoController } from '../controller/ProdutoController';

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             example:
 *               - id: "550e8400-e29b-41d4-a716-446655440010"
 *                 nome: "Notebook Dell"
 *                 preco: 3500.00
 *                 categoriaId: "550e8400-e29b-41d4-a716-446655440000"
 *                 descricao: "Notebook de alta performance"
 *                 estoque: 5
 *                 dataCriacao: "2026-05-14T23:00:00.000Z"
 *               - id: "660e8400-e29b-41d4-a716-446655440011"
 *                 nome: "Mouse Wireless"
 *                 preco: 89.90
 *                 categoriaId: "550e8400-e29b-41d4-a716-446655440000"
 *                 descricao: "Mouse sem fio ergonômico"
 *                 estoque: 20
 *                 dataCriacao: "2026-05-14T23:00:00.000Z"
 *       401:
 *         description: Não autorizado (token ausente ou inválido)
 *         content:
 *           application/json:
 *             example:
 *               message: "Token inválido ou expirado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               message: "Erro ao buscar produtos"
 *   post:
 *     summary: Criar novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, preco, categoriaId]
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *                 format: float
 *               categoriaId:
 *                 type: string
 *               descricao:
 *                 type: string
 *               estoque:
 *                 type: integer
 *           example:
 *             nome: "Teclado Mecânico"
 *             preco: 450.00
 *             categoriaId: "550e8400-e29b-41d4-a716-446655440000"
 *             descricao: "Teclado mecânico RGB"
 *             estoque: 10
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "770e8400-e29b-41d4-a716-446655440020"
 *               nome: "Teclado Mecânico"
 *               preco: 450.00
 *               categoriaId: "550e8400-e29b-41d4-a716-446655440000"
 *               descricao: "Teclado mecânico RGB"
 *               estoque: 10
 *               dataCriacao: "2026-05-14T23:00:00.000Z"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             examples:
 *               nomeFaltando:
 *                 value:
 *                   message: "Nome do produto é obrigatório"
 *               precoInvalido:
 *                 value:
 *                   message: "Preço deve ser maior que 0"
 *               categoriaNaoEncontrada:
 *                 value:
 *                   message: "Categoria não encontrada"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             example:
 *               message: "Token inválido ou expirado"
 *
 * /produtos/{id}:
 *   get:
 *     summary: Obter produto por ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "550e8400-e29b-41d4-a716-446655440010"
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440010"
 *               nome: "Notebook Dell"
 *               preco: 3500.00
 *               categoriaId: "550e8400-e29b-41d4-a716-446655440000"
 *               descricao: "Notebook de alta performance"
 *               estoque: 5
 *               dataCriacao: "2026-05-14T23:00:00.000Z"
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: "Produto não encontrado"
 *   put:
 *     summary: Atualizar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "550e8400-e29b-41d4-a716-446655440010"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               estoque:
 *                 type: integer
 *               categoriaId:
 *                 type: string
 *           example:
 *             nome: "Notebook Dell XPS"
 *             preco: 4200.00
 *             estoque: 3
 *             descricao: "Notebook Dell XPS 13 de alta performance"
 *     responses:
 *       200:
 *         description: Produto atualizado
 *         content:
 *           application/json:
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440010"
 *               nome: "Notebook Dell XPS"
 *               preco: 4200.00
 *               categoriaId: "550e8400-e29b-41d4-a716-446655440000"
 *               descricao: "Notebook Dell XPS 13 de alta performance"
 *               estoque: 3
 *               dataCriacao: "2026-05-14T23:00:00.000Z"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             examples:
 *               precoInvalido:
 *                 value:
 *                   message: "Preço deve ser maior que 0"
 *               categoriaNaoEncontrada:
 *                 value:
 *                   message: "Categoria não encontrada"
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *   delete:
 *     summary: Deletar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "550e8400-e29b-41d4-a716-446655440010"
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: "Produto não encontrado"
 *
 * /produtos/categoria/{categoriaId}:
 *   get:
 *     summary: Listar produtos por categoria
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoriaId
 *         schema:
 *           type: string
 *         required: true
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Produtos da categoria
 *         content:
 *           application/json:
 *             example:
 *               - id: "550e8400-e29b-41d4-a716-446655440010"
 *                 nome: "Notebook Dell"
 *                 preco: 3500.00
 *                 categoriaId: "550e8400-e29b-41d4-a716-446655440000"
 *                 descricao: "Notebook de alta performance"
 *                 estoque: 5
 *                 dataCriacao: "2026-05-14T23:00:00.000Z"
 *               - id: "660e8400-e29b-41d4-a716-446655440011"
 *                 nome: "Mouse Wireless"
 *                 preco: 89.90
 *                 categoriaId: "550e8400-e29b-41d4-a716-446655440000"
 *                 descricao: "Mouse sem fio ergonômico"
 *                 estoque: 20
 *                 dataCriacao: "2026-05-14T23:00:00.000Z"
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             example:
 *               message: "Categoria não encontrada"
 */
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
