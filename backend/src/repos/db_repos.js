const {
  Sequelize,
  sequelize,
  User,
  Product,
  Order,
  Category,
} = require("../models");
const { ForeignKeyConstraintError } = require("sequelize");
const { notFoundError } = require("./base");

if (process.env.NODE_ENV === "test") {
  const { Umzug, SequelizeStorage } = require("umzug");
  const umzug = new Umzug({
    migrations: {
      glob: `${__dirname}/../migrations/*.js`,
      resolve: ({ name, path, context }) => {
        const migration = require(path);
        return {
          // adjust the parameters Umzug will
          // pass to migration methods when called
          name,
          up: async () => migration.up(context, Sequelize),
          down: async () => migration.down(context, Sequelize),
        };
      },
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
  });

  refresh = async function () {
    await umzug.down({ to: 0 });
    await umzug.up({ steps: 1 });
  };
}

class DbUserRepo {
  async getAll() {
    const users = await User.findAll();
    return users;
  }

  async get(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async findByEmail(emailAddress) {
    const user = await User.findOne({
      where: { emailAddress }
    });
    return user;
  }

  async create(user) {
    const newUser = await User.create(user);
    return newUser;
  }
}
// DbCategoryService - Manages interactions with the Product table in the database
class DbProductRepo {
  async getAll() {
    // Fetches all products and includes category information for each product
    const products = await Product.findAll({
      include: Category,
    });
    return products;
  }

  // Retrieves a specific product by its ID along with its category
  async get(id) {
    const product = await Product.findByPk(id, {
      include: Category,
    });
    return product;
  }

  // Adds a new product to the Product table
  async create(product) {
    try {
      return await Product.create(product);
    } catch (e) {
      // If the foreign key is invalid (i.e., if 
      // the category does not exist)
      if (e instanceof ForeignKeyConstraintError) {
        return notFoundError("category");
      }

      throw e;
    }
  }

  // Modifies an existing product in the Product table
  async update(id, newProduct) {
    const product = await Product.findByPk(id);
    
    // Check if the product existed in the database
    if (!product) {
      return notFoundError("product");
    }

    try {
      return await product.update(newProduct);
    } catch (e) {
      // If `categoryId` is invalid (i.e., the category
      // does not exist)
      if (e instanceof ForeignKeyConstraintError) {
        return notFoundError("category");
      }

      throw e;
    }
  }

  // Removes a product from the Product table
  async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) return notFoundError("product");

    await product.destroy();
    return null;
  }
}
// DbCategoryService - Manages interactions with the Category table in the database
class DbOrderRepo {
  // Fetches all orders and includes information about the associated product and user
  async getAll() {
    const orders = await Order.findAll({
      include: [
        { model: Product },
        { model: User, attributes: ["id", "username", "fullName"] },
      ],
    });
    return orders;
  }

  // Retrieves a specific order by its ID, along with details about the product and user
  async get(id) {
    const order = await Order.findByPk(id, {
      include: [
        { model: Product },
        { model: User, attributes: ["id", "username", "fullName"] },
      ],
    });
    return order;
  }

  async create(order) {
    try {
      const newOrder = await Order.create(order);
      return newOrder;
    } catch (e) {
      // If one of the foriegn keys is invalid
      if (e instanceof ForeignKeyConstraintError) {
        // Check if the product exists
        if (!(await Product.findByPk(order.productId)))
          return notFoundError("product");
        
        // If the product exists, the only other FK is
        // the `userId`, meaning the user does not exist
        else return notFoundError("user");
      }

      throw e;
    }
  }
}

class DbCategoryRepo {
  async getAll() {
    const categories = await Category.findAll();
    return categories;
  }

  async create(category) {
    const newCategory = await Category.create(category);
    return newCategory;
  }
}

// Export the database service classes
module.exports = {
  UserRepo: DbUserRepo,
  ProductRepo: DbProductRepo,
  OrderRepo: DbOrderRepo,
  CategoryRepo: DbCategoryRepo,
  refresh,
};
