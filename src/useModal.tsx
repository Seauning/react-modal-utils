import { createRef, useEffect } from 'react';
import { ModalConfig, ModalType, FC, ReactElement } from './Modal';
import { ModalRef, Modal } from './ModalHolder';
import { VoidFunction } from './typings';
import { useQueue } from './useQueue';

let cid = 0;

const prefix = 'modal';

const ContextPlaceholder: FC<{
  instances: ReactElement[]
}> = props => {
  const {instances} = props;
  
  return <>{instances}</>
}

function useModal<T extends FC>(modal: ModalType<T>, config: ModalConfig<T>) {
  const { queue: modals, push, remove } = useQueue<ReactElement>();

  const { queue: taskQueue, push: pushTask, remove: removeAll } = useQueue<VoidFunction>();

  // 1. 初始时组件实例可能还未挂载，缓存 open 方法，统一执行
  // 2. 将开启、关闭事件回调放到 commit 声明周期之后
  useEffect(() => {
    if (taskQueue.length) {
      taskQueue.forEach((task) => {
        task();
      });

      removeAll();
    }
  }, [taskQueue]);

  const getModalMethods = () => {
    cid++;

    const modalRef = createRef<ModalRef>();

    const modalHolder = <Modal ref={modalRef} key={`${prefix}${cid}`} Component={modal} customProps={config} />;

    const addTask = (task: VoidFunction) => {
      if (modalRef.current) {
        task();
      } else {
        pushTask(task);
      }
    };

    return {
      open: () => {
        push(modalHolder);
        const open = () => modalRef.current?.open();
        addTask(open)
      },
      close: () => {
        const close = () => modalRef.current?.close();
        addTask(close)
      },
      destroy: () => {
        const destroy = () => remove(modalHolder);
        addTask(destroy)
      }
    };
  };

  const ModalHolder = <ContextPlaceholder instances={modals}></ContextPlaceholder>

  return [getModalMethods(), ModalHolder] as const;
}

export { useModal };
