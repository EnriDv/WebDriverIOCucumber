import Page from './page.js'

class CheckoutStepOnePage extends Page {
    get title() { return $('.title') }
    get checkoutContainer() { return $('.checkout_info_container') }
    get checkoutInfoForm() { return $('.checkout_info') }

    get firstNameInput() { return $('#first-name') }
    get lastNameInput() { return $('#last-name') }
    get postalCodeInput() { return $('#postal-code') }

    get continueBtn() { return $('#continue') }
    get cancelBtn() { return $('#cancel') }

    get errorMessage() { return $('[data-test="error"]') }
    get errorButton() { return $('.error-button') }

    get hamburgerMenu() { return $('#react-burger-menu-btn') }
    get cartIcon() { return $('#shopping_cart_container') }
    get cartBadge() { return $('.shopping_cart_badge') }

    async getPageTitle() {
        await this.title.waitForDisplayed()
        return await this.title.getText()
    }

    async fillFirstName(firstName) {
        await this.firstNameInput.setValue(firstName)
    }

    async fillLastName(lastName) {
        await this.lastNameInput.setValue(lastName)
    }

    async fillPostalCode(postalCode) {
        await this.postalCodeInput.setValue(postalCode)
    }

    async fillCustomerInfo(firstName, lastName, postalCode) {
        await this.fillFirstName(firstName)
        await this.fillLastName(lastName)
        await this.fillPostalCode(postalCode)
    }

    async continue() {
        await this.continueBtn.click()
    }

    async cancel() {
        await this.cancelBtn.click()
    }

    async getFirstNameValue() {
        return await this.firstNameInput.getValue()
    }

    async getLastNameValue() {
        return await this.lastNameInput.getValue()
    }

    async getPostalCodeValue() {
        return await this.postalCodeInput.getValue()
    }

    async clearFirstName() {
        await this.firstNameInput.clearValue()
    }

    async clearLastName() {
        await this.lastNameInput.clearValue()
    }

    async clearPostalCode() {
        await this.postalCodeInput.clearValue()
    }

    async clearAllFields() {
        await this.clearFirstName()
        await this.clearLastName()
        await this.clearPostalCode()
    }

    async getErrorMessage() {
        try {
            await this.errorMessage.waitForDisplayed({ timeout: 3000 })
            return await this.errorMessage.getText()
        } catch {
            return ''
        }
    }

    async isErrorDisplayed() {
        try {
            await this.errorMessage.waitForDisplayed({ timeout: 2000 })
            return await this.errorMessage.isDisplayed()
        } catch {
            return false
        }
    }

    async clearError() {
        if (await this.isErrorDisplayed()) {
            await this.errorButton.click()
        }
    }

    async isCheckoutStepOnePageDisplayed() {
        try {
            await this.checkoutContainer.waitForDisplayed({ timeout: 5000 })
            const title = await this.getPageTitle()
            return title === 'Checkout: Your Information'
        } catch {
            return false
        }
    }

    async isContinueButtonEnabled() {
        return await this.continueBtn.isEnabled()
    }

    async isCancelButtonDisplayed() {
        return await this.cancelBtn.isDisplayed()
    }

    async areFieldsEmpty() {
        const firstName = await this.getFirstNameValue()
        const lastName = await this.getLastNameValue()
        const postalCode = await this.getPostalCodeValue()
        
        return firstName === '' && lastName === '' && postalCode === ''
    }

    async areAllFieldsFilled() {
        const firstName = await this.getFirstNameValue()
        const lastName = await this.getLastNameValue()
        const postalCode = await this.getPostalCodeValue()
        
        return firstName !== '' && lastName !== '' && postalCode !== ''
    }

    async validateFieldsRequired() {
        const firstName = await this.getFirstNameValue()
        const lastName = await this.getLastNameValue()
        const postalCode = await this.getPostalCodeValue()
        
        const validations = {
            firstNameRequired: firstName === '',
            lastNameRequired: lastName === '',
            postalCodeRequired: postalCode === ''
        }
        
        return validations
    }

    async fillPartialInfo(missingField) {
        const testData = {
            firstName: 'Test',
            lastName: 'User', 
            postalCode: '12345'
        }
        
        switch (missingField) {
            case 'firstName':
                await this.fillLastName(testData.lastName)
                await this.fillPostalCode(testData.postalCode)
                break
            case 'lastName':
                await this.fillFirstName(testData.firstName)
                await this.fillPostalCode(testData.postalCode)
                break
            case 'postalCode':
                await this.fillFirstName(testData.firstName)
                await this.fillLastName(testData.lastName)
                break
        }
    }

    async fillInvalidPostalCode(invalidCode) {
        await this.fillFirstName('Test')
        await this.fillLastName('User')
        await this.fillPostalCode(invalidCode)
    }

    async getCartBadgeCount() {
        try {
            await this.cartBadge.waitForDisplayed({ timeout: 1000 })
            const badgeText = await this.cartBadge.getText()
            return parseInt(badgeText)
        } catch {
            return 0
        }
    }
}

export default new CheckoutStepOnePage()