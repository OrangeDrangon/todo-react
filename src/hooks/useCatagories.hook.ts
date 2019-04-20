import { useState, useEffect } from "react";

export function useCatagories() {
  const [catagories, setCatagories] = useState<string[]>([]);

  useEffect(() => {
    setCatagories(JSON.parse(localStorage.getItem("catagories") || "[]"));
  }, []);

  const addCatagory = (catagory: string) => {
    const catagoriesNew = [catagory, ...catagories];
    setCatagories(catagoriesNew);
    localStorage.setItem("catagories", JSON.stringify(catagoriesNew));
  };

  return { catagories, addCatagory };
}
