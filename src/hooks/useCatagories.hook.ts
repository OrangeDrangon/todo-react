import { useState, useEffect } from "react";
import { Catagory } from "src/utils/database.util";

export function useCatagories() {
  const [catagories, setCatagories] = useState<Catagory[]>([]);

  useEffect(() => {
    (async () => {
      setCatagories(await Catagory.getAll());
    })();
  }, []);

  const addCatagory = async (data: { label: string; value: string }) => {
    const catNew = await new Catagory(data).save();
    const catagoriesNew = [catNew, ...catagories];
    setCatagories(catagoriesNew);
    return catNew;
  };

  return { catagories, addCatagory };
}
