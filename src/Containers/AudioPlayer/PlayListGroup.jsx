import React from 'react';
import PlayList from '../../Components/Audio/PlayList';

const PlayListGroup = ({navigation}) => {
  return (
    <>
      <PlayList screenName={'PlayListTracks'} navigation={navigation} />
    </>
  );
};

export default PlayListGroup;
