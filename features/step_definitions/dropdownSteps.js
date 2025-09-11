import { Given, When, Then } from '@wdio/cucumber-framework'
import DropdownPage from '../../pageObjects/dropdownPage.js'
import { expect } from '@wdio/globals'

Given('estoy en la página de dropdown', async () => {
    await DropdownPage.open()
})

When('selecciono la opción {string}', async (optionText) => {
    await DropdownPage.selectOption(optionText)
})

Then('la opción seleccionada debería ser {string}', async (expectedValue) => {
    const selected = await DropdownPage.getSelectedValue()
    expect(selected).toBe(expectedValue)
})
