const MockRepos = require("./mock_repos");
const DbRepos = require("./db_repos");

// NOTE: this function is required to remove the 
// crap sequelize attaches to its objects (to make
// comparisons nice).
function roundTrip(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Test a set of repositories against the API.
 * @param {string} name - The name of the repository class (e.g., database).
 * @param {*} refresh - The refresh function (recreates the repositories).
 */
function testRepos(name, refresh) {
  describe(`Testing ${name} repositories`, () => {
    let services;

    beforeEach(async () => {
      services = await refresh();
    });

    test("able to create and get users", async () => {
      const user1Data = {
        fullName: "Zachary Whiteley",
        username: "zwhiteley",
        emailAddress: "zachary@example.com",
        passwordHash: "Password123",
      };
      const user2Data = {
        fullName: "Josh Pickard",
        username: "joshpickardme",
        emailAddress: "josh@example.com",
        passwordHash: "Password123",
      };

      const user1 = await services.userRepo.create(user1Data);
      const user2 = await services.userRepo.create(user2Data);

      expect(typeof user1.id).toBe("number");
      expect(typeof user2.id).toBe("number");

      const users = await services.userRepo.getAll();
      const getUser1 = await services.userRepo.get(user1.id);
      const getUser2 = await services.userRepo.get(user2.id);

      expect(users).toMatchObject([user1Data, user2Data]);
      expect(getUser1).toMatchObject(user1Data);
      expect(getUser2).toMatchObject(user2Data);
    });

    test("able to find user by email", async () => {
      const user1Data = {
        fullName: "Zachary Whiteley",
        username: "zwhiteley",
        emailAddress: "zachary@example.com",
        passwordHash: "Password123",
      };
      const user2Data = {
        fullName: "Josh Pickard",
        username: "joshpickardme",
        emailAddress: "josh@example.com",
        passwordHash: "Password123",
      };

      const user1 = await services.userRepo.create(user1Data);
      const user2 = await services.userRepo.create(user2Data);

      expect(typeof user1.id).toBe("number");
      expect(typeof user2.id).toBe("number");

      const getUser1 = await services.userRepo.findByEmail(user1.emailAddress);
      const getUser2 = await services.userRepo.findByEmail(user2.emailAddress);
      const getUser3 = await services.userRepo.findByEmail("not-exists@gmail.com");

      expect(getUser1).toMatchObject(user1Data);
      expect(getUser2).toMatchObject(user2Data);
      expect(getUser3).toBe(null);
    });

    test("cannot get user which does not exist", async () => {
      const user = await services.userRepo.get(1);
      expect(user).toBe(null);
    });

    test("can create and get categories", async () => {
      const cat1Data = { name: "Fruit" };
      const cat2Data = { name: "Tech" };
      const cat1 = roundTrip(await services.categoryRepo.create(cat1Data));
      const cat2 = roundTrip(await services.categoryRepo.create(cat2Data));

      expect(typeof cat1.id).toBe("number");
      expect(typeof cat2.id).toBe("number");

      const cats = await services.categoryRepo.getAll();
      expect(cats).toMatchObject([cat1, cat2]);
    });

    test("can create and get products", async () => {
      const cat1Data = { name: "Fruit" };
      const cat1 = roundTrip(await services.categoryRepo.create(cat1Data));

      expect(cat1).toBeTruthy();

      const prod1Data = {
        name: "Apple",
        description: "A red fruit",
        categoryId: cat1.id,
        price: 10.99,
        quantity: 10,
      };
      const prod2Data = {
        name: "Banana",
        description: "A yellow fruit",
        categoryId: cat1.id,
        price: 10.99,
        quantity: 10,
      };

      const prod1 = roundTrip(await services.productRepo.create(prod1Data));
      const prod2 = roundTrip(await services.productRepo.create(prod2Data));

      expect(typeof prod1.id).toBe("number");
      expect(typeof prod2.id).toBe("number");

      const prods = await services.productRepo.getAll();
      const getProd1 = await services.productRepo.get(prod1.id);
      const getProd2 = await services.productRepo.get(prod2.id);

      expect(prods).toMatchObject([prod1, prod2]);
      expect(getProd1).toMatchObject({
        ...prod1,
        category: cat1,
      });
      expect(getProd2).toMatchObject({
        ...prod2,
        category: cat1,
      });
    });

    test("cannot create a product with invalid category", async () => {
      const cat1Data = { name: "Fruits" };
      const cat1 = await services.categoryRepo.create(cat1Data);

      const prod1Data = {
        name: "Apple",
        description: "A red fruit",
        categoryId: cat1.id + 1,
        price: 10.99,
        quantity: 10,
      };
      const error = await services.productRepo.create(prod1Data);

      expect(error).toEqual({
        type: "error",
        errorCode: 0,
        errorModel: "category"
      });
    });

    test("cannot get product that does not exist", async () => {
      const prod = await services.productRepo.get(0);
      expect(prod).toBe(null);
    });

    test("can update a product", async () => {
      const cat1Data = { name: "Fruit" };
      const cat1 = roundTrip(await services.categoryRepo.create(cat1Data));

      expect(cat1).toBeTruthy();

      const prodData = {
        name: "Apple",
        description: "A red fruit",
        categoryId: cat1.id,
        price: 10.99,
        quantity: 10,
      };
      const prodUpdatedData = {
        name: "Banana",
        description: "A yellow fruit",
        categoryId: cat1.id,
        price: 10.99,
        quantity: 10,
      };

      const prod = roundTrip(await services.productRepo.create(prodData));
      const updatedProd = roundTrip(await services.productRepo.update(prod.id, prodUpdatedData));

      expect(typeof updatedProd.id).toBe("number");

      const prods = await services.productRepo.getAll();
      const getProd = await services.productRepo.get(prod.id);

      expect(prods).toMatchObject([updatedProd]);
      expect(getProd).toMatchObject(updatedProd);
    });

    test("cannot update product that does not exist", async () => {
      const cat1Data = { name: "Fruit" };
      const cat1 = roundTrip(await services.categoryRepo.create(cat1Data));
      expect(cat1).toBeTruthy();

      const prodUpdatedData = {
        name: "Banana",
        description: "A yellow fruit",
        categoryId: cat1.id,
        price: 10.99,
        quantity: 10,
      };

      const error = roundTrip(await services.productRepo.update(23, prodUpdatedData));
      expect(error).toEqual({
        type: "error",
        errorCode: 0,
        errorModel: "product"
      });
    });

    test("cannot update product with invalid category", async () => {
      const cat1Data = { name: "Fruit" };
      const cat1 = roundTrip(await services.categoryRepo.create(cat1Data));
      expect(cat1).toBeTruthy();

      const prodData = {
        name: "Banana",
        description: "A yellow fruit",
        categoryId: cat1.id,
        price: 10.99,
        quantity: 10,
      };
      const prod = await services.productRepo.create(prodData);

      const prodUpdatedData = {
        name: "Banana",
        description: "A yellow fruit",
        categoryId: cat1.id + 1,
        price: 10.99,
        quantity: 10,
      };

      const error = await services.productRepo.update(prod.id, prodUpdatedData);
      expect(error).toEqual({
        type: "error",
        errorCode: 0,
        errorModel: "category"
      });
    });

    test("can delete a product", async () => {
      const cat1Data = { name: "Fruit" };
      const cat1 = roundTrip(await services.categoryRepo.create(cat1Data));

      expect(cat1).toBeTruthy();

      const prod1Data = {
        name: "Apple",
        description: "A red fruit",
        categoryId: cat1.id,
        price: 10.99,
        quantity: 10,
      };
      const prod2Data = {
        name: "Banana",
        description: "A yellow fruit",
        categoryId: cat1.id,
        price: 10.99,
        quantity: 10,
      };

      const prod1 = roundTrip(await services.productRepo.create(prod1Data));
      const prod2 = roundTrip(await services.productRepo.create(prod2Data));

      expect(typeof prod1.id).toBe("number");
      expect(typeof prod2.id).toBe("number");

      const result = await services.productRepo.delete(prod2.id);
      expect(result).toBe(null);

      const prods = await services.productRepo.getAll();
      const getProd1 = await services.productRepo.get(prod1.id);
      const getProd2 = await services.productRepo.get(prod2.id);

      expect(prods).toMatchObject([prod1]);
      expect(getProd1).toMatchObject({
        ...prod1,
        category: cat1,
      });
      expect(getProd2).toBe(null);
    });

    test("cannot delete product that does not exist", async () => {
      const cat1Data = { name: "Fruit" };
      const cat1 = roundTrip(await services.categoryRepo.create(cat1Data));

      expect(cat1).toBeTruthy();

      const prod1Data = {
        name: "Apple",
        description: "A red fruit",
        categoryId: cat1.id,
        price: 10.99,
        quantity: 10,
      };
      const prod2Data = {
        name: "Banana",
        description: "A yellow fruit",
        categoryId: cat1.id,
        price: 10.99,
        quantity: 10,
      };

      const prod1 = roundTrip(await services.productRepo.create(prod1Data));
      const prod2 = roundTrip(await services.productRepo.create(prod2Data));

      expect(typeof prod1.id).toBe("number");
      expect(typeof prod2.id).toBe("number");

      const error = await services.productRepo.delete(prod1.id + prod2.id + 1000);
      expect(error).toEqual({
        type: "error",
        errorCode: 0,
        errorModel: "product"
      });

      const prods = await services.productRepo.getAll();
      const getProd1 = await services.productRepo.get(prod1.id);
      const getProd2 = await services.productRepo.get(prod2.id);

      expect(prods).toMatchObject([prod1, prod2]);
      expect(getProd1).toMatchObject({
        ...prod1,
        category: cat1,
      });
      expect(getProd2).toMatchObject({
        ...prod2,
        category: cat1,
      });
    });

    test("can create and get orders", async () => {
      const catData = { name: "Fruits" };
      const cat = await services.categoryRepo.create(catData);
      const prodData = {
        name: "Apple",
        description: "A red fruit",
        categoryId: cat.id,
        price: 10.99,
        quantity: 10,
      };
      const prod = await services.productRepo.create(prodData);
      const userData = {
        fullName: "Zachary Whiteley",
        username: "zwhiteley",
        emailAddress: "zachary@example.com",
        passwordHash: "Password123",
      };
      const user = await services.userRepo.create(userData);

      const orderData = {
        userId: user.id,
        productId: prod.id,
      };
      const order = await services.orderRepo.create(orderData);

      expect(typeof order).toBe("object");
      expect(typeof order.id).toBe("number");

      const orders = await services.orderRepo.getAll();
      const getOrder = await services.orderRepo.get(order.id);
    
      expect(orders[0]).toMatchObject({
        product: roundTrip(prod),
        user: {
          id: user.id,
          fullName: user.fullName,
          username: user.username,
        },
      });
      expect(getOrder).toMatchObject({
        product: roundTrip(prod),
        user: {
          id: user.id,
          fullName: user.fullName,
          username: user.username,
        },
      });
    });

    test("cannot create order with invalid user", async () => {
      const catData = { name: "Fruits" };
      const cat = await services.categoryRepo.create(catData);
      const prodData = {
        name: "Apple",
        description: "A red fruit",
        categoryId: cat.id,
        price: 10.99,
        quantity: 10,
      };
      const prod = await services.productRepo.create(prodData);

      const orderData = {
        userId: 1,
        productId: prod.id,
      };
      const error = await services.orderRepo.create(orderData);

      expect(error).toEqual({
        type: "error",
        errorCode: 0,
        errorModel: "user"
      });

      const orders = await services.orderRepo.getAll();
      expect(orders).toEqual([]);
    });

    test("cannot create order with invalid product", async () => {
      const userData = {
        fullName: "Zachary Whiteley",
        username: "zwhiteley",
        emailAddress: "zachary@example.com",
        passwordHash: "Password123",
      };
      const user = await services.userRepo.create(userData);

      const orderData = {
        userId: user.id,
        productId: 1,
      };
      const error = await services.orderRepo.create(orderData);

      expect(error).toEqual({
        type: "error",
        errorCode: 0,
        errorModel: "product"
      });

      const orders = await services.orderRepo.getAll();
      expect(orders).toEqual([]);
    });

    test("cannot get order that does not exist", async () => {
      const order = await services.orderRepo.get(1);
      expect(order).toEqual(null);
    });
  });
}

testRepos("test", async () => {
  await MockRepos.refresh();
  return {
    userRepo: new MockRepos.UserRepo(),
    productRepo: new MockRepos.ProductRepo(),
    orderRepo: new MockRepos.OrderRepo(),
    categoryRepo: new MockRepos.CategoryRepo(),
  };
});

testRepos("database", async () => {
  await DbRepos.refresh();
  return {
    userRepo: new DbRepos.UserRepo(),
    productRepo: new DbRepos.ProductRepo(),
    orderRepo: new DbRepos.OrderRepo(),
    categoryRepo: new DbRepos.CategoryRepo(),
  };
});
