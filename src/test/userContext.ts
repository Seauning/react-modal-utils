import { createContext } from 'react';

const wang = {
  name: '小王',
  age: 18,
};

const li = {
  name: '小李',
  age: 21,
};

export const userContext = createContext(wang);
