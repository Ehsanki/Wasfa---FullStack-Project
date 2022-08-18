require("dotenv").config();
const MySql = require("./MySql");

exports.execQuery = async function (query) {
    let returnValue = []
const connection = await MySql.connection();
    try {
    await connection.query("START TRANSACTION");
    returnValue = await connection.query(query);
  } catch (err) {
    await connection.query("ROLLBACK");
    console.log('ROLLBACK at querySignUp', err);
    throw err;
  } finally {
    await connection.release();
  }
  return returnValue
}

