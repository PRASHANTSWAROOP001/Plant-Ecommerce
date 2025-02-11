import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Sidebar({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  onCategoryChange,
  onBrandChange,
  isOpen,
  onClose,
}) {
  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          {categories.map((category) => (
            <div key={category} className="flex items-center mb-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onCategoryChange([...selectedCategories, category]);
                  } else {
                    onCategoryChange(
                      selectedCategories.filter((c) => c !== category)
                    );
                  }
                }}
              />
              <label
                htmlFor={`category-${category}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Brands</h3>
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mb-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onBrandChange([...selectedBrands, brand]);
                  } else {
                    onBrandChange(selectedBrands.filter((b) => b !== brand));
                  }
                }}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
