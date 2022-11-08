import { Button } from 'antd';
import { useState } from 'react';
import { Modal } from './Modal'

export function Demo() {
  const [visible, setVisible] = useState(false);
  
  return (<>
     <Button onClick={() => setVisible(true)}>打开</Button>
      <Modal visible={visible} onCancel={() => setVisible(false)}></Modal>
  </>);
}