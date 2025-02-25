import React, { useEffect, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon, MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import  plant1 from "/plant-1.jpg";
import plant2 from "/plant-2.jpg";
import plant3 from "/plant-3.jpg";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Link} from "react-router-dom";

import { useNavigate } from "react-router-dom";



function Home() {
  const slides = [plant1, plant2, plant3]
  const [currentSlide, setCurrentSlide] = useState(0)

  const navigate = useNavigate()

  function changeRightSlide() {
    setCurrentSlide((prevSlides) => (prevSlides == slides.length - 1 ? 0 : prevSlides + 1))
  }

  function changeLeftSlide() {
    setCurrentSlide((prevSlides) => (prevSlides == 0 ? slides.length - 1 : prevSlides - 1))
  }

  useEffect(() => {
    const timer = setInterval(changeRightSlide, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])


  function handleNavigateToProduct(Category){

    sessionStorage.removeItem("selectedCategory");

    const newFilter = [Category]

    sessionStorage.setItem("selectedCategory", JSON.stringify(newFilter))

    navigate("/shop/product")
      
  }

  return (
    <div className=" flex flex-col min-h-screen w-full ">
      <header className="relative w-full h-[700px] overflow-hidden ">
        {slides.map((value, index) => (
          <img
            key={index}
            alt={`plantImage` & { index }}
            src={value}
            className={`absolute top-0 left-0 w-full h-full object-cover ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          ></img>
        ))}
      </header>
      <Button
        onClick={changeLeftSlide}
        className="absolute top-1/2 left-4"
        variant="outline"
        size="icon"
      >
        <ChevronLeftIcon className="w-4 h-4"></ChevronLeftIcon>
      </Button>

      <Button
        onClick={changeRightSlide}
        className="absolute top-1/2 right-4"
        variant="outline"
        size="icon"
      >
        <ChevronRightIcon className="w-4 h-4"></ChevronRightIcon>
      </Button>

      <div className="mx-auto w-[90%] py-10">
        {/* Product Section */}

        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Transform Your Space with Living Beauty
          </h1>
          <p className="text-base md:text-lg font-medium  text-gray-700 max-w-2xl">
            Curated collection of air-purifying companions and mood-boosting botanicals. 
            Whether you're a seasoned plant parent or just starting your green journey, 
            find your perfect match in our carefully nurtured selection.
          </p>
        </div>

        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
          <Card onClick={()=>handleNavigateToProduct("indoor")} className="max-w-xs cursor-pointer rounded-lg overflow-hidden shadow-lg bg-orange-500 group relative m-6">
            {/* Background SVG */}
            <div className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform">
              <svg className="opacity-10" viewBox="0 0 375 283" fill="none">
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
            </div>

            {/* Card Image */}
            <CardHeader className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3 bg-[radial-gradient(black,transparent_60%)] opacity-20 transform rotate-[20deg] scale-y-[0.6]"></div>
              <img
                src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
                alt="Plant Image"
                className="relative w-40"
              />
            </CardHeader>

            {/* Card Content */}
            <CardContent className="px-6 pb-6 mt-6 text-white">
              <span className="block opacity-75 -mb-1">Indoor</span>
              <div className="flex justify-between">
                <span className="block font-semibold text-xl">Money Plant</span>
                <span className=" bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                  60+ Plants
                </span>
              </div>
            </CardContent>
          </Card>

          <Card onClick={()=>handleNavigateToProduct("outdoor")} className="max-w-xs cursor-pointer rounded-lg overflow-hidden shadow-lg bg-teal-500 group relative m-6">
            {/* Background SVG */}
            <div className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform">
              <svg className="opacity-10" viewBox="0 0 375 283" fill="none">
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
            </div>

            {/* Card Image */}
            <CardHeader className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3 bg-[radial-gradient(black,transparent_60%)] opacity-20 transform rotate-[20deg] scale-y-[0.6]"></div>
              <img
                src="/photo101.png"
                alt="Plant Image"
                className="relative w-40"
              />
            </CardHeader>

            {/* Card Content */}
            <CardContent className="px-6 pb-6 mt-6 text-white">
              <span className="block opacity-75 -mb-1">Outdoor</span>
              <div className="flex justify-between">
                <span className="block font-semibold text-xl">Basil</span>
                <span className=" bg-white rounded-full text-teal-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                  100+ Plants
                </span>
              </div>
            </CardContent>
          </Card>

          <Card onClick={()=>handleNavigateToProduct("flowering")} className="max-w-xs rounded-lg cursor-pointer overflow-hidden shadow-lg bg-purple-500 group relative m-6">
            {/* Background SVG */}
            <div className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform">
              <svg className="opacity-10" viewBox="0 0 375 283" fill="none">
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
            </div>

            {/* Card Image */}
            <CardHeader className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3 bg-[radial-gradient(black,transparent_60%)] opacity-20 transform rotate-[20deg] scale-y-[0.6]"></div>
              <img
                src="/Tulip.png"
                alt="Plant Image"
                className="relative w-40"
              />
            </CardHeader>

            {/* Card Content */}
            <CardContent className="px-6 pb-6 mt-6 text-white">
              <span className="block opacity-75 -mb-1">Flowering</span>
              <div className="flex justify-between">
                <span className="block font-semibold text-xl">Tulip</span>
                <span className=" bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                  30+ Flowers
                </span>
              </div>
            </CardContent>
          </Card>
          <Card  onClick={()=>handleNavigateToProduct("succulents")} className="max-w-xs cursor-pointer rounded-lg overflow-hidden shadow-lg bg-pink-500 group relative m-6">
            {/* Background SVG */}
            <div className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform">
              <svg className="opacity-10" viewBox="0 0 375 283" fill="none">
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
            </div>

            {/* Card Image */}
            <CardHeader className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3 bg-[radial-gradient(black,transparent_60%)] opacity-20 transform rotate-[20deg] scale-y-[0.6]"></div>
              <img
                src="/succulent-plant.png"
                alt="Plant Image"
                className="relative w-40"
              />
            </CardHeader>

            {/* Card Content */}
            <CardContent className="px-6 pb-6 mt-6 text-white">
              <span className="block opacity-75 -mb-1">Succulent</span>
              <div className="flex justify-between">
                <span className="block font-semibold text-xl">Aloe Vera</span>
                <span className=" bg-white rounded-full text-pink-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                  15+ Succulents
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400">
        <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center justify-around mx-auto py-10">
          <div className="w-full max-w-[350px] h-[500px] rounded-xl">
            <img
              src="/cat-1.jpg"
              alt="natural plant image"
              className="w-full h-[400px] object-fill rounded-t-xl"
            />
            <div className="bg-white py-4 rounded-b-xl">
              <h1 className="text-xl font-bold text-center">Natural Plant</h1>
            </div>
          </div>

          <div className="w-full max-w-[350px] h-[500px] rounded-xl">
            <img
              src="/cat-3.jpg"
              alt="natural plant image"
              className="w-full h-[400px] object-fill rounded-t-xl"
            />
            <div className="bg-white py-4 rounded-b-xl">
              <h1 className="text-xl font-bold text-center">
                Artificial Plant
              </h1>
            </div>
          </div>

          <div className="w-full max-w-[350px] h-[500px] rounded-xl">
            <img
              src="/cat-5.jpg"
              alt="natural plant image"
              className="w-full h-[400px] object-fill rounded-t-xl"
            />
            <div className="bg-white py-4 rounded-b-xl">
              <h1 className="text-xl font-bold text-center">
                Plant Accessories
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center pb-10 pt-5">
          <p className="text-xl sm:text-2xl text-center">
            "Plants make people happy. Let us prove it to you."
            <br />
            - Join 100+ Happy Plant Parents
          </p>

          <Link to="/shop/product">
            <Button variant="secondary" className="flex gap-2">
              <span>Start Your Plant Journey</span> <MoveRight />
            </Button>
          </Link>
        </div>
      </div>

      <section className="w-full">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold md:text-5xl">
              Cultivating Exceptional Experiences
            </h2>
            <p className="mb-8 mt-4 max-w-lg text-base text-gray-700 md:mb-12 md:text-lg lg:mb-16">
              From our greenhouse to your home - a seamless journey with expert guidance 
              at every step
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:gap-6">
            <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
              <img
                src="/support.png"
                alt="24/7 support icon"
                className="inline-block h-16 w-16 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold">Plant Parenthood Support</h3>
              <p className="text-sm text-gray-700">
                Real horticulturists available round-the-clock. Get care tips, 
                troubleshoot issues, or just share plant photos - we're always growing with you.
              </p>
            </div>
            <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
              <img
                src="/potted-plant_.png"
                alt="Plant variety icon"
                className="inline-block h-16 w-16 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold">500+ Green Companions</h3>
              <p className="text-sm text-gray-700">
                From tropical rarities to desert jewels. Each plant comes with 
                a detailed care passport and lifetime support.
              </p>
            </div>
            <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
              <img
                src="/package_.png"
                alt="Fast shipping icon"
                className="inline-block h-16 w-16 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold">Climate-Safe Delivery</h3>
              <p className="text-sm text-gray-700">
                Arriving in 2-5 days via eco-friendly packaging. Every plant 
                comes with our 10-day health guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
