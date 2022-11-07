import { forwardRef, useState, FC, useImperativeHandle } from "react";
import { ModalConfig, ModalType, VISIBE_PROP } from "./Modal";
import { VoidFunction } from "./typings";

export interface ModalRef {
  open: VoidFunction;
  close: VoidFunction;
}

export interface ModalProps<T extends FC> {
  Component: ModalType<T>;
  customProps: ModalConfig<T>
}

function useVisible() {
  const [visible, setVisible] = useState(false);

  const open = () => {
    setVisible(true);
  }

  const close = () => {
    setVisible(false);
  }

  return {
    visible,
    open,
    close
  }

}

export const Modal = forwardRef<ModalRef, ModalProps<FC>>((props, ref) => {
  const {
    Component,
    customProps
  } = props

  const {
    visibleProp = VISIBE_PROP,
    ...restProps
  } = customProps;

  const {
    visible,
    open,
    close
  } = useVisible();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }))

  return <Component {...{...restProps, [visibleProp]: visible}}/>
})