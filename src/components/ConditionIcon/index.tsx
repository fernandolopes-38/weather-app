import React from 'react';
import styles from './styles.module.scss';

import { WiDaySunny } from 'react-icons/wi';

interface ConditionIconProps {
  theme: string;
}

export const ConditionIcon: React.FC<ConditionIconProps> = ({ theme }) => {
  return <>{theme === 'sunny' && <WiDaySunny size={120} />}</>;
};
