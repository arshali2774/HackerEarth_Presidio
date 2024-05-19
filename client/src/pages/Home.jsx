import home from '/home.jpg';
const Home = () => {
  return (
    <main className='flex w-[90%] mx-auto h-[90vh] items-center justify-center gap-[10rem]'>
      <h1 className='text-5xl'>
        Welcome to new world of <br /> Renting
      </h1>
      <img src={home} alt='home illustration' className='h-[30rem]' />
    </main>
  );
};
export default Home;
