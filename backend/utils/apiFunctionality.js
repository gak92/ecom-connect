class ApiFunctionality {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // This method allows searching products based on a keyword in the name field.
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i", // case-insensitive search
          },
        }
      : {};

    // console.log("Search keyword:", keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // This method allows filtering products based on category.
  filter() {
    const queryCopy = { ...this.queryString };
    // console.log("Query Copy:", queryCopy);

    // Removing fields from the queryCopy that are not needed for filtering
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => {
      delete queryCopy[key];
    });
    // console.log("Filtered Query Copy:", queryCopy);

    this.query = this.query.find(queryCopy);
    return this;
  }

  // This method allows pagination of the results.
  pagination(resultsPerPage) {
    // console.log("Results per page:", resultsPerPage);
    const currentPage = Number(this.queryString.page) || 1;
    // console.log("Current page:", currentPage);

    const skip = resultsPerPage * (currentPage - 1);
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

export default ApiFunctionality;
