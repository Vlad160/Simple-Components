import {Component, property, SimpleComponent} from "../core/base";

@Component('smpl-test')
export class Simple extends SimpleComponent {

    @property() test: string = 'as';

    constructor() {
        super();
    }

    render(): void {
        this.shadow.innerHTML = `I\'m here with attribute: ${this.test}`;
    }
}