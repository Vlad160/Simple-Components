import { AttributeValueChange, Component, property, SimpleComponent, h, render, withShadowRoot } from '@core';
import { webactElement, WebactComponent, prop } from '../core/core';

@webactElement('smpl-test')
export class Test extends WebactComponent {

    @prop() test: string = 'Hello world';
    @prop() bigProp: string = 'asas';

    constructor() {
        super();
    }

    render(): any {
        return (
            <div>Hello world! </div>
        )
    }
}

render(<smpl-test />, document.body);