import { CATEGORIES } from '../data/foodCategories';

const categoryMapping = {
  // 主食类
  '谷物类': 'staple_foods',
  '薯类及淀粉制品': 'staple_foods',
  '豆类及其制品': 'staple_foods',
  
  // 蔬菜类
  '叶菜类': 'vegetables',
  '根茎类': 'vegetables',
  '瓜果类': 'vegetables',
  '菌菇类': 'vegetables',
  '豆芽类': 'vegetables',
  '其他蔬菜': 'vegetables',
  
  // 水果类
  '热带水果': 'fruits',
  '温带水果': 'fruits',
  '浆果类': 'fruits',
  '柑橘类': 'fruits',
  '其他水果': 'fruits',
  
  // 肉类
  '家禽类': 'meats',
  '畜肉类': 'meats',
  '加工肉制品': 'meats',
  '内脏类': 'meats',
  
  // 水产类
  '鱼类': 'seafoods',
  '虾蟹类': 'seafoods',
  '贝类': 'seafoods',
  '其他水产': 'seafoods',
  
  // 蛋奶类
  '蛋类': 'eggs_dairy',
  '奶制品': 'eggs_dairy',
  
  // 坚果和种子类
  '坚果类': 'nuts_seeds',
  '种子类': 'nuts_seeds',
  
  // 调味品与酱料类
  '调味品': 'seasonings',
  '酱料': 'seasonings',
  '香辛料': 'seasonings',
  
  // 酒水饮品类
  '酒水饮品类': 'beverages',
  '酒精饮品': 'beverages',
  '非酒精饮品': 'beverages',
  '饮品': 'beverages',
  '酒类': 'beverages',
  '饮料': 'beverages',
  '茶类': 'beverages',
  '咖啡': 'beverages',
  '果汁': 'beverages'
};

export const parsePurineLevel = (content) => {
  const value = parseFloat(content);
  if (value <= 15) return 'VERY_LOW';
  if (value <= 50) return 'LOW';
  if (value <= 100) return 'MEDIUM';
  if (value <= 200) return 'HIGH';
  return 'VERY_HIGH';
};

export const parseRawData = (rawData) => {
  const lines = rawData.split('\n');
  const foods = [];

  for (const line of lines) {
    const parts = line.trim().split('\t');
    if (parts.length >= 4 && parts[0] !== '分类') {
      const [category, name, purineContent, purineLevel, source] = parts;
      
      // 查找主分类
      let mainCategory = null;
      for (const [key, value] of Object.entries(categoryMapping)) {
        if (category.includes(key)) {
          mainCategory = value;
          break;
        }
      }
      
      if (name && purineContent && mainCategory) {
        foods.push({
          id: `${name}-${Math.random()}`,
          name,
          category: mainCategory,
          purineContent: parseFloat(purineContent),
          purineLevel: parsePurineLevel(purineContent),
          source: source || '未知',
          originalCategory: category
        });
      }
    }
  }

  console.log('解析到的食品总数:', foods.length);
  return foods;
};