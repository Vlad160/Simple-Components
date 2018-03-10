import {AttributeValueChange, Component, property, SimpleComponent} from "../core";

@Component('smpl-test')
export class Test extends SimpleComponent {

    @property() test: string = 'Hello world';
    @property() bigProp: string = 'asas';
    @property({attribute: false, type: 'array'}) items: any[] = [];

    constructor() {
        super();
    }

    render(): void {
        this.shadow.innerHTML = `I\'m here with attribute: ${this.test}`;
    }

    onChange(change: AttributeValueChange): void {
        console.log(change);
        console.log(this.bigProp);
    }
}