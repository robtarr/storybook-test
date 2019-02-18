import React from 'react';
import { storiesOf } from '@storybook/react';
import TimeModule from './';

const story = storiesOf('TimeModule', module);

story.add(
  'default',
  () =>
    <div>
      <TimeModule />
    </div>
);
