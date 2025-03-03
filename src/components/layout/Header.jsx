import { useEffect, useState } from 'react';

function Header() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/user/profile')
      .then(response => response.json())
      .then(data => setProfile(data))
      .catch(error => {
        console.error('Error fetching profile:', error);
        // Set an example profile if the API call fails
        setProfile({
          name: 'John Doe',
          imageUrl: 'https://via.placeholder.com/40',
        });
      });
  }, []);

  return (
    <header className="bg-white w-full p-2 sm:p-4 md:p-5 lg:p-6 flex justify-between items-center border-b-2 border-outline">
      {profile ? (
        <img
          src={profile.imageUrl || 'https://via.placeholder.com/40'}
          alt="Profile"
          className="w-10 h-10 rounded-full bg-gray-300 object-cover ml-auto"
        />
      ) : (
        <p className=" text-text-gray">Loading...</p>
      )}
    </header>
  );
}

export default Header;
