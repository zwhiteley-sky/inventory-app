const memory = {
  users: [],
  categories: [],
  products: [],
  orders: [],
};

class TestUserService {
  async getAllUsers() {
    return memory.users;
  }

  async getUser(id) {
    return memory.users[id];
  }

  async createUser(user) {
    user.id = memory.users.length;
    memory.users.push(user);
  }
}

class TestProductService {
  async getAllProducts() {
    return memory.products
      .filter((product) => product !== undefined)
      .map((product) => {
        return {
          ...product,
          category: memory.categories[product.categoryId],
        };
      });
  }

  async getProduct(id) {
    const product = memory.products[id];

    if (product === undefined) return null;

    return {
      ...product,
      category: memory.categories[product.caregoryId],
    };
  }

  async createProduct(product) {
    // Check category exists
    if (memory.categories[product.categoryId]) return false;

    memory.products.push(product);
    return true;
  }

  async updateProduct(id, product) {
    const currentProduct = memory.products[id];

    if (currentProduct === undefined) {
      return "product-not-exists";
    }
    if (memory.categories[product.categoryId]) {
      return "category-not-exists";
    }

    memory.products[id] = product;
  }

  async deleteProduct(id) {
    if (memory.products[id] === undefined) return false;
    memory.products[id] = undefined;
    return true;
  }
}

class TestOrderService {

  async getAllOrders() {
    return memory.orders
      .filter((order) => order !== undefined)
      .map((order) => {
        return {
          ...order,
          product: memory.products[order.productId],
          user: {id: memory.users[order.userId].id,
            username: memory.users[order.userId].username,
            fullName: memory.users[order.userId].fullName
          }};
      });
  }
  
  async getOrder(id) {
    const order = memory.orders[id];

    if (order === undefined) return null;

    return {
      ...order,
      product: memory.products[order.productId],
      user: {id: memory.users[order.userId].id,
        username: memory.users[order.userId].username,
        fullName: memory.users[order.userId].fullName
      }};
  }
}


class TestCategoryService {
  async getAllCategories(){
    const categories = memory.categories; 
    return categories;
  }
}

module.exports = {
    TestUserService, 
    TestCategoryService, 
    TestOrderService, 
    TestProductService
};