
import React from 'react';
import { configure, addDecorator } from '@storybook/react';

function loadStories() {
  require('../stories');
}

addDecorator(storyFn => (
  <div style={{ margin: '1em' }}>
    { storyFn() }
  </div>
));

configure(loadStories, module);
