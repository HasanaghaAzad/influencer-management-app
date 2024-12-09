import knex from "knex";

export const knexClient = knex(require("../knexfile"));
