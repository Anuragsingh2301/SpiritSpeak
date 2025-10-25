import React from 'react';
import LogoSVG from '../assets/SVG.svg';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        
        {/* 2. Replaced the "RT" div with an <img> tag for your SVG */}
        <img src={LogoSVG} alt="SpiritSpeak Logo" className="h-20 w-20 mx-auto mb-4" />
        
        {/* 3. Updated the text to match the app's theme */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Finding your space...</h2>
        <p className="text-sm text-gray-500 mb-6">Gathering your thoughts, please wait.</p>
        
        {/* 4. Customized the spinner to your app's teal color */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-teal-600"></div>
        </div>
        
      </div>
    </div>
  );
};

export default LoadingScreen;