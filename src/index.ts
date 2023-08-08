import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(bodyParser.json());

interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productCategory: string;
  productCost: number;
  productTags: string[];
  productRelated: string[];
}

let lista: Product[] = [];

// cadastrando produto
app.post("/cadastrando", (req: Request, res: Response) => {
  const {
    productName,
    productDescription,
    productCategory,
    productCost,
    productTags,
    productRelated,
  } = req.body as Product;

  if (
    !productName ||
    !productDescription ||
    !productCategory ||
    !productCost ||
    !productTags ||
    !productRelated
  ) {
    return res
      .status(400)
      .json({ error: "Erro no cadastro. Todos os campos são obrigatórios." });
  }

  const newProduct: Product = {
    id: uuidv4(),
    productName,
    productDescription,
    productCategory,
    productCost,
    productTags,
    productRelated,
  };
  lista.push(newProduct);
  res.json(newProduct);
});

// listando produtos
app.get("/listadeprodutos", (req: Request, res: Response) => {
  res.json(lista);
});

// buscar produto por ID
app.get("/buscarproduto/:id", (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = lista.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Produto não encontrado." });
  }

  res.json(product);
});

// atualizar produto por ID
app.put("/atualizarproduto/:id", (req: Request, res: Response) => {
  const productId = req.params.id;
  const {
    productName,
    productDescription,
    productCategory,
    productCost,
    productTags,
    productRelated,
  } = req.body as Product;

  const productIndex = lista.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Produto não encontrado." });
  }

  lista[productIndex] = {
    ...lista[productIndex],
    productName,
    productDescription,
    productCategory,
    productCost,
    productTags,
    productRelated,
  };

  res.json(lista[productIndex]);
});

app.listen(3000, () => {
  console.log("SERVER RUN:3000");
});
