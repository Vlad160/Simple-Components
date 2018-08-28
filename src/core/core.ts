import { toKebabCase } from './utils';

export class WebactComponent extends HTMLElement {
    private _connected: boolean = false;
    private _props: Record<string, any> = {};
    static _propsToAttrMap: Record<string, string> = {};
    static _attrToPropsMap: Record<string, string> = {};
    private _renderRoot;

    get renderRoot() {
        return this;
    }

    set renderRoot(root) {
        this._renderRoot = root;
    }
    constructor() {
        super();
    }

    render(): any {

    }
    protected componentDidMount(): void {

    }

    protected componentWillUnmount(): void {

    }
    protected disconnectedCallback(): void {
        this._connected = false;
        this.componentWillUnmount();
    }
    private connectedCallback(): void {
        this._connected = true;
    }
    private update(): void {
        this.render();
    }

}
export function prop(): PropertyDecorator {
    return ({ constructor }, propertName: string) => {
        const normalizedProp: string = toKebabCase(propertName);
        constructor['_propsToAttrMap'][propertName] = normalizedProp;
        constructor['_attrToPropsMap'][normalizedProp] = propertName;
        Object.defineProperty(constructor.prototype, propertName, {
            configurable: true,
            get() {
                return this._props[propertName];
            },
            set(val: any) {
                // this.setAttribute(this, val);
                this._props[propertName] = val;
                this.update();
            }
        })
    }
}

export function webactElement<T extends Function>(selector: string, options: ElementDefinitionOptions = <ElementDefinitionOptions>{}): ClassDecorator {
    return (target) => {
        if (customElements.get(selector)) {
            throw new Error(`Element ${selector} has already been defined`)
        }
        customElements.define(selector, target, options)
    }
}