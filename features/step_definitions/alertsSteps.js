import { Given, When, Then } from '@wdio/cucumber-framework'
import AlertsPage from '../../pageObjects/alertsPage.js'
import { expect } from '@wdio/globals'

Given('estoy en la página de alerts', async () => {
    await AlertsPage.open()
})

When('disparo un alert y lo acepto', async () => {
    await AlertsPage.triggerAlert()
    await AlertsPage.acceptAlert()
})

When('disparo un confirm y lo cancelo', async () => {
    await AlertsPage.triggerConfirm()
    await AlertsPage.dismissAlert()
})

When('disparo un prompt y escribo {string}', async (text) => {
    await AlertsPage.triggerPrompt()
    await AlertsPage.sendTextToPrompt(text)
    await AlertsPage.acceptAlert()
})

Then('debería ver el mensaje {string} en el resultado', async (expectedMessage) => {
    const result = await AlertsPage.getResultMessage()
    expect(result).toBe(expectedMessage)
})
