"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface,) {
    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        fullName: "Zachary Whiteley",
        username: "zwhiteley",
        emailAddress: "zachary.whiteley@sky.uk",
        role: "user",
        passwordHash: "$2a$12$B3e78rY64x.GO94hCwgYA.d/eBq5GBe7NdyJ9Rzo6NHi2vXWTzuBW"
      },
      {
        id: 2,
        fullName: "Gboyega Idowu",
        username: "crux737",
        emailAddress: "gboyega.idowu@gmail.com",
        role: "user",
        passwordHash: "$2a$12$B3e78rY64x.GO94hCwgYA.d/eBq5GBe7NdyJ9Rzo6NHi2vXWTzuBW"
      },
      {
        id: 3,
        fullName: "Josh Pickard",
        username: "joshpickardme",
        emailAddress: "generic-frontend-dev-filler-filler-filler@generic.com",
        role: "user",
        passwordHash: "$2a$12$B3e78rY64x.GO94hCwgYA.d/eBq5GBe7NdyJ9Rzo6NHi2vXWTzuBW"
      },
      {
        id: 4,
        fullName: "admin",
        username: "admin",
        emailAddress: "admin@admin.com",
        role: "admin",
        passwordHash: "$2a$12$B3e78rY64x.GO94hCwgYA.d/eBq5GBe7NdyJ9Rzo6NHi2vXWTzuBW"
      }
    ]);

    await queryInterface.bulkInsert("Categories", [
      { id: 1, name: "Food" },
      { id: 2, name: "Technology" },
    ]);

    await queryInterface.bulkInsert("Products", [
      {
        id: 1,
        name: "Apple",
        description: "A red fruit",
        categoryId: 1,
        price: 19.99,
        quantity: 1234456677
      },
      {
        id: 2,
        name: "Banana",
        description: "A yellow fruit",
        categoryId: 1,
        price: 149.99,
        quantity: 23
      },
      {
        id: 3,
        name: "Tomato",
        description: "A red fruit",
        categoryId: 1,
        price: 149.99,
        quantity: 0
      },
      {
        id: 4,
        name: "Apple® MacBook® Pro®",
        description: "Like a computer, but Apple®",
        categoryId: 2,
        price: 100_000_000_000_000,
        quantity: 1
      },
      {
        id: 5,
        name: "Apple® iPhone® 10® S®",
        description: "Like a phone, but Apple®",
        categoryId: 2,
        price: 257,
        quantity: 14
      }
    ]);
  },

  async down (queryInterface,) {
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  }
};
