import React, { createContext, useContext, useState, useEffect } from 'react';
import { FOODS_DATA } from '../data/foodData';
import { CATEGORIES } from '../data/foodCategories';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    // 初始化食品数据
    setFoods(FOODS_DATA);
  }, []);

  const getFoodsByCategory = (categoryId) => {
    const category = Object.values(CATEGORIES).find(cat => cat.id === categoryId);
    if (!category) return [];
    
    return foods.filter(food => 
      category.subcategories?.includes(food.category)
    );
  };

  return (
    <FoodContext.Provider value={{ foods, getFoodsByCategory }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFoods = () => useContext(FoodContext);