'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Menu, X, Home,Package,ShoppingBasket, Gauge, LogOut } from 'lucide-react'

import { Button } from '../ui/button'

// SidebarContext
const SidebarContext = createContext(undefined)

// useSidebar hook
const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

// SidebarProvider component
const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

// Sidebar component
const Sidebar = () => {
  const { isOpen, toggle } = useSidebar()
  const location = useLocation()

  const links = [
    { name: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { name: 'Orders', icon: Package, path: '/admin/orders' },
    { name: 'Product', icon: ShoppingBasket, path: '/admin/product' },
    { name: 'Feature', icon: Gauge, path: '/admin/feature' },
    
  ]

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-gray-800 text-white transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button onClick={toggle} className="lg:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        <ul>
          {links.map((link) => (
            <li key={link.name} className="mb-2">
              <Link
                to={link.path}
                className={`flex items-center px-4 py-2 text-sm ${
                  location.pathname === link.path
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                <link.icon className="mr-3 h-5 w-5" />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className='flex justify-center w-full py-5'>
          <Button className='w-[90%]' varaint="Ghost">Logout <LogOut className='mx-2'></LogOut> </Button>
        </div>

        
      </nav>
    </aside>
  )
}

// Header component
const Header = () => {
  const { toggle } = useSidebar()

  return (
    <header className="flex h-16 items-center justify-between bg-white px-4 shadow-md">
      <button onClick={toggle} className="text-gray-600 lg:hidden">
        <Menu size={24} />
      </button>
      <h1 className="text-xl font-semibold text-gray-800">Welcome, Admin</h1>
    </header>
  )
}

// AdminLayout component
const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
