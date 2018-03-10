import {Component, property, SimpleComponent} from "../../core";
import {dropdownStyles} from "./dropdown.styles";

@Component('smpl-dropdown')
export class Dropdown extends SimpleComponent {
    @property({attribute: false, type: 'array'}) items: any[] = [];

    render(): void {
        this.shadow.innerHTML = '';
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');
        dropdown.innerHTML = `<button class="dropbtn">Dropdown</button>
                                    <div class="dropdown-content">
                                       ${this.createList(this.items)}
                                    </div>`;
        const styles = document.createElement('style');
        styles.innerHTML = dropdownStyles;
        this.shadow.appendChild(styles);
        this.shadow.appendChild(dropdown);
    }

    private createList(items: any[]): string {
        const list = [];
        items.forEach((item) => {
            const listItem = ` <a href="#">${item}</a>`;
            list.push(listItem)
        });
        return list.join('');
    }
}