class MongoService {
  constructor(opts) {
    this.mongoose = opts.mongoose;
  }

  getInstance(modelName) {
    return this.mongoose.model(modelName);
  }

  async create(modelName, newObject) {
    const model = this.getInstance(modelName);
    let newObjectInstance = new model(newObject);
    newObjectInstance = await newObjectInstance.save();
    console.log(`model created successfully ${modelName}`);
    return newObjectInstance;
  }

  async insertMany(modelName, docArray) {
    const model = this.getInstance(modelName);
    const result = await model.insertMany(docArray);
    console.log("bulk inserted successfully");
    return result;
  }

  async getAllDocs(modelName) {
    console.log("mongo docs");
    const modelInstance = this.getInstance(modelName);
    const result = await modelInstance.find({});
    if (!result) {
      throw new Error("model not found");
    }
    return result;
  }

  async getbByQuery(modelName, query={}, projection=[], returnOne=false) {
    const model = this.getInstance(modelName);

    const result = returnOne
      ? await model.findOne(query, projection).lean()
      : await model.find(query, projection).lean();
    if (!result) {
      console.log("model not found");
    }
    console.log(`data retrived from db ${modelName}`);
    return result;
  }

  async getByPagination(
    modelName,
    query = {},
    page = 0,
    limit = 10,
    projection = []
  ) {
    const model = this.getInstance(modelName);
    const result = await model
      .find(query, projection)
      .skip(page * limit)
      .limit(limit)
      .lean();
    return result;
  }
  async remove(modelName){
    const model = this.getInstance(modelName);
    const result=await model.deleteMany();
     return result
  }

  async update(modelName,query,updateObj){
    const model = this.getInstance(modelName);
    const result=await model.findOneAndUpdate(query, updateObj);
    console.log(`${modelName} updated successfully`)
    return result;
  }
}

module.exports = MongoService;
