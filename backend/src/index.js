const { createApp } = require("./app");
const {
  UserRepo,
  ProductRepo,
  CategoryRepo,
  OrderRepo
} = require("./repos/db_repos");

const userRepo = new UserRepo();
const productRepo = new ProductRepo();
const categoryRepo = new CategoryRepo();
const orderRepo = new OrderRepo();

const app = createApp({
  userRepo,
  productRepo,
  categoryRepo,
  orderRepo
});
app.listen(4000);