import {
  Modal as _Modal
} from 'antd';

import {
  useContext
} from 'react';

import {
  userContext
} from './userContext'

export const Modal = (props: any) => {
  const user = useContext(userContext);
  return (
    <_Modal {...props}>
      <h2>name: {user.name}</h2>
      <h2>age: {user.age}</h2>
    </_Modal>
  )
}