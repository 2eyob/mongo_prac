const User = require("../models/User");
const userData = require("../_seedData/mockData");

// Create and Save a new user
exports.create = async (req, res) => {
  try {
    let users;
    await User.deleteMany();

    for (const user of Object.keys(userData.userData)) {
      users = await User.create(userData.userData[user]);
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return {
      message: err.message,
      error: err.error,
    };
  }
};

// get all function with filter,sort,pagination and projection(select)
exports.getAll = async (req, res) => {
  try {
    //accepting query parameters
    const query = req.query;

    // parse limit and skip values. if there is skip&limit the default values will be executed
    const per_page = query.per_page ? JSON.parse(query.per_page) : 10;
    const page = query.page ? JSON.parse(query.page) * per_page : 0;
    // initializing filter,sort and select variables
    let _where = {};
    let _sort = { createdAt: 1 }; // giving default sort order bt createdAt ASC
    let _select;

    // checking if there is select query exists
    _select = query.select ? JSON.parse(query.select).join(" ") : "";

    // checking if the is sort query exists
    if (query.sort) {
      const sort = JSON.parse(query.sort);
      let sortBy = sort[0];
      let sortOrder = sort[1].toUpperCase();
      sortOrder == "DESC" ? (sortOrder = -1) : 1;

      _sort = {
        [sortBy]: sortOrder,
      };
    }
    //checking if there is filter query exists and changing the operators for mongodb query
    if (query.filters) {
      const filters = JSON.parse(query.filters);
      let operator = filters[0].operatorValue;
      switch (operator) {
        case "=":
        case "equals":
          _where = {
            [filters[0].columnField]: {
              $eq: filters[0].value,
            },
          };
          break;
        case "!=":
          _where = {
            [filters[0].columnField]: {
              $ne: filters[0].value,
            },
          };
          break;
        case ">":
        case "is after":
        case "isAfter":
          _where = {
            [filters[0].columnField]: {
              $gt: filters[0].value,
            },
          };
          break;
        case ">=":
        case "is on or after":
        case "isOnOrAfter":
          _where = {
            [filters[0].columnField]: {
              $gte: filters[0].value,
            },
          };
          break;
        case "<":
        case "is before":
        case "isBefore":
          _where = {
            [filters[0].columnField]: {
              $lt: filters[0].value,
            },
          };
          break;
        case "<=":
        case "is on or before":
        case "isOnOrBefore":
          _where = {
            [filters[0].columnField]: {
              $lte: filters[0].value,
            },
          };
          break;
        case "is any of":
        case "isAnyOf":
          _where = {
            [filters[0].columnField]: {
              $in: filters[0].value,
            },
          };
          break;

        default:
          break;
      }
    }
    // mongo db query statement with all query parameters
    let users = await User.find()
      .where(_where)
      .skip(page)
      .limit(per_page)
      .sort(_sort)
      .select(_select);

    // response
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return {
      message: err.message,
      error: err.error,
    };
  }
};
