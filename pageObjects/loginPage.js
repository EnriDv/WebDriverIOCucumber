import Page from './page.js'

class LoginPage extends Page {

    get inputUsername() { return $('#user-name') }
    get inputPassword() { return $('#password') }
    get btnLogin() { return $('#login-button') }
    get errorMessage() { return $('[data-test="error"]') }
    get errorButton() { return $('.error-button') }
    get loginContainer() { return $('.login_container') }
    get loginLogo() { return $('.login_logo') }
    get loginCredentials() { return $('#login_credentials') }
    get loginPassword() { return $('.login_password') }


    async login(username, password) {
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.btnLogin.click()
    }

    async getErrorMessage() {
        await this.errorMessage.waitForDisplayed({ timeout: 3000 })
        return await this.errorMessage.getText()
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
        if (await this.errorButton.isDisplayed()) {
            await this.errorButton.click()
        }
    }

    async getUsernameValue() {
        return await this.inputUsername.getValue()
    }

    async getPasswordValue() {
        return await this.inputPassword.getValue()
    }

    async clearUsername() {
        await this.inputUsername.clearValue()
    }

    async clearPassword() {
        await this.inputPassword.clearValue()
    }

    async isLoginPageDisplayed() {
        return await this.loginContainer.isDisplayed()
    }

    async getAvailableUsers() {
        const credentialsText = await this.loginCredentials.getText()
        return credentialsText.split('\n').filter(line => line.includes('_user'))
    }

    async open() {
        await super.open()
        await this.waitForPageLoad()
    }
}

export default new LoginPage()