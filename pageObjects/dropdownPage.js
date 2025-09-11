import Page from './page.js'

class DropdownPage extends Page {
    get dropdown() { return $('#dropdown') }

    async selectOption(optionText) {
        await this.dropdown.selectByVisibleText(optionText)
    }

    async getSelectedValue() {
        return await this.dropdown.getValue()
    }

    async open() {
        await super.open('dropdown')
    }
}

export default new DropdownPage()
