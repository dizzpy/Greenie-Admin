import React from 'react';
import loginimg from '../../assets/login.svg';

function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Logging in user:', formData);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-12">
      <div className="bg-white px-12 flex flex-col md:flex-row w-full max-w-[1440px]">
        <div className="md:w-1/2 flex justify-center items-center">
          <img src={loginimg} alt="Login" className="w-full max-w- md:max-w-[500px] h-auto" />
        </div>

        <div className="md:w-1/2  flex flex-col items-center md:py-12 md:mt-5">
          <h2 className="text-[24px] text-textGray font-sans font-normal text-center mb-6 ">
            {' '}
            Log in to your Account{' '}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail Address"
                required
                className="min-w-[350px] md:w-[400px] px-5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primaryGreen text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              {' '}
              Login to Account{' '}
            </button>
          </form>
          <p className="text-center text-textGray mt-4">
            Don’t have an account?{' '}
            <a href="/register" className="text-primaryGreen">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
