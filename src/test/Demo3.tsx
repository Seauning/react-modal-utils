import { Button } from 'antd';
import { useModal } from 'react-modal-utils';
import { Modal } from './Modal'

export function Demo() {
  const [modal, placehoder] = useModal(Modal, {
    onCancel: () => {
      modal.close();
    },
  });
  
  return (<>
    <Button onClick={() => modal.open()}>打开</Button>
    {placehoder}
  </>);
}