
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

app.use(bodyParser.json());

let lista = [];

// cadastrando produto
app.post("/cadastrando", (req, res) => {
  const {
    productName,
    productDescription,
    productCategory,
    productCost,
    productTags,
    productRelated,
  } = req.body;

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

  const newProduct = {
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
app.get("/listadeprodutos", (req, res) => {
  res.json(lista);
});

// buscar produto por ID
app.get("/buscarproduto/:id", (req, res) => {
  const productId = req.params.id;
  const product = lista.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Produto não encontrado." });
  }

  res.json(product);
});

// atualizar produto por ID
app.put("/atualizarproduto/:id", (req, res) => {
  const productId = req.params.id;
  const {
    productName,
    productDescription,
    productCategory,
    productCost,
    productTags,
    productRelated,
  } = req.body;

  const productIndex = lista.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Produto não encontrado." });
  }

  const updatedProduct = {
    ...lista[productIndex],
    productName,
    productDescription,
    productCategory,
    productCost,
    productTags,
    productRelated,
  };

  lista[productIndex] = updatedProduct;

  res.json(updatedProduct);
});

app.listen(3000, () => {
  console.log("SERVER RUN:3000");
});
