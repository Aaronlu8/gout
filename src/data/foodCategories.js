// 食品分类常量
export const CATEGORIES = {
  STAPLE_FOODS: {
    id: 'staple_foods',
    name: '主食类',
    icon: '🍚',
    color: '#FFE4B5',
    subcategories: ['谷物类', '薯类及淀粉制品', '豆类及其制品']
  },
  VEGETABLES: {
    id: 'vegetables',
    name: '蔬菜类',
    icon: '🥬',
    color: '#90EE90',
    subcategories: ['叶菜类', '根茎类', '瓜果类', '菌菇类']
  },
  FRUITS: {
    id: 'fruits',
    name: '水果类',
    icon: '🍎',
    color: '#FFB6C1'
  },
  MEATS: {
    id: 'meats',
    name: '肉类',
    icon: '🍖',
    color: '#FFA07A'
  },
  SEAFOODS: {
    id: 'seafoods',
    name: '水产类',
    icon: '🐟',
    color: '#87CEEB'
  },
  EGGS_DAIRY: {
    id: 'eggs_dairy',
    name: '蛋奶类',
    icon: '🥚',
    color: '#FFF8DC'
  },
  NUTS_SEEDS: {
    id: 'nuts_seeds',
    name: '坚果和种子类',
    icon: '🥜',
    color: '#DEB887'
  },
  SEASONINGS: {
    id: 'seasonings',
    name: '调味品与酱料类',
    icon: '🧂',
    color: '#FFE4E1'
  },
  BEVERAGES: {
    id: 'beverages',
    name: '酒水饮品类',
    icon: '🥤',
    color: '#E6E6FA'
  }
};

// 计量单位定义
export const MEASURE_UNITS = {
  BOWL: {
    LARGE: { name: '大碗', volume: 500, icon: '🥣' },
    MEDIUM: { name: '中碗', volume: 300, icon: '🥣' },
    SMALL: { name: '小碗', volume: 200, icon: '🥣' }
  },
  CHOPSTICKS: {
    name: '筷子夹起量',
    volume: 15,
    icon: '🥢'
  },
  SPOON: {
    LARGE: { name: '大勺', volume: 15, icon: '🥄' },
    MEDIUM: { name: '中勺', volume: 10, icon: '🥄' },
    SMALL: { name: '小勺', volume: 5, icon: '🥄' }
  }
};

// 嘌呤含量等级
export const PURINE_LEVELS = {
  'VERY_LOW': {
    name: '极低嘌呤',
    range: '0-50',
    // 将亮绿色改为更柔和的淡绿色
    color: '#8BC34A'  // 原来是 '#52c41a'
  },
  'LOW': {
    name: '低嘌呤',
    range: '50-100',
    // 将亮绿色改为更柔和的绿色
    color: '#4CAF50'  // 原来是 '#52c41a' 或其他亮绿色
  },
  'MEDIUM': {
    name: '中等嘌呤',
    range: '100-150',
    color: '#faad14'
  },
  'HIGH': {
    name: '高嘌呤',
    range: '150-200',
    color: '#ff7a45'
  },
  'VERY_HIGH': {
    name: '极高嘌呤',
    range: '200+',
    color: '#f5222d'
  }
};