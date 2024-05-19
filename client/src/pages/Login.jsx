import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Login = () => {
  const queryClient = useQueryClient();
  const [loggedIn, setIsLoggedIn] = useOutletContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formData) =>
      axios.post('http://localhost:3000/api/users/login', formData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User Logged in successfully');
    },
  }); // Define mutation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(formData);
      setIsLoggedIn(true);
      navigate('/properties');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className='flex items-center justify-center h-[90vh]'>
      <form
        className='bg-emerald-400 w-[30rem] h-[40rem] rounded-md p-6'
        onSubmit={handleSubmit}
      >
        <h2 className='text-3xl mb-4'>Log In</h2>

        <div className='flex items-center border-2 border-white justify-center gap-4 rounded-md py-4 mb-4'>
          <label htmlFor='email' className='text-lg'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='h-[30px] bg-emerald-500 rounded-sm px-2 focus:outline-none'
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className='flex items-center border-2 border-white justify-center gap-4 rounded-md py-4 mb-4'>
          <label htmlFor='password' className='text-lg'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='h-[30px] bg-emerald-500 rounded-sm px-2 focus:outline-none'
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          type='submit'
          className='bg-teal-500 rounded-md px-5 py-2 text-white disabled:bg-slate-500'
          disabled={isPending}
        >
          Log in
        </button>
      </form>
    </div>
  );
};
export default Login;
