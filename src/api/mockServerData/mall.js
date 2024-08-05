import Mock from "mockjs";
// 商品类型列表
const productTypes = [
  "智能设备", // 更新商品类型列表
  "文学艺术",
  "护肤彩妆",
  "代码工具",
];
// 新增方法生成商品名称，考虑类型
const adjectiveNounPairs = {
  智能设备: [
    ["智能", "高清"],
    ["摄像头", "音箱"],
  ],

  文学艺术: [
    ["畅销", "经典"],
    ["小说", "传记"],
  ],
  护肤彩妆: [
    ["保湿", "防晒"],
    ["面膜", "口红"],
  ],
  代码工具: [
    ["代码", "工具"],
    ["工具", "IDE"],
  ],
};
// 声明新方法生成商品名称，考虑类型
function generateProductName(type) {
  // 如果类型不存在，返回"未知类型"
  if (!adjectiveNounPairs[type]) {
    return "未知类型";
  }
  const [adjectives, nouns] = adjectiveNounPairs[type];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective}${randomNoun}`;
}

// 生成商品列表数据
function generateProducts(count = 200) {
  const products = [];
  for (let i = 0; i < count; i++) {
    const productType = Mock.Random.pick(productTypes);
    const productName = generateProductName(productType);
    products.push(
      Mock.mock({
        id: Mock.Random.guid(),
        name: productName,
        type: productType,
        number: Mock.Random.integer(100, 600),
        price: Mock.Random.integer(10, 5000),
        // 根据商品类型和名称生成描述
        description: generateDescription(productName, productType),
      })
    );
  }
  // 打印商品列表
  // console.log("商品列表获取成功", products);
  return products;
}

// 根据商品名称和类型生成描述
function generateDescription(name, type) {
  let description = "";
  switch (type) {
    case "智能设备":
      description = `这款${name}采用了先进的智能技术，为您提供卓越的使用体验。`;
      break;
    case "文学艺术":
      description = `这本${name}是文学爱好者不可多得的佳作，深入探讨了人性的复杂性。`;
      break;
    case "护肤彩妆":
      description = `这款${name}适合各种肌肤类型，温和配方，带给您美丽自信。`;
      break;
    case "代码工具":
      description = `这款${name}是开发者的得力助手，提升编程效率，让代码更加优雅。`;
      break;
    default:
      description = `这是一款${name}，具体描述待补充。`;
  }
  return description;
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
