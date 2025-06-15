import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Settings,
  LogOut,
  Barcode,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Sheet } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logoutUser } from "@/store/authReducer";
import CartWrapper from "./CartWrapper";
import { fetchCart } from "@/store/shopCartReducer";

function ShopLayout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.shopCart);

  const [sheetOpen, setSheetOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("you have logged out");
    dispatch(logoutUser());
    navigate("/shop/home");
  };

  const navigateToAcccount = () => {
    navigate("/shop/account");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeOnScroll = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const closeOnResize = () => {
    if (window.innerWidth >= 768 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", closeOnScroll);
    window.addEventListener("resize", closeOnResize);

    return () => {
      window.removeEventListener("scroll", closeOnScroll);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(fetchCart(user?.id));
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <nav className="w-full px-5 flex justify-between items-center py-4 shadow-md">
        <div>
          <Link to="/">
            {" "}
            <h1 className="text-xl font-semibold"> Green Thumb </h1>{" "}
          </Link>
        </div>

        <div className=" hidden md:flex items-center">
          <ul className="flex gap-10 text-lg  px-10 ">
            <li className="space-y-2 hover:text-muted-foreground text-gray-800">
              <Link to="/"> Home </Link>
            </li>
            <li className="space-y-2 hover:text-muted-foreground text-gray-800">
              <Link to="/shop/product">Product </Link>
            </li>
            <li className="space-y-2 hover:text-muted-foreground text-gray-800">
              <Link> Contact </Link>
            </li>
            <li className="space-y-2 hover:text-muted-foreground text-gray-800">
              <Link> About </Link>
            </li>
          </ul>

          <div className="flex items-center gap-10 ">
            {isAuthenticated && (
              <Sheet open={sheetOpen} onOpenChange={() => setSheetOpen(false)}>
                <Button
                  variant={"ghost"}
                  size="icon"
                  onClick={() => setSheetOpen(true)}
                >
                  <ShoppingCart size={24} />
                </Button>
                <CartWrapper cartItems={cartItems} />
              </Sheet>
            )}

            <Link
              to={"/auth/login"}
              className={` ${
                isAuthenticated ? "hidden" : "block"
              } text-gray-800 hover:scale-110 hover:duration-100 hover:text-green-400 `}
            >
              {" "}
              <User></User>
            </Link>
            {isAuthenticated ? (
              <DropdownMenu>
                {/* Avatar as Trigger */}
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback>
                      {user?.userName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                {/* Dropdown Menu Content */}
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white shadow-md"
                >
                  {/* Account Info */}
                  <DropdownMenuItem onSelect={navigateToAcccount}>
                    <User className="mr-2 h-4 w-4 text-pink-500" />
                    <span className="text-pink-500">Account </span>
                  </DropdownMenuItem>

                  {/* Settings Page */}
                  <DropdownMenuItem
                    onSelect={() => console.log("Navigate to Settings")}
                  >
                    <Settings className="mr-2 h-4 w-4 text-gray-500" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem onSelect={() => navigate("/shop/checkout")}>
                    <Barcode className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-green-500"> Checkout </span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Logout */}
                  <DropdownMenuItem onSelect={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-red-500"> Logout </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md rounded-b-lg py-4 px-6">
          <ul className="space-y-2 text-center">
            {["Home", "Product", "Contact", "About"].map((item) => (
              <li key={item} className="w-full">
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block py-3 text-center w-full hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {isAuthenticated && (
            <div className="pt-4 border-t border-gray-200 mt-4">
              <Link
                to="/shop/checkout"
                className="flex items-center justify-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={toggleMenu}
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
              </Link>
            </div>
          )}
          <div className="flex items-center justify-center mt-4">
            <Button onClick={handleLogout} variant="destructive" size="icon">
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      )}

      <main className="w-full min-h-screen">
        <Outlet></Outlet>
      </main>

      <footer className="bg-green-50 border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold text-green-800">
                  GreenThumb
                </span>
              </div>
              <p className="text-sm text-green-700 max-w-xs">
                Your trusted partner for bringing nature into your home. Quality
                plants, expert care tips, and everything you need to grow.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wider">
                Shop
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/shop/product"
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    All Plants
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/product"
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    Indoor Plants
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/product"
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    Outdoor Plants
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/product"
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    Plant Care
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wider">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/shop/home"
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    Plant Care Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/home"
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/home"
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/home"
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wider">
                Contact
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-green-600">
                  <Mail className="h-4 w-4" />
                  <span>hello@greenthumb.com</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-green-600">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-green-600">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>
                    123 Garden Street
                    <br />
                    Plant City, PC 12345
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-8 border-t border-green-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex flex-wrap justify-center sm:justify-start space-x-6">
                <Link
                  to="/privacy"
                  className="text-xs text-green-600 hover:text-green-800 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-xs text-green-600 hover:text-green-800 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/cookies"
                  className="text-xs text-green-600 hover:text-green-800 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
              <p className="text-xs text-green-600">
                © {new Date().getFullYear()} GreenThumb. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ShopLayout;
