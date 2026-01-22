import React from 'react';

const Video: React.FC = () => {
  return (
    <div className='h-full w-full'>
        {/* Video from assets folder */}
        <video 
            className='h-full w-full object-cover' 
            autoPlay 
            loop 
            muted 
            playsInline
            src="/assets/video.mp4" 
        />
    </div>
  );
};

export default Video;
