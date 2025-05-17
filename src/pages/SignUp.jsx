
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { userRegistration } from '../services/allApies';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const navigate=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signing up with:', { Name, Email, Password });

    //  registration logic
    try{
    const result = await userRegistration({ Name, Email, Password })

    console.log(result);

    if (result.status == 201) {
      toast({
        title: "Success",
        description: `User Registration Successfully..!`
      });
      setName('');
      setEmail('');
      setPassword('');
      navigate('/signin')

    } else {
      console.log(result.response.data);

      toast({
        title: "Error",
        description: result.response?.data || 'Registration failed',
        variant: "destructive"
      });
    }
  }catch(err){
    console.log(err);
    toast({
            title: "Error",
            description: err,
            variant: "destructive"
          });
    
  }

  };

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left Side - Blue Background with Content */}
      <div className="hidden md:flex md:w-1/2 bg-brand-blue text-white p-12 flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute w-40 h-40 bg-brand-dark-blue opacity-20 rounded-full -top-10 -left-10"></div>
        <div className="absolute w-60 h-60 bg-brand-dark-blue opacity-10 rounded-full bottom-10 -right-20"></div>
        <div className="absolute w-20 h-20 bg-brand-orange opacity-20 rounded-full top-1/3 left-1/3 transform rotate-45"></div>
        <div className="z-10 text-center">
          <h1 className="text-3xl font-bold mb-6">Hello Friend!</h1>
          <p className="mb-8 max-w-sm">
            Enter your personal details and start your journey with us
          </p>
          <Link
            to="/signin"
            className="inline-block border-2 border-white text-white px-8 py-2 rounded-full hover:bg-white hover:text-brand-blue transition-colors"
          >
            Already have an account?          </Link>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-brand-orange mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-orange text-white py-3 rounded-md hover:bg-amber-500 transition-colors"
            >
              SIGN UP
            </button>

            <div className="mt-8 text-center text-gray-600 md:hidden">
              <p>Already have an account?</p>
              <Link to="/signin" className="text-brand-blue hover:underline">
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
