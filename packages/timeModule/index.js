import React from 'react';
import moment from 'moment';

const TimeModule = () => <h1>{moment().format('MMMM Do YYYY, h:mm:ss a')}</h1>

export default TimeModule;
