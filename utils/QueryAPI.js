class QueryAPI {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  countDocuments() {
    // console.log("req.query = ", this.queryString);
    // BUILD QUERY
    const queryObj = { ...this.queryString };
    // console.log("queryObj = ", queryObj);
    // 1A) Filtering
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // console.log("queryObj excludedFields = ", queryObj);
    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    // console.log("queryStr = ", queryStr);
    // gte, gt, lte, lt must be rewriten
    // {type: 'mug', quantity: {gte: '10'}} //current string
    // {type: 'mug', quantity: {$gte: 10}} //mogoDB requirement
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log("queryStr = ", queryStr);
    queryStr = JSON.parse(queryStr);
    // console.log("queryStr = ", queryStr);

    this.query = this.query.countDocuments(queryStr);
    // console.log("query = ", this);
    return this;
  }

  filter() {
    console.log("req.query = ", this.queryString);

    // BUILD QUERY
    const queryObj = { ...this.queryString };
    // if (queryObj.active === "false") {
    //   queryObj.active = false;
    // }
    // console.log("queryObj = ", queryObj);
    // 1A) Filtering
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // console.log("queryObj excludedFields = ", queryObj);
    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    // console.log("queryStr = ", queryStr);
    // gte, gt, lte, lt must be rewriten
    // {type: 'mug', quantity: {gte: '10'}} //current string
    // {type: 'mug', quantity: {$gte: 10}} //mogoDB requirement
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log("queryStr = ", queryStr);
    queryStr = JSON.parse(queryStr);
    // console.log("queryStr = ", queryStr);

    console.log("queryStr = ", queryStr);
    this.query = this.query.find(queryStr);

    return this;
  }

  sort() {
    // 2) Sorting
    if (this.queryString.sort) {
      // console.log("sort ", this.queryString.sort);
      const sortBy = this.queryString.sort.split(",").join(" ");
      // console.log("sortBy ", sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      // default query
      // console.log("sortBy Default");
      this.query = this.query.sort("-price");
    }
    return this;
  }

  limit() {
    // 3) Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      // console.log("fields ", fields);
      // query = query.select("name desc price"); //syntax needed
      this.query = this.query.select(fields);
    } else {
      //default query
      // console.log("default limit fields");
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    // 4) Pagination
    const page = this.queryString.page * 1 || 1;
    // console.log("page ", page);
    const limit = this.queryString.limit * 1 || 6;

    // console.log("limit ", limit);
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numProducts = await Product.countDocuments();
    //   if (skip >= numProducts) throw new Error("This page does not exist");
    // }

    return this;
  }
}

module.exports = QueryAPI;
