/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      email: "nick.fury@shield.com",
      password: await bcrypt.hash("invasion", 10),
      first_name: "Nick",
      last_name: "Fury",
    },
    {
      email: "odin.borson@asgard.com",
      password: await bcrypt.hash("hela", 10),
      first_name: "Odin",
      last_name: "Borson",
    },
  ]);
};
