"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
let lista = [];
// cadastrando produto
app.post("/cadastrando", (req, res) => {
    const { productName, productDescription, productCategory, productCost, productTags, productRelated, } = req.body;
    if (!productName ||
        !productDescription ||
        !productCategory ||
        !productCost ||
        !productTags ||
        !productRelated) {
        return res
            .status(400)
            .json({ error: "Erro no cadastro. Todos os campos são obrigatórios." });
    }
    const newProduct = {
        id: (0, uuid_1.v4)(),
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
    const { productName, productDescription, productCategory, productCost, productTags, productRelated, } = req.body;
    const productIndex = lista.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ error: "Produto não encontrado." });
    }
    lista[productIndex] = Object.assign(Object.assign({}, lista[productIndex]), { productName,
        productDescription,
        productCategory,
        productCost,
        productTags,
        productRelated });
    res.json(lista[productIndex]);
});
app.listen(3000, () => {
    console.log("SERVER RUN:3000");
});
