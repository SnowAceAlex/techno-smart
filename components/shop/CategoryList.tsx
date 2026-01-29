import { Category } from "@/sanity.types";
import React from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }: Props) => {
  return <div className="w-full bg-white px-5 pt-5 pb-2">
    <Title className="text-base font-bold">
      Products Category
    </Title>
    <RadioGroup value={selectedCategory || ""} onValueChange={setSelectedCategory} className="mt-2 space-y-1">
      {categories.map((category) => (
        <div key={category?._id} className="flex items-center mt-1.5 space-x-2 hover:cursor-pointer">
        <RadioGroupItem value={category.slug?.current as string} 
        id={category.slug?.current as string} className="rounded-sm"/>
          <Label
          htmlFor={category.slug?.current}
          className={`${selectedCategory === category?.slug?.current ? 
            "font-semibold text-dark_blue" : "font-normal "}`}
          >{category?.title}</Label>
        </div>
      ))}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-1 hover:text-dark_blue hoverEffect text-left"
          >
            Reset selection
          </button>
        )}
    </RadioGroup>
  </div>;
};

export default CategoryList;
