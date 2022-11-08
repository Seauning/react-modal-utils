import { Modal, Button } from 'antd';
import { invokeModal } from 'react-modal-utils';

export function Demo() {
  const modal = invokeModal(Modal, {
    onCancel: () => {
      modal.close();
    },
  });
  return <Button onClick={() => modal.open()}>打开</Button>;
}