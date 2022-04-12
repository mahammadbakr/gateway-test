const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit", "search", "status"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  if (req.query.search)
    query = model.find({
      ...JSON.parse(queryStr),
      $or: [
        {
          titleKr: {
            $regex: new RegExp(req.query.search),
          },
        },
        {
          titleEn: {
            $regex: new RegExp(req.query.search),
          },
        },
        {
          titleAr: {
            $regex: new RegExp(req.query.search),
          },
        },
      ],
    });
  else query = model.find({ ...JSON.parse(queryStr) });

  // find resource via status
  if (req.query.status) {
    let status = req.query.status.split(",").map((e) => ({
      status: e,
    }));

    query = model.find({
      ...JSON.parse(queryStr),
      $or: status,
    });
  }

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1000;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    populate.forEach((e) => {
      query = query.populate(e);
    });
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    total_product: total,
    current_page: page,
    total_page: Math.ceil(total / limit),
    data: results,
  };

  next();
};

module.exports = advancedResults;
