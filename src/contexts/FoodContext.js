import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseRawData } from '../utils/dataParser';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFoodData = async () => {
      try {
        const response = await fetch('/data/food_category.txt');
        const data = await response.text();
        const parsedFoods = parseRawData(data);
        setFoods(parsedFoods);
      } catch (error) {
        console.error('Error loading food data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFoodData();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, loading }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFoods = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFoods must be used within a FoodProvider');
  }
  return context;
};