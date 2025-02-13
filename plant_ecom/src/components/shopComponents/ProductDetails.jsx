import { Dialog, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import { Star, Leaf, Droplet, Sun, ThermometerSun, DollarSign } from "lucide-react"

function ProductDetails({ open, setOpen, productDetails }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={productDetails?.imageUrl[0] || "/placeholder.svg"}
                alt={productDetails?.name}
                width={600}
                height={600}
                className="aspect-square w-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Plant Care</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Leaf className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm capitalize">Care Level: {productDetails?.careLevel}</span>
                </div>
                <div className="flex items-center">
                  <Sun className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm  capitalize">Light: {productDetails?.lightRequirement}</span>
                </div>
                <div className="flex items-center">
                  <Droplet className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm">Water: Weekly</span>
                </div>
                <div className="flex items-center">
                  <ThermometerSun className="w-5 h-5 text-red-400 mr-2" />
                  <span className="text-sm">Temperature: 18-24°C</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-extrabold text-green-800">{productDetails?.name}</h1>
                <p className="text-xl italic text-green-600">{productDetails?.scientificName}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">{productDetails?.sellPrice.toFixed(2)}</span>
                </div>
                {productDetails?.price !== productDetails?.sellPrice && (
                  <span className="text-lg line-through text-gray-500">${productDetails?.price.toFixed(2)}</span>
                )}
              </div>
              <p className="text-gray-600">{productDetails?.description}</p>
            </div>
            <div className="mt-6 space-y-4">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Add to Cart</Button>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= (productDetails?.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{productDetails?.reviewCount} reviews</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          {/* Placeholder for reviews */}
          <p className="text-gray-600 italic">No reviews yet. Be the first to review this product!</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetails

