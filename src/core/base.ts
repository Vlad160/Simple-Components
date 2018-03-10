export const bindings: string = '__bindings__';
export const observedAttributes: string = 'observedAttributes';

export function Component<T extends Function>(selector: string, options: ElementDefinitionOptions = <ElementDefinitionOptions>{}): (target: T) => void {
    return function (target: T) {
        if (customElements.get(selector)) {
            throw new Error(`Element ${selector} has already been defined`)
        } else {
            target.constructor.prototype[observedAttributes] = [];
            target.prototype[bindings].forEach((prop: string) => {
                target.constructor[observedAttributes].push(prop);
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

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    protected connectedCallback(): void {
        this.connected = true;
        this.constructor[observedAttributes].forEach((prop: string) => this.setAttribute(prop, this[prop]));
        this.onInit();
        this.renderCallback();
    }

    private attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) {
            this[name] = newValue;
            const change = {
                [name]: {oldValue, newValue}
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

    protected beforeRender() {

    }

    protected onChange(change: any) {

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