const Products = require("./products");

// make sure, the fuction declaration should be the normal function declaration
// Don't use the ES6 const to declare the fun, it will throw error,
// ReferenceError: Cannot access 'listProducts' before initialization
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  try {
    res.json(
      await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag,
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getProduct(req, res, next) {
  const { id } = req.params;
  try {
    const filterProduct = await Products.get(id);
    if (!filterProduct) return next();
    res.json(filterProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createProduct(req, res) {
  console.log(" req, ", req.body);
  res.json(req.body);
}

async function editProduct(req, res, next) {
  res.json(req.body);
}

async function deleteProduct(req, res, next) {
  res.json({ success: true });
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
