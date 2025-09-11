import Page from './page.js'

class AlertsPage extends Page {
    async resultText() { return await $('#result') }

    async triggerAlert() {
        await $('button=Click for JS Alert').click()
    }

    async triggerConfirm() {
        await $('button=Click for JS Confirm').click()
    }

    async triggerPrompt() {
        await $('button=Click for JS Prompt').click()
    }

    async acceptAlert() {
        await browser.acceptAlert()
    }

    async dismissAlert() {
        await browser.dismissAlert()
    }

    async sendTextToPrompt(text) {
        await browser.sendAlertText(text)
    }

    async getResultMessage() {
        return await this.resultText.getText()
    }

    async open() {
        await super.open('javascript_alerts')
    }
}

export default new AlertsPage()
