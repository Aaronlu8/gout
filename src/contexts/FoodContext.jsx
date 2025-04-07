import React, { createContext, useContext, useState, useEffect } from 'react';
import { FOODS_DATA } from '../data/foodData';
import { vegetablesData } from '../data/vegetablesData';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // 合并主食类和蔬菜类数据
      const allFoods = [...FOODS_DATA, ...vegetablesData];
      console.log('加载的食品数据:', allFoods);
      setFoods(allFoods);
      setLoading(false);
    } catch (error) {
      console.error('加载食品数据错误:', error);
      setLoading(false);
    }
  }, []);

  return (
    <FoodContext.Provider value={{ foods, loading }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFoods = () => useContext(FoodContext);