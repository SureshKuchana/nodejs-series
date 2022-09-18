const fs = require("fs").promises;
const path = require("path");
const cuid = require("cuid");

const db = require("./db");
const productsFile = path.join(__dirname, "../products.json");

const Product = db.model("Product", {
  _id: { type: String, default: cuid },
  description: String,
  imgThumb: String,
  img: String,
  userId: String,
  userName: String,
  userLink: String,
  tags: { type: [String], index: true },
});

async function list(opts = {}) {
  const { offset = 0, limit = 25, tag } = opts;

  const products = JSON.parse(await fs.readFile(productsFile));

  return products
    .filter((p, i) => !tag || p.tags.indexOf(tag) >= 0)
    .slice(offset, offset + limit);
}

async function get(_id) {
  const product = await Product.findById(_id);
  return product;
}

async function create(fields) {
  const product = await new Product(fields).save();
  return product;
}

async function edit(_id, changeBody) {
  const product = await get(_id);
  Object.keys(product).forEach((key) => {
    product[key] = changeBody[key];
  });
  await product.save();
  return product;
}

async function remove(_id) {
  const product = await Product.deleteOne({ _id });
  return product;
}

module.exports = {
  get,
  list,
  create,
  remove,
  edit,
};
