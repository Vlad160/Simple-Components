export function Component<T extends Function>(selector: string, options: ElementDefinitionOptions = <ElementDefinitionOptions>{}): (target: T) => void {
    return function (target: T) {
        if (customElements.get(selector)) {
            throw new Error(`Element ${selector} has already been defined`)
        } else {
            customElements.define(selector, target, options)
        }
    }
}

@Component('simple-element')
export class SimpleComponent extends HTMLElement {
    constructor() {
        super();
    }

    protected connectedCallback(): void {
        this.innerHTML = '<p>I\'m here!</p>'
    }
}