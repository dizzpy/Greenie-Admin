import React from 'react';
import registerimg from '../../assets/register.svg';

function Register() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Registering user:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="bg-white px-12 flex flex-col md:flex-row w-full max-w-[1440px]">
        <div className=" md:w-1/2 flex justify-center items-center">
          <img src={registerimg} alt="Register" className="w-full max-w- md:max-w-[500px] h-auto" />
        </div>

        <div className="md:w-1/2  flex flex-col items-center md:py-12 md:mt-5">
          <h2 className="text-[24px] text-textGray font-sans font-normal text-center mb-6 ">
            Create an Accont
          </h2>

          <form onSubmit={handleSubmit} className="text--textGray">
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="min-w-[350px] md:w-[400px] px-5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
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
                className="min-w-[350px] md:w-[400px] px-5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primaryGreen text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Create
            </button>
          </form>
          <p className="text-center text-textGray mt-4">
            {' '}
            Already have an account?{' '}
            <a href="/login" className="text-primaryGreen">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
