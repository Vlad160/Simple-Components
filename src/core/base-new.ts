import { SimpleComponent } from './base';
import { WebactComponent } from './core';

export function withShadowRoot<T extends HTMLElement>(constructor: any): any {
    return class extends constructor {
        renderRoot = this.attachShadow({ mode: 'open' });
    }
}
export interface IVirtualNode {
    type: string;
    props: Record<string, any>;
    children: Array<IVirtualNode>;
}
export function h(type: string, props: any, ...children: Array<any>): IVirtualNode {
    if (props === null) {
        props = {};
    }
    return { type, props, children }
}

export function render(vdom: IVirtualNode | string | number | boolean, parent: HTMLElement = null) {
    const mount = parent ? (el) => parent.appendChild(el) : (el) => el;
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return mount(document.createTextNode(vdom.toString()))
    } else if (typeof vdom === 'boolean' || vdom == null) {
        return mount(document.createTextNode(''))
    } else if (typeof vdom === 'object' && customElements.get(vdom.type)) {
        const instance = document.createElement(vdom.type);
        const renderRoot = parent.appendChild(instance);
        if (instance['render']) {
            return render((instance as WebactComponent).render(), renderRoot);
        }
    }
    else if (typeof vdom == 'object' && typeof vdom.type == 'string') {
        const dom = mount(document.createElement(vdom.type));
        for (const child of [].concat(...vdom.children))
            render(child, dom);
        for (const prop in vdom.props)
            setAttribute(dom, prop, vdom.props[prop]);
        return dom;
    } else {
        throw new Error(`Invalid VDOM: ${vdom}.`);
    }
}

const setAttribute = (dom, key, value) => {
    if (typeof value == 'function' && key.startsWith('on')) {
        const eventType = key.slice(2).toLowerCase();
        dom.__eventHandlers = dom.__eventHandlers || {};
        dom.removeEventListener(eventType, dom.__eventHandlers[eventType]);
        dom.__eventHandlers[eventType] = value;
        dom.addEventListener(eventType, dom.__eventHandlers[eventType]);
    } else if (key == 'checked' || key == 'value' || key == 'className') {
        dom[key] = value;
    } else if (key == 'style' && typeof value == 'object') {
        Object.assign(dom.style, value);
    } else if (key == 'ref' && typeof value == 'function') {
        value(dom);
    } else if (key == 'key') {
        dom.__gooactKey = value;
    } else if (typeof value != 'object' && typeof value != 'function') {
        dom.setAttribute(key, value);
    }
};
