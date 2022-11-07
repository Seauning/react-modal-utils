import { Modal, ModalType, ModalConfig, FC } from './Modal';

function invokeModal<T extends FC>(modal: ModalType<T>, config?: ModalConfig<T>) {
  return new Modal<T>({
    modal,
    config,
  });
}

export { invokeModal };
