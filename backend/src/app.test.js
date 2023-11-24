const { createApp } = require("./app");
const request = require("supertest");
const TestRepos = require("./repos/mock_repos");

const userRepo = new TestRepos.UserRepo();
const productRepo = new TestRepos.ProductRepo();
const orderRepo = new TestRepos.OrderRepo();
const categoryRepo = new TestRepos.CategoryRepo();
const repos = {
    userRepo,
    productRepo,
    orderRepo,
    categoryRepo
};
const app = createApp(repos);

beforeEach(async () => {
    await TestRepos.refresh();
});

test("example test", async () => {
    await categoryRepo.create({ name: "Hello!" });
    const response = await request(app)
        .get("/category");

    console.log(response.body);
});