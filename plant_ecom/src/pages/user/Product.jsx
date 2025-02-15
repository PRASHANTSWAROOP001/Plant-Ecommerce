import ProductDetails from "@/components/shopComponents/ProductDetails";
import ShopTile from "@/components/shopComponents/ShopTile";
import { fetchAllFilteredProdcuts, fetchProdctDetails } from "@/store/shopProductReducer";
import { addToCart, fetchCart } from "@/store/shopCartReducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "indoor",
  "outdoor",
  "succulents",
  "flowering",
  "herbs",
];

const brands = [
  "GreenThumb Co.",
  "Nature's Bliss",
  "EcoGrow",
  "Leaf & Soil",
  "Urban Jungle",
  "Plantify",
  "GrowMore",
  "FloraRoots",
];


function createSearchParamsHelper(params){
  //creates the string for params like category="men"....
  let query = []
  for(const [key,value] of Object.entries(params)){
    if(Array.isArray(value) && value.length > 0){
      query.push(`${key}=${encodeURIComponent(value.join(","))}`)
    }
    else if (value) {
      query.push(`${key}=${encodeURIComponent(value)}`)

    }
  }

  return query.join("&")
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return JSON.parse(sessionStorage.getItem("selectedCategory")) || [];
  });

  const [selectedBrands, setSelectedBrands] = useState(() => {
    return JSON.parse(sessionStorage.getItem("selectedBrands")) || [];
  });

  const [sortOption, setSortOption] = useState(() => {
    return JSON.parse(sessionStorage.getItem("sortOption")) || "price-asc";
  });

  const [searchParams, setSearchParams] = useSearchParams()

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const { productList, productDetails} = useSelector((state) => state.shopProduct);

  const {user} = useSelector((state)=> state.auth)

  const {toast} = useToast()



  const dispatch = useDispatch();

  console.log("Product list shopping side: ", productList);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    const filters = {
      "category":params.category ? params.category.split(","):[],
      "brand":params.brand ? params.brand.split(","):[],
      "sort": params.sort || "price-asc"
    }
    dispatch(fetchAllFilteredProdcuts(filters));
  }, [dispatch, searchParams]);

  useEffect(() => {
    sessionStorage.setItem(
      "selectedCategory",
      JSON.stringify(selectedCategory)
    );
    sessionStorage.setItem("selectedBrands", JSON.stringify(selectedBrands));
    sessionStorage.setItem("sortOption", JSON.stringify(sortOption));
  }, [selectedBrands, selectedCategory, sortOption]);


  useEffect(()=>{
    const filters = {
      "category": selectedCategory,
      "brand": selectedBrands,
      "sort": sortOption
    }

    let queryString = createSearchParamsHelper(filters)
    setSearchParams(new URLSearchParams(queryString))

  },[selectedBrands, selectedCategory, sortOption])


  useEffect(()=>{

    if (productDetails != null){
      setOpenDetailsDialog(true)
    }

  },[productDetails])

  // console.log(
  //   "filters in order: sortOptions, toggleBrands, toggleCategory",
  //   sortOption,
  //   selectedBrands,
  //   selectedCategory
  // );

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };


  function handleGetProductDetails(getCurrId){
    // console.log(getCurrId);
    dispatch(fetchProdctDetails(getCurrId))
  }

  function handleAddToCart(currProductId){
    // console.log(currProductId);

    dispatch(addToCart({ userId:user.id, productId:currProductId, quantity:1 })).then((data)=>{
      if(data.payload?.success){
        toast({
          title:"Product Added To Cart",
        })

        dispatch(fetchCart(user?.id)).then((data)=>{
          console.log(data);
        })
    }
    })
    
  }


  // console.log("fetchedDetailed Product: ", productDetails)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto`}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-emerald-800">
              Plant Categories
            </h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className=" rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-gray-700 capitalize">{category}</span>
                </label>
              ))}
            </div>

            <h2 className="text-lg font-semibold mt-8 mb-4 text-emerald-800">
              Brands
            </h2>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Sort and Sidebar Toggle Options */}
            <div className="flex justify-between items-center mb-6">
              {/* Toggle Sidebar */}
              <button
                onClick={toggleSidebar}
                className="block lg:hidden px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200"
              >
                {isSidebarOpen ? "Hide Filters" : "Show Filters"}
              </button>

              {/* Sort Options */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
              >
                
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productList.map((product) => (
                <ShopTile handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} key={product._id} product={product} />
              ))}
            </div>

            <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}></ProductDetails>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default App;
