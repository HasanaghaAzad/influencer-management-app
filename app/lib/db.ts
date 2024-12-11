import knex from "knex";
import knexConfig from "@/knexfile";

const environment = process.env.NODE_ENV || "development";

const knexInstance =  knex(knexConfig[environment]);
export default knexInstance;
