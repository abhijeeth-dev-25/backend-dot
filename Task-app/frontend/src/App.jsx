import { useForm } from "react-hook-form"



const App = () => {

  const { 
    register,
    handleSubmit,
    formState:{ errors },
  } = useForm();


  return (
    <div className='h-screen w-full p-10'>
      <div className='ml-5'>Hello!...</div>
      <form 
      onSubmit={handleSubmit((data) => console.log(data))}
      className='bg-gray-200 h-70 w-130 rounded-4xl flex flex-col items-center justify-center gap-3'>
        <input 
        {...register('title')}
        className='h-10 w-80 bg-white outline-none rounded-full p-4'
        placeholder='title'
        type="text" />
        <input 
        {...register('subject')}
        className='h-10 w-80 bg-white outline-none rounded-full p-4'
        placeholder='subject'
        type="text" />
        <button className='bg-black text-white h-10 w-30 rounded-full'>Submit</button>
      </form>
    </div>
  )
}

export default App