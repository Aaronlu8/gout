import { FOODS } from '../data/foodData';  // 改为实际的数据文件名
import { CATEGORIES } from '../data/foodCategories';

import React, { createContext, useState, useContext, useEffect } from 'react';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        // 修改数据加载路径，使用正确的仓库名
        const response = await fetch('/Purineassist/data/food_category.txt');
        const text = await response.text();
        
        // 解析数据
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const parsedFoods = lines.slice(1).map(line => {
          const [category, name, purineContent, purineLevel, source] = line.split('\t');
          return {
            category,
            name,
            purineContent: parseFloat(purineContent) || 0,
            purineLevel,
            source
          };
        });
        
        setFoods(parsedFoods);
      } catch (error) {
        console.error('Error loading food data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, loading }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFoods = () => useContext(FoodContext);