class Features {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {}
    // console.log(keyword)
    this.query = this.query.find({ ...keyword })
    return this
  }

  filter() {
    const qry = { ...this.queryStr }
    const removeFields = ['keyword', 'limit']
    removeFields.forEach((key) => delete qry[key])

    let qryStr = JSON.stringify(qry)
    qryStr = qryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

    this.query = this.query.find(JSON.parse(qryStr))
    return this
  }
}

module.exports = Features
