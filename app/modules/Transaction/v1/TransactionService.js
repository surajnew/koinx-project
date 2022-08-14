class TransactionService {
  constructor(opts) {
    this.mongoService = opts.mongoService;
    this.modelName = "Transaction";
    this.axios = opts.axios;
  }

  async getUser(req) {
    const result = await this.mongoService.getAllDocs(this.modelName);

    return result;
  }

  async getTransactionByAddress(query) {
    const { userId, address, page = 0 } = query;
    const result = await this.mongoService.getByPagination(
      this.modelName,
      { user: userId, address: address },
      page
    );
    return result;
  }
  async remove() {
    const result = await this.mongoService.remove(this.modelName);
    return result;
  }

  async getTransactionFromEtherScan(pageNo = 1, user) {
    const response = await this.axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "txlist",
        address: user.address,
        startblock: 0,
        endblock: 99999999,
        page: pageNo,
        offset: 50,
        sort: "desc",
        apikey: process.env.API_KEY,
      },
    });

    return response.data.result;
  }

  async getTransactionData(user) {
    let page = 1;
    let data = [];
    let transData = [];
    while (data) {
      data = await this.getTransactionFromEtherScan(page, user);
      if (data.length === 0) {
        break;
      }
      if (page === 1 ) {
        transData = data;
      }
      await this.insertDataInDB(data, user);
      page++;
    }
    console.log('transaction fetched successfully');
    return transData;
  }

  async insertDataInDB(dataArr, user) {
    let newDataArr = dataArr.map((obj) => {
      return {
        ...obj,
        user: user._id.toString(),
        address: user.address,
      };
    });

    await this.mongoService.insertMany(this.modelName, newDataArr);
  }
}

module.exports = TransactionService;
