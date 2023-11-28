import * as React from 'react';
import {Drawer} from 'react-native-paper';

const DrawerComponent = () => {
  const [active, setActive] = React.useState('');
  const drawer = React.useRef(null);

  console.log(drawer);

  return (
    <Drawer.Section title="Some title" ref={drawer}>
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
  );
};

export default DrawerComponent;
