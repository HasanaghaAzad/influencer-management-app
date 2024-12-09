import Knex from 'knex';
import knexConfig from '../knexfile'; // Adjust the path according to your setup

const knex = Knex(knexConfig);

export default knex;