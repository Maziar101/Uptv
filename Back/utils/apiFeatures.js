class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filters() {
        const queryObj = { ...this.queryString };
        console.log(queryObj);
        const fieldsToExclude = ['page', 'sort', 'limit', 'fields'];
        fieldsToExclude.forEach(field => delete queryObj[field]);

        this.query = this.query.find(queryObj);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortQuery = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortQuery);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const limitBy = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(limitBy);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 20;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

export default ApiFeatures;
