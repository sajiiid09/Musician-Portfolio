import React from 'react';

const HomeBottomText: React.FC = () => {
  return (
    <div className='absolute bottom-6 left-1/2 -translate-x-1/2 lg:bottom-10 flex flex-col items-center gap-2 text-center w-full max-w-[30vw]'>
      <p className='italic font-body text-[0.8rem] lg:text-[1rem] leading-relaxed'>
        "Textures of loss and light. Instrumentals that breathe, lyrics that haunt."
      </p>
      <div className='flex items-center gap-2'>
        <span className='text-[0.6rem] lg:text-[0.7rem] font-body tracking-widest uppercase font-semibold'>Cremain</span>
        <span className='text-[0.6rem] lg:text-[0.7rem] font-body tracking-widest uppercase opacity-80'>01/23/2026</span>
      </div>
    </div>
  );
};

export default HomeBottomText;
