import React from "react";

import { MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Link } from "react-router-dom";

function Home() {
  return (
    <div className=" min-h-screen w-full ">
      <header>
      {/* Hero Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Component */}
        <div className="grid items-center justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
          {/* Hero Content */}
          <div className="flex flex-col">
            {/* Hero Title */}
            <h1 className="mb-4 text-4xl font-bold md:text-6xl text-emerald-400">
              Get Plants Without The Hassles.
            </h1>
            <p className="mb-6 max-w-lg text-sm text-gray-500 sm:text-xl md:mb-10 lg:mb-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus
            </p>
            {/* Form */}
            <form
              name="email-form"
              method="get"
              className="relative mb-5 w-full max-w-xl pb-8 md:mb-6 lg:mb-4 lg:max-w-md"
            >
              <input
                type="text"
                className="h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-black"
                placeholder="Search Product"
                required=""
              />
              <input
                type="submit"
                value="Search"
                className="relative right-0 top-[5px] w-full cursor-pointer rounded-md bg-black px-6 py-2 text-center font-semibold text-white sm:absolute sm:right-[5px] sm:w-auto"
              />
            </form>
            {/* Hero Info */}
            <div className="grid w-full max-w-2xl grid-flow-row grid-cols-3 gap-4">
              <div>
                <h3 className="text-2xl font-bold md:text-3xl">5K+</h3>
                <p className="text-sm text-gray-500">Customers</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold md:text-3xl">1K+</h3>
                <p className="text-sm text-gray-500">Orders</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold md:text-3xl">150+</h3>
                <p className="text-sm text-gray-500">Products</p>
              </div>
            </div>
          </div>
          {/* Hero Image */}
          <img
            src="/hero.jpg"
            alt=""
            className="inline-block object-cover h-full w-full max-w-2xl"
          />
        </div>
      </div>
    </header>

      <div className="mx-auto w-[90%] py-10">
        {/* Product Section */}
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
          <Card className="w-[90%] md:w-full border-0 shadow-none ">
            <CardHeader>
              <CardTitle>Best Selling Plants</CardTitle>
            </CardHeader>
            <CardContent>
              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Nihil, eveniet?
            </CardContent>
            <CardFooter className="flex justify-center ">
              <Link to="/shop/product">
                <Button variant="plant" className="flex gap-2 ">
                  <span> See more </span> <MoveRight />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-orange-500 group relative m-6">
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
                <span className="block font-semibold text-xl">Peace Lily</span>
                <span className=" bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                  $36.00
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-teal-500 group relative m-6">
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
              <span className="block opacity-75 -mb-1">Indoor</span>
              <div className="flex justify-between">
                <span className="block font-semibold text-xl">Peace Lily</span>
                <span className=" bg-white rounded-full text-teal-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                  $36.00
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-purple-500 group relative m-6">
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
                src="/photo1.png"
                alt="Plant Image"
                className="relative w-40"
              />
            </CardHeader>

            {/* Card Content */}
            <CardContent className="px-6 pb-6 mt-6 text-white">
              <span className="block opacity-75 -mb-1">Indoor</span>
              <div className="flex justify-between">
                <span className="block font-semibold text-xl">Peace Lily</span>
                <span className=" bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                  $36.00
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
          <p className="text-xl sm:text-2xl text-gray-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <Link to="/shop/product">
            <Button variant="secondary" className="flex gap-2">
              <span>Explore</span> <MoveRight />
            </Button>
          </Link>
        </div>
      </div>

      <section className="w-full">
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Make every step user-centric
          </h2>
          <p className="mb-8 mt-4 max-w-lg text-base text-gray-500 md:mb-12 md:text-lg lg:mb-16">
            Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam,
            purus sit amet luctus magna fringilla urna
          </p>
        </div>
        {/* Content */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:gap-6">
          {/* Item */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <img
              src="/support.png"
              alt="support icon"
              className="inline-block h-16 w-16 object-cover rounded-full "
            />
            <h3 className="text-xl font-semibold"> 24/7 Support</h3>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam,
              purus sit.
            </p>
          </div>
          {/* Item */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <img
              src="/potted-plant_.png"
              alt="plant icon"
              className="inline-block h-16 w-16 object-cover rounded-full "
            />
            <h3 className="text-xl font-semibold"> Wide Variety </h3>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam,
              purus sit.
            </p>
          </div>
          {/* Features Item */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <img
              src="/package_.png"
              alt="package icon"
              className="inline-block h-16 w-16 object-cover rounded-full "
            />
            <h3 className="text-xl font-semibold">Fast Shipping</h3>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam,
              purus sit.
            </p>
          </div>
        </div>
      </div>
    </section>



    </div>
  );
}

export default Home;
