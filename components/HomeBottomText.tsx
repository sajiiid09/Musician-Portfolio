import React from 'react';

const HomeBottomText: React.FC = () => {
  return (
    <div className='absolute bottom-20 left-1/2 w-[min(88vw,30rem)] -translate-x-1/2 sm:bottom-6 lg:bottom-10 flex flex-col items-center gap-2 text-center lg:max-w-[30vw]'>
      <p className='italic font-body text-[0.8rem] lg:text-[1rem] leading-relaxed'>
        &quot;Textures of loss and light. Instrumentals that breathe, lyrics that haunt.&quot;
      </p>
      <div className='flex items-center gap-2'>
        <span className='text-[0.6rem] lg:text-[0.7rem] font-body tracking-widest uppercase font-semibold'>Cremain</span>
        <span className='text-[0.6rem] lg:text-[0.7rem] font-body tracking-widest uppercase opacity-80'>01/23/2026</span>
      </div>
    </div>
  );
};

export default HomeBottomText;
