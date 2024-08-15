import reactLogo from '@assets/react.svg';
import viteLogo from '@assets/vite.svg';
import tsLogo from '@assets/ts.svg';
import eslintLogo from '@assets/eslint.svg';
import prettierLogo from '@assets/prettier.svg';
import axiosLogo from '@assets/axios.svg';
import tenacityDev from '@assets/tenacity-dev.png';

function App() {
  return (
    <main className='darkbg-zinc-900 darktext-gray-100 flex h-screen justify-center bg-blue-200 text-gray-900'>
      <section className='my-4 max-w-screen-md flex-col space-y-4 p-4'>
        <div className='mb-4 flex h-16 justify-between'>
          <img className='h-full w-full' src={reactLogo} alt='react logo' />
          <img className='h-full w-full' src={viteLogo} alt='vite logo' />
          <img className='h-full w-full' src={tsLogo} alt='typescript logo' />
          <img className='h-full w-full' src={eslintLogo} alt='eslint logo logo' />
          <img className='h-full w-full' src={prettierLogo} alt='prettier logo' />
          <img className='h-full w-full' src={axiosLogo} alt='axios logo' />
        </div>
      </section>
    </main>
  );
}

export default App;
