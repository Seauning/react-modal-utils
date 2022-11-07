import { useState, ReactElement } from 'react';

export function useQueue<T>() {
  const [queue, setQueue] = useState<T[]>([]);

  const push = (element: T) => {
    if (queue.includes(element)) {
      return;
    }

    setQueue([...queue, element]);
  };

  const remove = (element?: T) => {
    if (!element) {
      setQueue([]);
      return;
    }

    setQueue(queue.filter((ele) => ele !== element));
  };

  return {
    queue,
    push,
    remove,
  };
}
