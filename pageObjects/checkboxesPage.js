import Page from "./page.js"

class CheckboxesPage extends Page {
    get checkboxes() { return $$('input[type="checkbox"]') }

    async toggleCheckbox(index) {
        const checkbox = this.checkboxes[index]
        await checkbox.click()
    }

    async isCheckboxSelected(index) {
        return await this.checkboxes[index].isSelected()
    }

    async open() {
        await super.open('checkboxes')
    }
}

export default new CheckboxesPage()
