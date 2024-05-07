import { RootState } from "@/app/store";
import { CategorySelectProps } from "@/types/CategorySelectProps";
import React from "react";
import { useSelector } from "react-redux";



const CategorySelect: React.FC<CategorySelectProps> = ({value, onChange,style }) => {
  const categories=useSelector((state:RootState) =>(state.categories.categories))
  return (
    <select
      id="category"
      name="category"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className={`mt-1 block w-full text-sm ${style}`}
    >
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category.category_id} value={category.category_id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
