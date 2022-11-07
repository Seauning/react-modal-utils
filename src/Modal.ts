import { ComponentProps, createElement, FC, ReactElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { AnyObject } from './typings';

export { FC, ReactElement };

export type ModalType<T> = T;

export type ModalConfig<T extends FC> = ComponentProps<T> & {
  visibleProp?: string;
};

export type Container = Element | DocumentFragment;

export const VISIBE_PROP = 'visible';

type ModalProps<T extends FC> = {
  modal?: ModalType<T>;
  config?: ModalConfig<T>;
  container?: Container;
};

class Modal<T extends FC> {
  Component: T;

  props: AnyObject;

  container: Container;

  visibleProp: string;

  instance: ReactElement;

  constructor({ modal, config, container }: ModalProps<T>) {
    this.Component = modal;
    this.props = config || {};
    this.visibleProp = config.visibleProp ?? VISIBE_PROP;
    this.container = container || document.createDocumentFragment();
  }

  mount() {
    document.body.appendChild(this.container);

    return this;
  }

  render() {
    this.instance = createElement(this.Component, this.props);

    render(this.instance, this.container);

    return this;
  }

  update(props: AnyObject = {}) {
    this.props = {
      ...this.props,
      ...props,
    };

    this.render();

    return this;
  }

  open() {
    this.update({
      [this.visibleProp]: true,
    });

    return this;
  }

  close() {
    this.update({
      [this.visibleProp]: false,
    });

    return this;
  }

  destroy() {
    const unmountResult = unmountComponentAtNode(this.container);

    if (unmountResult && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

export { Modal };
