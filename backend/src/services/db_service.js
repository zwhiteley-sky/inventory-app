const { User, Product, Order, Category } = require("../models");

class DbUserService {
  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  async getUser(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async createUser(user) {
    await User.create(user);
  }
}

class DbProductService {}
class DbOrderService {}
class DbCategoryService {}

module.exports = {
  DbUserService,
  DbProductService,
  DbOrderService,
  DbCategoryService,
};
