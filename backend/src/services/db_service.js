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
    const newUser = await User.create(user);
    return newUser;
  }
}
// DbCategoryService - Manages interactions with the Product table in the database
class DbProductService {
  async getAllProducts() {
    // Fetches all products and includes category information for each product
    const products = await Product.findAll({
      include: Category
    });
    return products;
  } 
  // Retrieves a specific product by its ID along with its category
  async getProduct(id) {
    const product = await Product.findByPk(id, {
      include: Category 
    });
    return product;
  }

  // Adds a new product to the Product table
  async createProduct(product) {
    return await Product.create(product);
  }

  // Modifies an existing product in the Product table
  async updateProduct(id, product) {

    const updatedProduct = await Product.update(product, {
      where: { id },
    });

    // Check if the product existed in the database
    if (!updatedProduct) {
      return "product-not-exist";

    }
    return updatedProduct;
  }

  // Removes a product from the Product table
  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if(!product)
      return false;
    await product.destroy();
    return true;

  }
}
// DbCategoryService - Manages interactions with the Category table in the database
class DbOrderService {
// Fetches all orders and includes information about the associated product and user
  async getAllOrders() {
    const orders = await Order.findAll({
      include: [
        { model: Product, },
        { model: User, attributes:["id", "username", "fullName"] },
      ],
    });
    return orders;
  }

  // Retrieves a specific order by its ID, along with details about the product and user
  async getOrder(id) {
    const order = await Order.findByPk(id, {
      include: [
        { model: Product, },
        { model: User, attributes:["id", "username", "fullName"]},
      ],
    });
    return order;
  }

  async createOrder(order){
    const newOrder = await Order.create(order);
    return newOrder;
  }
}

class DbCategoryService {
  async getAllCategories() {
    const categories = await Category.findAll();
    return categories;
  }

  async createCategory(category){
    const newCategory = await Category.create(category);
    return newCategory;

  }
}

// Export the database service classes
module.exports = {
  DbUserService,
  DbProductService,
  DbOrderService,
  DbCategoryService,
};
