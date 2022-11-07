import { Modal } from 'antd';

import { invokeModal, useModal } from '../';

invokeModal(Modal, {
  // a: 1,
});

useModal(Modal, {
  visibleProp: 'visible',
  // a: 1,
});
