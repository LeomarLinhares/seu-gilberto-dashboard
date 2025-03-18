import React from 'react';
import RankingPage from './pages/RankingPage';

const ballrows = 10;
const ballcolumns = 4;

const lines = 5;

interface CrossProps {
  className: string;
}

const Cross = ({ className }: CrossProps) => (
  <div
    className={className}
    style={{
      clipPath: 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)',
      background: 'rgba(255, 255, 255, 0.1)',
    }}
  />
);

function App() {
  return (
    <div
      className="App relative overflow-hidden h-screen" 
      style={{
        background: 'repeating-linear-gradient(90deg, #34d399, #34d399 100px, #6ee7b7 100px, #6ee7b7 200px)'
      }}
    >
      <div className="z-10 absolute w-full h-full bg-gradient-to-br from-green-400 to-green-800 opacity-60" />
      <div
        className="z-10 absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)'
        }}
      />
      <div className="z-10 absolute w-[10px] h-full bg-white left-[90px]" />
      <div className="z-10 absolute w-100 h-100 border-white border border-10 rounded-full -left-[100px] -bottom-40" />
      <div className='z-10 absolute space-y-2 left-[110px] bottom-[290px]'>
        {
          Array.from({ length: ballrows }).map((_, i) => (
            <div key={i} className='flex space-x-2 items-center'>
              {
                Array.from({ length: ballcolumns }).map((_, j) => (
                  <div key={j} className='rounded-full bg-green-500 w-3 h-3 flex items-center justify-center' />
                ))
              }
            </div>
          ))
        }
      </div>
      <div className='z-10 absolute flex space-x-4 left-[220px]'>
        {
          Array.from({ length: lines }).map((_, i) => (
            <div key={i} className='w-0.5 h-40 bg-white' />
          ))
        }
      </div>
      
      <Cross className="z-20 absolute w-20 h-20 pointer-events-none left-[520px] -bottom-[20px]" />
      <Cross className="z-20 absolute w-20 h-20 pointer-events-none left-[630px] -bottom-[20px]" />
      <Cross className="z-20 absolute w-20 h-20 pointer-events-none left-[740px] -bottom-[20px]" />
      <RankingPage />
    </div>
  );
}

export default App;
