import {Component, property, SimpleComponent} from "../core/base";
import {IChange} from "../core";

@Component('smpl-test')
export class Test extends SimpleComponent {

    @property() test: string = 'Hello world';
    @property() bigProp: string = 'asas';

    constructor() {
        super();
    }

    render(): void {
        this.shadow.innerHTML = `I\'m here with attribute: ${this.test}`;
    }

    onChange(change: IChange): void {
        console.log(change);
        console.log(this.bigProp);
    }
}