import { SimpleComponent } from './base';

export function withShadowRoot<T extends HTMLElement>(constructor: any) {
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
    console.log(vdom);
    const mount = parent ? (el) => parent.appendChild(el) : (el) => el;
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return mount(document.createTextNode(vdom.toString()))
    } else if (typeof vdom === 'boolean' || vdom == null) {
        return mount(document.createTextNode(''))
    } else if (typeof vdom === 'object' && customElements.get(vdom.type)) {
        return SimpleComponent.render(vdom, parent);
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
        dom.__gooactHandlers = dom.__gooactHandlers || {};
        dom.removeEventListener(eventType, dom.__gooactHandlers[eventType]);
        dom.__gooactHandlers[eventType] = value;
        dom.addEventListener(eventType, dom.__gooactHandlers[eventType]);
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
