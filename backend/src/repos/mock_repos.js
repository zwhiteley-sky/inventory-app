const { notFoundError } = require("./base");

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
    orders: [],
  };
}

class TestUserRepo {
  async getAll() {
    return memory.users;
  }

  async get(id) {
    return memory.users[id] ?? null;
  }

  async findByEmail(emailAddress) {
    const user = memory.users.find(
      (user) => user.emailAddress === emailAddress
    );
    return user ?? null;
  }

  async create(user) {
    user.id = memory.users.length;
    memory.users.push(user);
    return user;
  }
}

class TestProductRepo {
  async getAll() {
    return memory.products
      .filter((product) => product !== undefined)
      .map((product) => {
        return {
          ...product,
          category: memory.categories[product.categoryId],
        };
      });
  }

  async get(id) {
    const product = memory.products[id];

    if (product === undefined) return null;

    return {
      ...product,
      category: memory.categories[product.categoryId],
    };
  }

  async create(product) {
    // Check category exists
    if (!memory.categories[product.categoryId])
      return notFoundError("category");

    product.id = memory.products.length;
    memory.products.push(product);
    return product;
  }

  async update(id, product) {
    const currentProduct = memory.products[id];

    if (currentProduct === undefined) {
      return notFoundError("product");
    }
    if (!memory.categories[product.categoryId]) {
      return notFoundError("category");
    }

    product.id = id;
    memory.products[id] = product;
    return product;
  }

  async delete(id) {
    if (memory.products[id] === undefined) return notFoundError("product");
    memory.products[id] = undefined;
    return null;
  }
}

class TestOrderRepo {
  async getAll() {
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

  async get(id) {
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

  async create(order) {
    // Error checking
    if (!memory.users[order.userId]) return notFoundError("user");
    if (!memory.products[order.productId]) return notFoundError("product");

    order.id = memory.orders.length;
    memory.orders.push(order);
    return order;
  }
}

class TestCategoryRepo {
  async getAll() {
    const categories = memory.categories;
    return categories;
  }

  async create(category) {
    category.id = memory.categories.length;
    memory.categories.push(category);
    return category;
  }
}

// Export the database service classes
module.exports = {
  UserRepo: TestUserRepo,
  CategoryRepo: TestCategoryRepo,
  OrderRepo: TestOrderRepo,
  ProductRepo: TestProductRepo,
  refresh: process.env.NODE_ENV === "test" ? refresh : undefined,
};
