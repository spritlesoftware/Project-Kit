import React from 'react';
import TopTab from '../../Components/Tab/TopTab';
import TopTabLogic from '../../Functions/Tab/TopTab';

const TopTabNavigator = () => {
  const {tabData, isLoading} = TopTabLogic();
  return <TopTab data={tabData} isLoading={isLoading} />;
};

export default TopTabNavigator;
