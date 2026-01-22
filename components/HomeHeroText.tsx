import React from 'react';

const HomeHeroText: React.FC = () => {
    return (
        <div className='absolute bottom-6 left-6 lg:bottom-10 lg:left-10 flex flex-col gap-1 text-left'>
            <p className='text-[0.7rem] lg:text-[0.8rem] font-[font1] font-semibold tracking-widest uppercase'>
                What to expect on the Headz tour
            </p>
            <div className='flex items-center gap-2'>
                <span className='text-[0.6rem] lg:text-[0.7rem] font-[font2] tracking-widest uppercase opacity-80'>News</span>
                <span className='text-[0.6rem] lg:text-[0.7rem] font-[font2] tracking-widest uppercase'>11/14/2026</span>
            </div>
        </div>
    );
};

export default HomeHeroText;
