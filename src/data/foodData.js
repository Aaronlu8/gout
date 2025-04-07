// 在文件顶部添加导入语句
import { vegetablesData } from './vegetablesData';
import { fruitsData } from './fruitsData';
import { meatsData } from './meatsData';
import { seafoodData } from './seafoodData';
import { eggsDairyData } from './eggsDairyData';
import { nutsSeedsData } from './nutsSeedsData';
import { seasoningsData } from './seasoningsData';
import { beveragesData } from './beveragesData';  // 新增这行

export const FOODS_DATA = [
  {
    name: '大米（白米）',
    purine: 18,
    purineLevel: '低',
    source: '《中国食物成分表》',
    category: 'staple_foods'
  },
  {
    category: 'staple_foods',
    name: '糙米',
    purine: 22,
    purineLevel: '低',
    source: '日本食品标准成分表'
  },
  {
    category: 'staple_foods',
    name: '糯米',
    purine: 17,
    purineLevel: '低',
    source: '同白米推算'
  },
  {
    category: 'staple_foods',
    name: '黑米',
    purine: 20,
    purineLevel: '低',
    source: '同糙米推算'
  },
  {
    category: 'staple_foods',
    name: '面条（小麦）',
    purine: 19,
    purineLevel: '低',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '馒头',
    purine: 17,
    purineLevel: '低',
    source: '推算（小麦粉加工均值）',
    weight: '一个普通馒头约100g'
  },
  {
    category: 'staple_foods',
    name: '包子（含馅料）',
    purine: 20,
    purineLevel: '低',
    source: '同馒头推算',
    weight: '一个普通包子约80g'
  },
  {
    category: 'staple_foods',
    name: '玉米',
    purine: 9,
    purineLevel: '低',
    source: '美国农业部数据库',
    weight: '一个中等大小玉米约250g'
  },
  {
    category: 'staple_foods',
    name: '燕麦',
    purine: 24,
    purineLevel: '低',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '小米',
    purine: 20,
    purineLevel: '低',
    source: '日本食品标准成分表'
  },
  {
    category: 'staple_foods',
    name: '荞麦',
    purine: 35,
    purineLevel: '低',
    source: '推算（全谷物均值）'
  },
  {
    category: 'staple_foods',
    name: '高粱',
    purine: 22,
    purineLevel: '低',
    source: '同小米推算'
  },
  {
    category: 'staple_foods',
    name: '藜麦',
    purine: 28,
    purineLevel: '低',
    source: '美国农业部数据库'
  },
  {
    category: 'staple_foods',
    name: '大麦',
    purine: 25,
    purineLevel: '低',
    source: '同燕麦推算'
  },
  {
    category: 'staple_foods',
    name: '黑麦',
    purine: 26,
    purineLevel: '低',
    source: '同大麦推算'
  },
  {
    category: 'staple_foods',
    name: '薏仁',
    purine: 18,
    purineLevel: '低',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '青稞',
    purine: 23,
    purineLevel: '低',
    source: '同大麦推算'
  },
  {
    category: 'staple_foods',
    name: '青稞面',
    purine: 25,
    purineLevel: '低',
    source: '同青稞+加工推算'
  },
  {
    category: 'staple_foods',
    name: '藜麦米',
    purine: 28,
    purineLevel: '低',
    source: '同藜麦干品数据'
  },
  {
    category: 'staple_foods',
    name: '鹰嘴豆粉',
    purine: 109,
    purineLevel: '中',
    source: '推算（干豆类均值）'
  },
  {
    category: 'staple_foods',
    name: '青稞粥',
    purine: 10,
    purineLevel: '低',
    source: '因水分稀释（青稞→粥）'
  },
  {
    category: 'staple_foods',
    name: '荞麦茶',
    purine: 5,
    purineLevel: '低',
    source: '推算（茶水嘌呤极低）'
  },
  {
    category: 'staple_foods',
    name: '薏仁粥',
    purine: 8,
    purineLevel: '低',
    source: '同薏仁+水分稀释'
  },
  {
    category: 'staple_foods',
    name: '燕麦麸皮',
    purine: 27,
    purineLevel: '低',
    source: '同燕麦推算'
  },
  {
    category: 'staple_foods',
    name: '玉米片',
    purine: 15,
    purineLevel: '低',
    source: '推算（玉米加工品）'
  },
  {
    category: 'staple_foods',
    name: '小麦胚芽',
    purine: 30,
    purineLevel: '低',
    source: '美国农业部数据库'
  },
  {
    category: 'staple_foods',
    name: '黑麦面包',
    purine: 22,
    purineLevel: '低',
    source: '同黑麦+加工推算'
  },
  {
    category: 'staple_foods',
    name: '全麦意面',
    purine: 20,
    purineLevel: '低',
    source: '同全麦粉数据'
  },
  {
    category: 'staple_foods',
    name: '糙米饭团',
    purine: 18,
    purineLevel: '低',
    source: '同糙米+水分推算'
  },
  {
    category: 'staple_foods',
    name: '土豆',
    purine: 6,
    purineLevel: '低',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '红薯',
    purine: 7,
    purineLevel: '低',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '山药',
    purine: 5,
    purineLevel: '低',
    source: '同土豆推算'
  },
  {
    category: 'staple_foods',
    name: '芋头',
    purine: 10,
    purineLevel: '低',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '紫薯',
    purine: 8,
    purineLevel: '低',
    source: '同红薯推算'
  },
  {
    category: 'staple_foods',
    name: '木薯',
    purine: 9,
    purineLevel: '低',
    source: '美国农业部数据库'
  },
  {
    category: 'staple_foods',
    name: '粉丝（红薯粉）',
    purine: 10,
    purineLevel: '低',
    source: '推算（红薯加工品）'
  },
  {
    category: 'staple_foods',
    name: '粉丝（绿豆粉）',
    purine: 15,
    purineLevel: '低',
    source: '推算（绿豆加工品）'
  },
  {
    category: 'staple_foods',
    name: '魔芋',
    purine: 0,
    purineLevel: '极低',
    source: '日本食品标准成分表'
  },
  {
    category: 'staple_foods',
    name: '葛根粉',
    purine: 12,
    purineLevel: '低',
    source: '推算（根茎类淀粉均值）'
  },
  {
    category: 'staple_foods',
    name: '藕粉',
    purine: 8,
    purineLevel: '低',
    source: '同莲藕推算'
  },
  {
    category: 'staple_foods',
    name: '红薯粉条',
    purine: 10,
    purineLevel: '低',
    source: '同红薯粉丝'
  },
  {
    category: 'staple_foods',
    name: '山药粉',
    purine: 5,
    purineLevel: '低',
    source: '同山药推算'
  },
  {
    category: 'staple_foods',
    name: '芋头糕',
    purine: 12,
    purineLevel: '低',
    source: '芋头+加工水分稀释'
  },
  {
    category: 'staple_foods',
    name: '紫薯饼',
    purine: 15,
    purineLevel: '低',
    source: '紫薯+糖油添加推算'
  },
  {
    category: 'staple_foods',
    name: '木薯布丁',
    purine: 10,
    purineLevel: '低',
    source: '木薯+牛奶稀释'
  },
  {
    category: 'staple_foods',
    name: '葛根粉羹',
    purine: 12,
    purineLevel: '低',
    source: '同葛根粉推算'
  },
  {
    category: 'staple_foods',
    name: '藕粉圆子',
    purine: 8,
    purineLevel: '低',
    source: '同藕粉推算'
  },
  {
    category: 'staple_foods',
    name: '魔芋丝',
    purine: 0,
    purineLevel: '极低',
    source: '同魔芋数据'
  },
  {
    category: 'staple_foods',
    name: '蕨根粉',
    purine: 18,
    purineLevel: '低',
    source: '日本食品标准成分表'
  },
  {
    category: 'staple_foods',
    name: '黄豆（干）',
    purine: 166,
    purineLevel: '高',
    source: '美国农业部数据库'
  },
  {
    category: 'staple_foods',
    name: '黑豆（干）',
    purine: 137,
    purineLevel: '中高',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '绿豆（干）',
    purine: 75,
    purineLevel: '中',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '红豆（干）',
    purine: 80,
    purineLevel: '中',
    source: '日本食品标准成分表'
  },
  {
    category: 'staple_foods',
    name: '鹰嘴豆（干）',
    purine: 109,
    purineLevel: '中',
    source: '美国农业部数据库'
  },
  {
    category: 'staple_foods',
    name: '豌豆（干）',
    purine: 84,
    purineLevel: '中',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '扁豆（干）',
    purine: 92,
    purineLevel: '中',
    source: '日本食品标准成分表'
  },
  {
    category: 'staple_foods',
    name: '蚕豆（干）',
    purine: 110,
    purineLevel: '中高',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '芸豆（干）',
    purine: 88,
    purineLevel: '中',
    source: '日本食品标准成分表'
  },
  {
    category: 'staple_foods',
    name: '刀豆（干）',
    purine: 95,
    purineLevel: '中',
    source: '推算（豆类均值）'
  },
  {
    category: 'staple_foods',
    name: '豆浆（未加糖）',
    purine: 27,
    purineLevel: '低',
    source: '因水分稀释（干豆→豆浆）'
  },
  {
    category: 'staple_foods',
    name: '豆腐（嫩）',
    purine: 55,
    purineLevel: '中',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '豆腐（老）',
    purine: 68,
    purineLevel: '中',
    source: '推算（水分较少）'
  },
  {
    category: 'staple_foods',
    name: '豆干',
    purine: 66,
    purineLevel: '中',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '腐竹',
    purine: 160,
    purineLevel: '高',
    source: '推算（浓缩豆制品）'
  },
  {
    category: 'staple_foods',
    name: '黑豆浆',
    purine: 30,
    purineLevel: '低',
    source: '同豆浆推算'
  },
  {
    category: 'staple_foods',
    name: '红豆沙冰',
    purine: 15,
    purineLevel: '低',
    source: '红豆+糖水稀释'
  },
  {
    category: 'staple_foods',
    name: '绿豆糕',
    purine: 20,
    purineLevel: '低',
    source: '绿豆+糖油加工'
  },
  {
    category: 'staple_foods',
    name: '豌豆黄',
    purine: 25,
    purineLevel: '低',
    source: '豌豆+糖加工'
  },
  {
    category: 'staple_foods',
    name: '豆腐脑',
    purine: 30,
    purineLevel: '低',
    source: '同嫩豆腐推算'
  },
  {
    category: 'staple_foods',
    name: '素鸡',
    purine: 63,
    purineLevel: '中',
    source: '《中国食物成分表》'
  },
  {
    category: 'staple_foods',
    name: '腐乳（红/白）',
    purine: 75,
    purineLevel: '中',
    source: '推算（发酵豆制品均值）'
  },
  {
    category: 'staple_foods',
    name: '纳豆',
    purine: 110,
    purineLevel: '中高',
    source: '日本食品标准成分表'
  },
  {
    category: 'staple_foods',
    name: '天贝（发酵大豆）',
    purine: 95,
    purineLevel: '中',
    source: '美国农业部数据库'
  },
  
  // 添加蔬菜类数据
  ...vegetablesData,
  
  // 添加水果类数据
  ...fruitsData,
  
  // 添加肉类数据
  ...meatsData,

  // 添加水产类数据
  ...seafoodData,

  // 添加带奶类数据
  ...eggsDairyData,

  // 添加坚果和种子类
  ...nutsSeedsData,

  // 添加调味品与酱料类
  ...seasoningsData,
  ...beveragesData  // 新增这行
];