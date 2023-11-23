/**
 * The repository error codes.
 */
const ERROR_CODES = {
  /**
   * A particular unique identifier is invalid (i.e., does
   * not correspond to an entry in a table).
   * 
   * This can be used for both for basic searches (e.g., to
   * indicate a primary key is incorrect) and foreign keys (e.g.,
   * if a foreign key is invalid).
   */
  NOT_FOUND: 0
};

function notFoundError(model) {
  return {
    type: "error",
    errorCode: ERROR_CODES.NOT_FOUND,
    
    // The name of the table which caused the issue (e.g.,
    // if the foreign key is invalid)
    errorModel: model
  }
}

//
// The API a repository must conform to.
//

/**
 * The user repository, used to get and modify users.
 */
class BaseUserRepo {
  /**
   * Get all the users from the data store.
   * @returns {{
   *  id: number,
   *  username: string,
   *  fullName: string,
   *  emailAddress: string,
   *  passwordHash: string
   * }[]} The users.
   */
  async getAll() {
    throw new Error("not implemented");
  }

  /**
   * Get an individual user from the data store by their
   * unique identifier.
   * @param {number} id - The unique identifier of the user.
   * @returns {{
   *  id: number,
   *  username: string,
   *  fullName: string,
   *  emailAddress: string,
   *  passwordHash: string
   * } | null} The user (or null if they do not exist).
   */
  async get(id) {
    throw new Error("not implemented");
  }

  /**
   * Get an individual user from the data store by their
   * email address.
   * @param {string} emailAddress - The email address of the user.
   * @returns {{
   *  id: number,
   *  username: string,
   *  fullName: string,
   *  emailAddress: string,
   *  passwordHash: string
   * } | null} The user (or null if they do not exist).
   */
  async findByEmail(emailAddress) {
    throw new Error("not implemented");
  }

  /**
   * Create a new user in the data store
   * @param {{
   *  username: string,
   *  fullName: string,
   *  emailAddress: string,
   *  passwordHash: string
   * }} - The user's information.
   * @returns {{
   *  id: number,
   *  username: string,
   *  fullName: string,
   *  emailAddress: string,
   *  passwordHash: string
   * } | null} The new user (or null if the user does not exist).
   */
  async findByEmail(emailAddress) {
    throw new Error("not implemented");
  }
}

/**
 * The category repository for retrieving and modifying
 * categories.
 */
class BaseCategoryRepo {
  /**
   * Get all the categories.
   * @returns {{
   *  id: number,
   *  name: string
   * }[]} The categories.
   */
  async getAll() {
    throw new Error("not implemented");
  }

  /**
   * Create a category.
   * @param {{
   *   name: string
   * }} category - The category to create.
   * @returns {{
   *  id: number,
   *  name: string
   * }} The newly created category.
   */
  async create(category) {
    throw new Error("not implemented");
  }
}

/**
 * The product repository for retrieving/modifying products.
 */
class BaseProductRepo {
  /**
   * Get all the products from the data store.
   * @returns {{
   *  id: number,
   *  name: string,
   *  description: string,
   *  categoryId: number,
   *  category: {
   *    id: number,
   *    name: string
   *  },
   *  price: number,
   *  quantity: number
   * }[]} The products.
   */
  async getAll() {
    throw new Error("not implemented");
  }

  /**
   * Get an individual product from the data store.
   * @param {number} id - The unique identifier of the product.
   * @returns {{
   *  id: number,
   *  name: string,
   *  description: string,
   *  categoryId: number,
   *  category: {
   *    id: number,
   *    name: string
   *  },
   *  price: number,
   *  quantity: number
   * } | null} The product (null if it does not exist).
   */
  async get(id) {
    throw new Error("not implemented");
  }

  /**
   * Create a product.
   * @param {{
   *  name: string,
   *  description: string,
   *  categoryId: number,
   *  price: number,
   *  quantity: number
   * }} product - The product information.
   * @returns {{
   *  id: number,
   *  name: string,
   *  description: string,
   *  categoryId: number,
   *  price: number,
   *  quantity: number
   * } | {
   *  type: "error",
   *  errorCode: 0,
   *  errorModel: string
   * }} The newly created product, or an error.
   */
  async create(product) {
    throw new Error("not implemented");
  }

  /**
   * Update a product in the data store.
   * @param {number} id - The unique identifier of the product.
   * @param {{
   *  name: string,
   *  description: string,
   *  categoryId: number,
   *  price: number,
   *  quantity: number
   * }} product - The product information.
   * @returns {{
   *  id: number,
   *  name: string,
   *  description: string,
   *  categoryId: number,
   *  price: number,
   *  quantity: number
   * } | {
   *  type: "error",
   *  errorCode: 0,
   *  errorModel: string
   * }} The updated product (or an error if one occurred).
   */
  async update(id, product) {
    throw new Error("not implemented");
  }

  /**
   * Delete a product from the data store.
   * @param {number} id - The unique identifier of the product.
   * @returns {null | {
   *  type: "error",
   *  errorCode: 0,
   *  errorModel: string
   * }} - The result (null if successful, the error if not).
   */
  async delete(id) {
    throw new Error("not implemented");
  }
}

/**
 * The repository to retrieve and modify orders.
 */
class BaseOrderRepo {
  /**
   * Get all the orders from the data store.
   * @returns {{
   *  id: number,
   *  userId: number,
   *  productId: number,
   *  product: {
   *    id: number,
   *    name: string,
   *    description: string,
   *    categoryId: number,
   *    price: number,
   *    quantity: number
   *  },
   *  user: {
   *    id: number,
   *    username: string,
   *    fullName: string
   *  }
   * }[]} The orders.
   */
  async getAll() {
    throw new Error("not implemented");
  }

  /**
   * Get an individual order from the data store.
   * @param {number} id - The unique identifier of the order.
   * @returns {{
   *  id: number,
   *  userId: number,
   *  productId: number,
   *  product: {
   *    id: number,
   *    name: string,
   *    description: string,
   *    categoryId: number,
   *    price: number,
   *    quantity: number
   *  },
   *  user: {
   *    id: number,
   *    username: string,
   *    fullName: string
   *  }
   * } | null} The order (null if it did not exist).
   */
  async get(id) {
    throw new Error("not implemented");
  }

  /**
   * Create a new order.
   * @param {{
   *  userId: number,
   *  productId: number
   * }} order - The order to create.
   * @returns {{
   *  id: number,
   *  userId: number,
   *  productId: number,
   * } | {
   *  type: "error",
   *  errorCode: 0,
   *  errorModel: string
   * }} The newly created order (or an error, if one occurred).
   */
  async create(order) {
    throw new Error("not implemented");
  }
}

module.exports = {
  notFoundError
};