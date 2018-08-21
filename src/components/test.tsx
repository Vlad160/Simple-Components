import { AttributeValueChange, Component, property, SimpleComponent, h, render } from '@core';

@Component('smpl-test')
export class Test extends SimpleComponent {

    @property() test: string = 'Hello world';
    @property() bigProp: string = 'asas';

    constructor() {
        super();
    }

    render(): any {
        return (
            <div>Hello world! </div>
        )
    }

    onChange(change: AttributeValueChange): void {
        console.log(change);
        console.log(this.bigProp);
    }
}

render(<smpl-test />, document.body);