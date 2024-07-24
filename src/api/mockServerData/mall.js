import Mock from "mockjs";
// 商品类型列表
const productTypes = [
  "电子产品",
  "服饰",
  "家居用品",
  "图书",
  "美妆个护",
  "食品饮料",
  "母婴玩具",
];
// 新增方法生成商品名称，考虑类型
function generateProductName(type) {
  const adjectiveNounPairs = {
    电子产品: [
      ["智能", "新款"],
      ["手机", "电脑"],
    ],
    服饰: [
      ["时尚", "经典"],
      ["衬衫", "连衣裙"],
    ],
    家居用品: [
      ["创意", "实用"],
      ["沙发", "灯具"],
    ],
    图书: [
      ["畅销", "经典"],
      ["小说", "科普"],
    ],
    美妆个护: [
      ["保湿", "滋养"],
      ["面霜", "洁面乳"],
    ],
    食品饮料: [
      ["健康", "美味"],
      ["坚果", "果汁"],
    ],
    母婴玩具: [
      ["安全", "益智"],
      ["婴儿车", "积木"],
    ],
  };

  const [adjectives, nouns] =
    adjectiveNounPairs[type] || adjectiveNounPairs["服饰"]; // 默认为服饰
  const adjective = Mock.Random.pick(adjectives);
  const noun = Mock.Random.pick(nouns);
  return `${adjective}${noun}`;
}

// 生成商品列表数据
function generateProducts(count = 200) {
  const products = [];
  for (let i = 0; i < count; i++) {
    const productType = Mock.Random.pick(productTypes);
    products.push(
      Mock.mock({
        id: Mock.Random.guid(),
        // 使用新方法生成商品名称，并考虑类型
        name: generateProductName(productType),
        type: productType,
        number: Mock.Random.integer(100, 600), // 更正字段名为"number"
        price: Mock.Random.integer(10, 5000),
        description: Mock.Random.csentence(10, 30),
      })
    );
  }
  return products;
}
const productList = generateProducts();
// 统一处理参数提取
function extractParams(config, method = "GET") {
  return method === "GET" ? param2Obj(config.url) : JSON.parse(config.body);
}

// 参数转换对象函数
function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

export default {
  /**
   * 获取商品列表
   * @param {Object} config - 请求配置
   * @returns {{code: number, count: number, list: Array}}
   */
  getProductList: (config) => {
    const params = extractParams(config, "GET");
    const { name = "", page = 1, limit = 20 } = params;

    // 确保 name 是有效的字符串，避免不必要的错误
    if (typeof name !== "string") {
      throw new Error("Invalid name parameter. Expected a string.");
    }

    // 过滤逻辑，只保留 name 或 type 匹配的商品
    const filteredList = productList.filter(
      (item) =>
        name.trim() === "" || // 如果name为空或者全是空白，则不过滤，返回所有
        item.name.toLowerCase().includes(name.toLowerCase()) ||
        item.type.toLowerCase().includes(name.toLowerCase())
    );

    // 分页处理
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pageList = filteredList.slice(startIndex, endIndex);

    return {
      code: 20000,
      count: filteredList.length, // 总计数
      list: pageList, // 当前页数据
    };
  },
  /**
   * 新增商品
   * @param {Object} config - 请求配置
   * @returns {{code: number, data: {message: string}}}
   */
  createProduct: (config) => {
    const { name, type, number, price, description } = extractParams(
      config,
      "POST"
    );
    if (!name || !type || !number || !price || !description) {
      return { code: -1, message: "缺少必填项" };
    }
    const newProduct = {
      id: Mock.Random.guid(),
      name,
      type,
      number,
      price,
      description,
    };
    productList.unshift(newProduct);
    return {
      code: 20000,
      data: {
        message: "添加成功",
      },
    };
  },
  /**
   * 删除商品
   * @param {Object} config - 请求配置
   * @returns {{code: number, message: string}}
   */
  deleteProduct: (config) => {
    const { id } = extractParams(config, "POST");
    if (!id) {
      return { code: -1, message: "缺少ID参数" };
    }
    const index = productList.findIndex((item) => item.id === id);
    if (index === -1) {
      return { code: -1, message: "商品不存在" };
    }
    productList.splice(index, 1);
    return {
      code: 20000,
      message: "删除成功",
    };
  },

  /**
   * 批量删除商品
   * @param {id}
   * @returns {*}
   */
  batchProduct: (config) => {
    const { id } = JSON.parse(config.body);
    if (!id) {
      return { code: -1, message: "缺少ID参数" };
    }
    const index = productList.findIndex((item) => item.id === id);
    if (index === -1) {
      return { code: -1, message: "商品不存在" };
    }
    productList.splice(index, 1);
    return {
      code: 20000,
      message: "批量删除成功",
    };
  },
  /**
   * 更新商品信息
   * @param {Object} config - 请求配置
   * @returns {{code: number, data: {message: string}}}
   */
  updateProduct: (config) => {
    const { id, name, type, number, price, description } = extractParams(
      config,
      "POST"
    );
    if (!id) {
      return { code: -1, message: "缺少ID参数" };
    }
    const product = productList.find((item) => item.id === id);
    if (!product) {
      return { code: -1, message: "商品不存在" };
    }
    if (name) product.name = name;
    if (type) product.type = type;
    if (number !== undefined) product.number = number;
    if (price !== undefined) product.price = price;
    if (description) product.description = description;
    return {
      code: 20000,
      data: {
        message: "编辑成功",
      },
    };
  },
};
