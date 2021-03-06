import { useState, useEffect } from "react";
import { Catagory, ICatagory } from "utils/database.util";

export function useCatagories() {
  const [catagories, setCatagories] = useState<Catagory[]>([]);

  useEffect(() => {
    (async () => {
      setCatagories(await Catagory.getAll());
      return () => {
        setCatagories([]);
      };
    })();
  }, []);

  const addCatagory = async (data: ICatagory) => {
    const catNew = await new Catagory(data).save();
    const catagoriesNew = [catNew, ...catagories];
    setCatagories(catagoriesNew);
    return catNew;
  };

  const deleteCatagory = async (catagory: Catagory) => {
    const catsNew = catagories.slice();
    catsNew.splice(catsNew.map(cat => cat.id).indexOf(catagory.id), 1);
    await catagory.delete();
    setCatagories(catsNew);
  };

  return { catagories, addCatagory, deleteCatagory };
}
