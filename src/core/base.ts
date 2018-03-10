import {IChange} from "./lifecycle";
import {toCamelCase, toKebabCase} from "./utils";

export const bindings: string = '__bindings__';
export const observedAttributes: string = 'observedAttributes';

export function Component<T extends Function>(selector: string, options: ElementDefinitionOptions = <ElementDefinitionOptions>{}): (target: T) => void {
    return function (target: T) {
        if (customElements.get(selector)) {
            throw new Error(`Element ${selector} has already been defined`)
        } else {
            target.constructor.prototype[observedAttributes] = [];
            target.prototype[bindings].forEach((prop: string) => {
                target.constructor[observedAttributes].push(toKebabCase(prop));
                Object.defineProperty(target.prototype, prop, createPropertyBinding(target, prop))
            });
            customElements.define(selector, target, options)
        }
    }
}

export function property(): Function {
    return function (target: any, key: string): void {
        if (!target[bindings]) {
            target[bindings] = [];
        }
        if (!target[bindings][key]) {
            target[bindings].push(key);
        }
    }
}

export function createPropertyBinding(target: any, key: string): PropertyDescriptor {
    return {
        get() {
            return this[`_${key}`];
        },
        set(value: any) {
            this[`_${key}`] = value;
            this.renderCallback();
        }
    }
}

export class SimpleComponent extends HTMLElement {

    shadow: ShadowRoot;
    connected: boolean = false;
    isSimpleComponent = true;

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    protected connectedCallback(): void {
        this.connected = true;
        this.constructor[observedAttributes].forEach((prop: string) => this.setAttribute(prop, this[toCamelCase(prop)]));
        this.onInit();
        this.renderCallback();
    }

    private attributeChangedCallback(key, oldValue, newValue) {
        const prop: string = toCamelCase(key);
        if (newValue !== oldValue && this[bindings].includes(prop)) {
            this[prop] = newValue;
            const change = {
                [prop]: {oldValue, newValue}
            };
            this.onChange(change);
        }
    }

    protected renderCallback(): void {
        if (this.connected) {
            this.beforeRender();
            this.render();
            this.afterRender();
        }
    }

    protected render(): void {

    }

    protected onInit(): void {

    }

    protected beforeRender(): void {

    }

    protected onChange(change: IChange): void {

    }

    protected afterRender(): void {
    }

    protected beforeDestroy(): void {

    }

    private disconnectedCallback(): void {
        this.connected = false;
        this.beforeDestroy();
    }
}