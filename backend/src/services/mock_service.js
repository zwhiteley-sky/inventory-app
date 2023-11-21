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
    const product = memory.products[id];

    if (product === undefined) {
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

class TestOrderService {}

class TestCategoryService {}
