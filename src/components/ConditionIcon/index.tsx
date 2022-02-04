import React from 'react';
import { WiCloudy, WiDaySunny, WiRainMix, WiSnow } from 'react-icons/wi';

interface ConditionIconProps {
  theme: string;
}

export const ConditionIcon: React.FC<ConditionIconProps> = ({ theme }) => {
  return (
    <>
      {theme === 'sunny' && <WiDaySunny size={120} />}
      {theme === 'rainy' && <WiRainMix size={120} />}
      {theme === 'cloudy' && <WiCloudy size={120} color="#1F1F1F" />}
      {theme === 'snowy' && <WiSnow size={120} color="#1F1F1F" />}
    </>
  );
};
