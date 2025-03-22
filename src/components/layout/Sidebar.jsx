import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCog,
  Swords,
  ListCheck,
  StickyNote,
  Trophy,
  ShoppingCart,
  Settings,
  Menu,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  function toggleShop() {
    setIsShopOpen((prev) => !prev);
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-textGray p-4 border-r-2 border-outline transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:w-60`}
      >
        <img
          src="https://via.placeholder.com/120x40?text=Logo"
          alt="Logo"
          className="w-30 h-auto mb-24 mt-5"
        />
        <nav>
          <ul>
            <li className="mb-2 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <LayoutDashboard className="mr-2" size={20} />
                <span className="text-lg">Dashboard</span>
              </Link>
            </li>
            <li className="mb-2 flex items-center mt-6">
              <Link to="/users" className="flex items-center space-x-2">
                <UserCog className="mr-2" size={20} />
                <span className="text-lg">Users Management</span>
              </Link>
            </li>
            <li className="mb-2 flex items-center mt-6">
              <Link to="/challenges/active-challenges" className="flex items-center space-x-2">
                <Swords className="mr-2" size={20} />
                <span className="text-lg">Challenges</span>
              </Link>
            </li>
            <li className="mb-2 flex items-center mt-6">
              <Link to="/proofs/proof-submission" className="flex items-center space-x-2">
                <ListCheck className="mr-2" size={20} />
                <span className="text-lg">Proof Submission</span>
              </Link>
            </li>
            <li className="mb-2 flex items-center mt-6">
              <Link to="/post/post-management" className="flex items-center space-x-2">
                <StickyNote className="mr-2" size={20} />
                <span className="text-lg">Post Management</span>
              </Link>
            </li>
       
            <li className="mb-2 flex items-center mt-6">
              <Link to="/badges" className="flex items-center space-x-2">
                <Trophy className="mr-2" size={20} />
                <span className="text-lg">Badges</span>
              </Link>
            </li>
            <li className="mb-2 flex items-center mt-6 cursor-pointer" onClick={toggleShop}>
              <div className="flex items-center space-x-2">
                <ShoppingCart className="mr-2" size={20} />
                <span className="text-lg">Shop Management</span>
              </div>
            </li>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isShopOpen ? 'auto' : 0, opacity: isShopOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <li className="mb-2 flex pl-8 items-center mt-3">
                <Link to="/products" className="flex items-center space-x-2">
                  <ArrowRight className="mr-2" size={20} />
                  <span className="text-base">Products</span>
                </Link>
              </li>
              <li className="mb-2 flex pl-8 items-center mt-3">
                <Link to="/orders" className="flex items-center space-x-2">
                  <ArrowRight className="mr-2" size={20} />
                  <span className="text-base">Orders</span>
                </Link>
              </li>
            </motion.div>
            <li className="mb-2 flex items-center mt-6">
              <Link to="/settings" className="flex items-center space-x-2">
                <Settings className="mr-2" size={20} />
                <span className="text-lg">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-2xl text-gray-600"
        onClick={toggleSidebar}
      >
        <Menu size={20} />
      </button>
    </div>
  );
}

export default Sidebar;
