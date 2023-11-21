const {
  refresh: testRefresh,
  TestUserService,
  TestProductService,
  TestOrderService,
  TestCategoryService,
} = require("./mock_service");
const {
  refresh: dbRefresh,
  DbUserService,
  DbProductService,
  DbOrderService,
  DbCategoryService,
} = require("./db_service");

function roundTrip(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function testServices(name, refresh) {
  describe(`Testing ${name} services`, () => {
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
        fullName: "Zachary Whiteley",
        username: "zwhiteley",
        emailAddress: "zachary@example.com",
        passwordHash: "Password123",
      };

      const user1 = await services.userService.createUser(user1Data);
      const user2 = await services.userService.createUser(user2Data);

      expect(typeof user1.id).toBe("number");
      expect(typeof user2.id).toBe("number");

      const users = await services.userService.getAllUsers();
      const getUser1 = await services.userService.getUser(user1.id);
      const getUser2 = await services.userService.getUser(user2.id);

      expect(users).toMatchObject([user1Data, user2Data]);
      expect(getUser1).toMatchObject(user1Data);
      expect(getUser2).toMatchObject(user2Data);
    });

    test("cannot get user which does not exist", async () => {
      const user = await services.userService.getUser(1);
      expect(user).toBe(null);
    });

    test("can create and get categories", async () => {
      const cat1Data = { name: "Fruit" };
      const cat2Data = { name: "Tech" };
      const cat1 = roundTrip(await services.categoryService.createCategory(cat1Data));
      const cat2 = roundTrip(await services.categoryService.createCategory(cat2Data));

      expect(typeof cat1.id).toBe("number");
      expect(typeof cat2.id).toBe("number");

      const cats = await services.categoryService.getAllCategories();
      expect(cats).toMatchObject([cat1, cat2]);
    });

    test("can create and get products", async () => {
      const cat1Data = { name: "Fruit" };
      const cat1 = roundTrip(await services.categoryService.createCategory(cat1Data));

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

      const prod1 = roundTrip(await services.productService.createProduct(prod1Data));
      const prod2 = roundTrip(await services.productService.createProduct(prod2Data));

      expect(typeof prod1.id).toBe("number");
      expect(typeof prod2.id).toBe("number");

      const prods = await services.productService.getAllProducts();
      const getProd1 = await services.productService.getProduct(prod1.id);
      const getProd2 = await services.productService.getProduct(prod2.id);

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
      const cat1 = await services.categoryService.createCategory(cat1Data);

      const prod1Data = {
        name: "Apple",
        description: "A red fruit",
        categoryId: cat1.id + 1,
        price: 10.99,
        quantity: 10,
      };
      const prod1 = await services.productService.createProduct(prod1Data);

      expect(prod1).toBe(null);
    });

    test("cannot get product that does not exist", async () => {
      const prod = await services.productService.getProduct(0);
      expect(prod).toBe(null);
    });

    test("can create and get orders", async () => {
      const catData = { name: "Fruits" };
      const cat = await services.categoryService.createCategory(catData);
      const prodData = {
        name: "Apple",
        description: "A red fruit",
        categoryId: cat.id,
        price: 10.99,
        quantity: 10,
      };
      const prod = await services.productService.createProduct(prodData);
      const userData = {
        fullName: "Zachary Whiteley",
        username: "zwhiteley",
        emailAddress: "zachary@example.com",
        passwordHash: "Password123",
      };
      const user = await services.userService.createUser(userData);

      const orderData = {
        userId: user.id,
        productId: prod.id,
      };
      const order = await services.orderService.createOrder(orderData);

      expect(typeof order).toBe("object");
      expect(typeof order.id).toBe("number");

      const orders = await services.orderService.getAllOrders();
      const getOrder = await services.orderService.getOrder(order.id);

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
      const cat = await services.categoryService.createCategory(catData);
      const prodData = {
        name: "Apple",
        description: "A red fruit",
        categoryId: cat.id,
        price: 10.99,
        quantity: 10,
      };
      const prod = await services.productService.createProduct(prodData);

      const orderData = {
        userId: 1,
        productId: prod.id,
      };
      const order = await services.orderService.createOrder(orderData);

      expect(order).toBe("user-not-exists");

      const orders = await services.orderService.getAllOrders();
      expect(orders).toEqual([]);
    });

    test("cannot create order with invalid product", async () => {
      const userData = {
        fullName: "Zachary Whiteley",
        username: "zwhiteley",
        emailAddress: "zachary@example.com",
        passwordHash: "Password123",
      };
      const user = await services.userService.createUser(userData);

      const orderData = {
        userId: user.id,
        productId: 1,
      };
      const order = await services.orderService.createOrder(orderData);

      expect(order).toBe("product-not-exists");

      const orders = await services.orderService.getAllOrders();
      expect(orders).toEqual([]);
    });

    test("cannot get order that does not exist", async () => {
      const order = await services.orderService.getOrder(1);
      expect(order).toEqual(null);
    });
  });
}

testServices("Test", async () => {
  await testRefresh();
  return {
    userService: new TestUserService(),
    productService: new TestProductService(),
    orderService: new TestOrderService(),
    categoryService: new TestCategoryService(),
  };
});

testServices("Database", async () => {
  await dbRefresh();
  return {
    userService: new DbUserService(),
    productService: new DbProductService(),
    orderService: new DbOrderService(),
    categoryService: new DbCategoryService(),
  };
});
