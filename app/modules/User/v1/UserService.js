class UserService {
  constructor(opts) {
    // this.userModel=opts.userModel;
    this.mongoService = opts.mongoService;
    this.modelName = "User";
    this.transactionService = opts.transactionService;
    this.axios = opts.axios;
  }

  async getUser(req) {
    const result = await this.mongoService.getAllDocs(this.modelName);
    return result;
  }

  async createAccount(body) {
    const user = await this.mongoService.create(this.modelName, body);
    let transData = await this.transactionService.getTransactionData(user);
    await this.updateUserEndblcok(user, transData);
    await this.getUserBalance(user);
    return transData;
  }
  async getBalance(query) {
    const { userId, address } = query;
    const userBalance = await this.mongoService.getbByQuery(
      this.modelName,
      {
        _id: userId,
        address: address,
      },
      ["-_id", "balance"],
      true
    );
    const etherPrice = await this.mongoService.getbByQuery(
      "Ethereum",
      {},
      ["-_id", "price"],
      true
    );
    let result = {
      balance: userBalance.balance,
      ether_price: etherPrice.price,
    };
    return result;
  }

  async updateUserEndblcok(user, dataArr) {
    let letestTransData = dataArr[0];
    if (letestTransData?.blockNumber) {
      await this.mongoService.update(
        this.modelName,
        { _id: user._id },
        { endblock: letestTransData.blockNumber }
      );
    }
  }

  async getUserBalance(user) {
    const response = await this.axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "balance",
        address: user.address,
        tag: "latest",
        apikey: process.env.API_KEY,
      },
    });
    return await this.mongoService.update(
      this.modelName,
      { _id: user._id },
      { balance: Number(response.data.result) }
    );
  }
}

module.exports = UserService;
