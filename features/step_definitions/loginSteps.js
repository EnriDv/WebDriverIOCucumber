import { Given, When, Then } from '@wdio/cucumber-framework'
import LoginPage from '../pageobjects/loginPage.js'

Given('que estoy en la página de login de Swag Labs', async () => {
    await LoginPage.open()
    expect(await LoginPage.isLoginPageDisplayed()).toBe(true)
})

Given('que he ingresado {string} en el campo usuario', async (username) => {
    await LoginPage.fillUsername(username)
    expect(await LoginPage.getUsernameValue()).toBe(username)
})

Given('que he ingresado {string} en el campo contraseña', async (password) => {
    await LoginPage.fillPassword(password)
    expect(await LoginPage.getPasswordValue()).toBe(password)
})

Given('que tengo credenciales válidas', async () => {
    // No hacer nada
})

Given('que los campos de login están vacíos', async () => {
    await LoginPage.clearUsername()
    await LoginPage.clearPassword()
    expect(await LoginPage.getUsernameValue()).toBe('')
    expect(await LoginPage.getPasswordValue()).toBe('')
})

When('ingreso las credenciales {string} y {string}', async (username, password) => {
    await LoginPage.login(username, password)
})

When('hago clic en el botón de login', async () => {
    await LoginPage.btnLogin.click()
})

When('ingreso solo el usuario {string}', async (username) => {
    await LoginPage.clearUsername()
    await LoginPage.clearPassword()
    await LoginPage.inputUsername.setValue(username)
})

When('ingreso solo la contraseña {string}', async (password) => {
    await LoginPage.clearUsername()
    await LoginPage.clearPassword()
    await LoginPage.inputPassword.setValue(password)
})

When('dejo ambos campos vacíos', async () => {
    await LoginPage.clearUsername()
    await LoginPage.clearPassword()
})

When('intento hacer login con credenciales vacías', async () => {
    await LoginPage.login('', '')
})

When('limpio el error mostrado', async () => {
    await LoginPage.clearError()
})

When('ingreso un usuario muy largo con {int} caracteres', async (charCount) => {
    const longUsername = 'a'.repeat(charCount)
    await LoginPage.inputUsername.setValue(longUsername)
})

When('ingreso caracteres especiales {string} en el usuario', async (specialChars) => {
    await LoginPage.inputUsername.setValue(specialChars)
})

Then('debería ver el mensaje de error {string}', async (expectedMessage) => {
    expect(await LoginPage.isErrorDisplayed()).toBe(true)
    const errorMessage = await LoginPage.getErrorMessage()
    expect(errorMessage).toContain(expectedMessage)
})

Then('debería acceder al catálogo de productos', async () => {
    expect(await browser.getUrl()).not.toContain('saucedemo.com/')
    expect(await browser.getUrl()).toContain('inventory.html')
})

Then('debería permanecer en la página de login', async () => {
    expect(await LoginPage.isLoginPageDisplayed()).toBe(true)
    expect(await browser.getUrl()).toContain('saucedemo.com/')
})

Then('no debería ver ningún mensaje de error', async () => {
    expect(await LoginPage.isErrorDisplayed()).toBe(false)
})

Then('el error debería desaparecer', async () => {
    expect(await LoginPage.isErrorDisplayed()).toBe(false)
})

Then('debería poder ver la lista de usuarios disponibles', async () => {
    const users = await LoginPage.getAvailableUsers()
    expect(users.length).toBeGreaterThan(0)
    expect(users).toContain('standard_user')
    expect(users).toContain('locked_out_user')
})

Then('los campos de login deberían estar vacíos', async () => {
    expect(await LoginPage.getUsernameValue()).toBe('')
    expect(await LoginPage.getPasswordValue()).toBe('')
})

Then('el campo usuario debería contener {string}', async (expectedValue) => {
    expect(await LoginPage.getUsernameValue()).toBe(expectedValue)
})

Then('el campo contraseña debería contener {string}', async (expectedValue) => {
    expect(await LoginPage.getPasswordValue()).toBe(expectedValue)
})

Then('debería ver el logo de Swag Labs', async () => {
    expect(await LoginPage.loginLogo.isDisplayed()).toBe(true)
})

Then('debería ver las credenciales de prueba', async () => {
    expect(await LoginPage.loginCredentials.isDisplayed()).toBe(true)
    expect(await LoginPage.loginPassword.isDisplayed()).toBe(true)
})

Then('el mensaje de error debería ser específico para usuario faltante', async () => {
    const errorMessage = await LoginPage.getErrorMessage()
    expect(errorMessage).toContain('Username is required')
})

Then('el mensaje de error debería ser específico para contraseña faltante', async () => {
    const errorMessage = await LoginPage.getErrorMessage()
    expect(errorMessage).toContain('Password is required')
})

Then('el mensaje de error debería ser para credenciales incorrectas', async () => {
    const errorMessage = await LoginPage.getErrorMessage()
    expect(errorMessage).toContain('Username and password do not match any user in this service')
})