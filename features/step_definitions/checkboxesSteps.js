import { Given, When, Then } from '@wdio/cucumber-framework'
import CheckboxesPage from '../../pageObjects/checkboxesPage.js'
import { expect } from '@wdio/globals'

Given('estoy en la página de checkboxes', async () => {
    await CheckboxesPage.open()
})

When('activo el checkbox {int}', async (index) => {
    await CheckboxesPage.toggleCheckbox(index - 1) 
})

Then('el checkbox {int} debería estar seleccionado', async (index) => {
    const isSelected = await CheckboxesPage.isCheckboxSelected(index - 1)
    expect(isSelected).toBe(true)
})
