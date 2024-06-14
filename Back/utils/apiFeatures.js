class ApiFeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString;
    };
    filters(){
        const queryObj = {...this.queryString};
        console.log(queryObj);
        const feildsItem = ['page','sort','limit','fields'];
        for(const key in feildsItem){
            delete queryObj[key];
        };
        this.query = this.query.find(queryObj.filters);
        return this;
    };
    sort(){
        if(this.queryString.sort){
            const sortQuery = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortQuery);
        }else{
            this.query = this.query.sort("-createAt");
        };
        return this;
    };
    limitFields(){
        if (this.queryString.fields){
            const limitBy = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(limitBy);
        }else{
            this.query = this.query.select("-__v");
        };
        return this;
    };
    paginate(){
        const page = this.queryString.page * 1 || 1;
        let limit = this.queryString.limit * 1 || 20;
        let skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    };
};

export default ApiFeatures;