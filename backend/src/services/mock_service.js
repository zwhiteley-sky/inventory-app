let memory = {
  users: [],
  categories: [],
  products: [],
  orders: [],
};

async function refresh() {
    memory = {
        users: [],
        categories: [],
        products: [],
        orders: []
    };
}

class TestUserService {
  async getAllUsers() {
    return memory.users;
  }

  async getUser(id) {
    return memory.users[id] ?? null;
  }

  async createUser(user) {
    user.id = memory.users.length;
    memory.users.push(user);
    return user;
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
      category: memory.categories[product.categoryId],
    };
  }

  async createProduct(product) {
    // Check category exists
    if (!memory.categories[product.categoryId]) return null;

    product.id = memory.products.length;
    memory.products.push(product);
    return product;
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
          user: {
            id: memory.users[order.userId].id,
            username: memory.users[order.userId].username,
            fullName: memory.users[order.userId].fullName,
          },
        };
      });
  }

  async getOrder(id) {
    const order = memory.orders[id];

    if (order === undefined) return null;

    return {
      ...order,
      product: memory.products[order.productId],
      user: {
        id: memory.users[order.userId].id,
        username: memory.users[order.userId].username,
        fullName: memory.users[order.userId].fullName,
      },
    };
  }

  async createOrder(order) {
    // Error checking
    if (!memory.users[order.userId]) return "user-not-exists";
    if (!memory.products[order.productId]) return "product-not-exists";

    order.id = memory.orders.length;
    memory.orders.push(order);
    return order;
  }
}

class TestCategoryService {
  async getAllCategories() {
    const categories = memory.categories;
    return categories;
  }

  async createCategory(category) {
    category.id = memory.categories.length;
    memory.categories.push(category);
    return category;
  }
}

// Export the database service classes
module.exports = {
  TestUserService,
  TestCategoryService,
  TestOrderService,
  TestProductService,
  refresh: process.env.NODE_ENV === "test" ? refresh : undefined
};
