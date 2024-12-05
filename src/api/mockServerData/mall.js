import Mock from "mockjs";

// 商品类型列表
const productTypes = ["智能设备", "文学艺术", "护肤彩妆", "代码工具", "智能化"];

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
  智能化: [
    ["智能", "智能化"],
    ["AI", "智能AI"],
  ],
};

// 声明新方法生成商品名称，考虑类型
function generateProductName(type) {
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
        description: generateDescription(productName, productType),
      })
    );
  }
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

    if (typeof name !== "string") {
      throw new Error("Invalid name parameter. Expected a string.");
    }

    const filteredList = productList.filter(
      (item) =>
        name.trim() === "" ||
        item.name.toLowerCase().includes(name.toLowerCase()) ||
        item.type.toLowerCase().includes(name.toLowerCase())
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pageList = filteredList.slice(startIndex, endIndex);

    return {
      code: 200,
      count: filteredList.length,
      list: pageList,
    };
  },

  /**
   * 新增商品
   * @param {Object} config - 请求配置
   * @returns {{code: number, data: {message: string, id: string}}}
   */
  createProduct: (config) => {
    const { name, type, number, price, description } = extractParams(
      config,
      "POST"
    );
    if (!name || !type || !number || !price || !description) {
      return { code: -1, message: "缺少必填项" };
    }

    const id = Mock.Random.guid();
    const newProduct = {
      id,
      name,
      type,
      number,
      price,
      description,
    };
    // 使用深拷贝避免 Vue 的响应式系统干扰
    const deepCopyProductList = JSON.parse(JSON.stringify(productList));
    deepCopyProductList.unshift(newProduct);
    productList.splice(0, productList.length, ...deepCopyProductList);
    console.log("新增商品:", newProduct);
    return {
      code: 200,
      data: {
        message: "添加成功",
        id: id,
      },
    };
  },
  /**
   * 删除和批量删除商品
   * @param {Object} config - 请求配置
   * @returns {{code: number, data: {message: string, id: string}}}
   */
  deleteOrBatch: (config) => {
    const { id } = JSON.parse(config.body);
    if (!id) {
      return { code: -1, message: "缺少ID参数" };
    }
    const product = productList.find((item) => item.id === id);
    if (!product) {
      return { code: -1, message: "商品不存在" };
    }
    productList.splice(productList.indexOf(product), 1);

    console.log("删除商品:", product);

    return {
      code: 200,
      data: {
        message: "删除成功",
        id: id,
      },
    };
  },

  /**
   * 更新商品信息
   * @param {Object} config - 请求配置
   * @returns {{code: number, data: {message: string, id: string}}}
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

    // 更新商品信息
    if (name !== undefined) product.name = name;
    if (type !== undefined) product.type = type;
    if (number !== undefined) product.number = number;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;

    console.log("更新商品:", { id, name, type, number, price, description });

    return {
      code: 200,
      data: {
        message: "编辑成功",
        id: id,
      },
    };
  },
};
