class ApiFunctionality {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i", // case-insensitive search
          },
        }
      : {};

    console.log("Search keyword:", keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
}

export default ApiFunctionality;
