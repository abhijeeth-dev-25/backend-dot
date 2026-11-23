import { useState } from 'react'
import useApi from '../../shared/useApi'
import { useAuthContext } from '../context/authProvider';
import { useNavigate } from 'react-router';

const RegisterPage = () => {

  const { setUser, setAccessToken } = useAuthContext();
  const api = useApi();

  const navigate = useNavigate();

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault();

    const req = await api.post('/user/register', {fullname, email, password})

    console.log(req.data)

    setUser(req.data.data.user);
    setAccessToken(req.data.data.accessToken);

    navigate('/profile');
  }



  return (
    <main className='flex items-center justify-center h-screen '>
      <form 
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 bg-red-50 p-10 rounded-2xl'>

        <input 
        onChange={(e) => setFullName(e.target.value)}
        className='flex-col gap-4 border p-2 rounded-sm'
        type="text" 
        value={fullname}
        placeholder='Enter fullname'  />

        <input 
        onChange={(e) => setEmail(e.target.value)}
         className='border p-2 rounded-sm'
         type="email"
         value={email}
         placeholder='Enter email' />

        <input 
        onChange={(e) => setPassword(e.target.value)}
        className='border p-2 rounded-sm'
        type="password" 
        value={password}
        placeholder='Enter password' />

        <button className='bg-black rounded-2xl text-white p-2' type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default RegisterPage;
