export const addProductFormElements = [
    {
      label: "Product Name",
      name: "name",
      componentType: "input",
      type: "text",
      placeholder: "Enter product name",
    },
    {
      label: "Scientific Name",
      name: "scientificName",
      componentType: "input",
      type: "text",
      placeholder: "Enter scientific name",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "indoor", label: "Indoor" },
        { id: "outdoor", label: "Outdoor" },
        { id: "succulents", label: "Succulents" },
        { id: "flowering", label: "Flowering" },
      ],
    },
    {
      label: "Care Level",
      name: "careLevel",
      componentType: "select",
      options: [
        { id: "easy", label: "Easy" },
        { id: "moderate", label: "Moderate" },
        { id: "advanced", label: "Advanced" },
      ],
    },
    {
      label: "Light Requirement",
      name: "lightRequirement",
      componentType: "select",
      options: [
        { id: "low", label: "Low" },
        { id: "medium", label: "Medium" },
        { id: "high", label: "High" },
      ],
    },
    {
      label: "Stock",
      name: "stock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "sellPrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price",
    },
  ];

  export const categories = [
    "Indoor Plants",
    "Outdoor Plants",
    "Succulents",
    "Flowering Plants",
    "Herbs",
  ];
  
  export const brands = [
    "GreenThumb Co.",
    "Nature's Bliss",
    "EcoGrow",
    "Leaf & Soil",
    "Urban Jungle",
    "Plantify",
    "GrowMore",
    "FloraRoots",
  ];
  
  