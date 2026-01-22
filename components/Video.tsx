import React from 'react';
import { SINGLE_SINNER } from '@/lib/assets';

const Video: React.FC = () => {
  return (
    <div className='h-full w-full'>
        {/* Sinner Teaser Video */}
        <video
            className='h-full w-full object-cover'
            autoPlay
            loop
            muted
            playsInline
            src={SINGLE_SINNER.video}
        />
    </div>
  );
};

export default Video;
