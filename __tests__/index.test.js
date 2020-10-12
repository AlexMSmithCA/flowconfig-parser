// @flow
/*eslint-env node*/

import {encode} from '../index.js';
import type {ConfigType} from '../index.js';

// const {encode} = require('../index.js');

test('sanity fixture', () => {
  const fixture = {
    include: ['./src/'],
  };

  const result = encode(fixture);
});
