import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profile, setProfile] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      setProfile(JSON.parse(adminAuth));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };

  const getInitials = name => {
    return name ? name.charAt(0).toUpperCase() : 'A';
  };

  return (
    <header className="sticky top-0 z-40 bg-white w-full p-2 sm:p-4 md:p-5 lg:p-6 flex justify-between items-center border-b-2 border-outline shadow-sm">
      {profile && (
        <div className="relative ml-auto" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full bg-primaryGreen text-white flex items-center justify-center text-lg font-semibold"
          >
            {getInitials(profile.name)}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-outlineGray">
              <div className="px-4 py-2 border-b border-outlineGray">
                <p className="text-sm font-medium text-textGray">{profile.name}</p>
                <p className="text-xs text-gray-500">{profile.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
