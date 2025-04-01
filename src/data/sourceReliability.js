// 数据来源可信度评级
export const SOURCE_RELIABILITY = {
  '《中国食物成分表》': {
    level: '高',
    color: 'green',
    description: '中国疾病预防控制中心营养与健康所编制的官方食物成分数据库，数据经过严格的科学测定。',
    website: 'https://zh.wikipedia.org/wiki/中国食物成分表'
  },
  '日本食品标准成分表': {
    level: '高',
    color: 'green',
    description: '日本文部科学省发布的官方食品成分数据，包含详细的嘌呤含量数据。',
    website: 'https://en.wikipedia.org/wiki/Food_composition_data'
  },
  '美国农业部数据库': {
    level: '高',
    color: 'green',
    description: 'USDA食品成分数据库，是国际公认的权威食品营养成分参考数据。',
    website: 'https://en.wikipedia.org/wiki/FoodData_Central'
  },
  '临床研究文献': {
    level: '高',
    color: 'green',
    description: '来自于经同行评审的科学期刊发表的研究结果。'
  },
  '推算数据': {
    level: '中等',
    color: 'orange',
    description: '基于相似食品的已知数据进行合理推算得出的数值，具有一定参考价值。'
  },
  '网络整理': {
    level: '较低',
    color: 'red',
    description: '从互联网上收集的数据，尽管经过筛选，但可能存在一定误差。'
  }
};

// 获取来源可信度信息
export const getSourceReliability = (source) => {
  // 处理来源字符串，提取主要来源
  let mainSource = source;
  
  // 处理类似"《中国食物成分表》2019年版"的情况
  Object.keys(SOURCE_RELIABILITY).forEach(key => {
    if (source.includes(key)) {
      mainSource = key;
    }
  });
  
  // 如果包含"推算"字样，归为推算数据
  if (source.includes('推算')) {
    return SOURCE_RELIABILITY['推算数据'];
  }
  
  return SOURCE_RELIABILITY[mainSource] || {
    level: '未知',
    color: 'gray',
    description: '未能确定该数据来源的可信度。'
  };
};