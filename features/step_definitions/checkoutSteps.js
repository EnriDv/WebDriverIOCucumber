import { Given, When, Then } from '@wdio/cucumber-framework'
import CheckoutStepOnePage from '../pageobjects/checkoutStepOnePage.js'
import CheckoutStepTwoPage from '../pageobjects/checkoutStepTwoPage.js'
import CheckoutCompletePage from '../pageobjects/checkoutCompletePage.js'
import CartPage from '../pageobjects/cartPage.js'

Given('que estoy en la página de información del checkout', async () => {
    expect(await CheckoutStepOnePage.isCheckoutStepOnePageDisplayed()).toBe(true)
})

Given('que estoy en la página de resumen del checkout', async () => {
    expect(await CheckoutStepTwoPage.isCheckoutStepTwoPageDisplayed()).toBe(true)
})

Given('que estoy en la página de confirmación del checkout', async () => {
    expect(await CheckoutCompletePage.isCheckoutCompletePageDisplayed()).toBe(true)
})

Given('que he llenado la información personal previamente', async () => {
    await CheckoutStepOnePage.fillCustomerInfo('Test', 'User', '12345')
})

Given('que tengo productos en el carrito para checkout', async () => {
    const cartCount = await CheckoutStepOnePage.getCartBadgeCount()
    expect(cartCount).toBeGreaterThan(0)
})

When('procedo al checkout', async () => {
    await CartPage.proceedToCheckout()
    expect(await CheckoutStepOnePage.isCheckoutStepOnePageDisplayed()).toBe(true)
})

When('completo la información personal con {string}, {string} y {string}', 
    async (firstName, lastName, postalCode) => {
    await CheckoutStepOnePage.fillCustomerInfo(firstName, lastName, postalCode)
    await CheckoutStepOnePage.continue()
})

When('ingreso {string} como nombre', async (firstName) => {
    await CheckoutStepOnePage.fillFirstName(firstName)
})

When('ingreso {string} como apellido', async (lastName) => {
    await CheckoutStepOnePage.fillLastName(lastName)
})

When('ingreso {string} como código postal', async (postalCode) => {
    await CheckoutStepOnePage.fillPostalCode(postalCode)
})

When('dejo el nombre vacío', async () => {
    await CheckoutStepOnePage.clearFirstName()
})

When('dejo el apellido vacío', async () => {
    await CheckoutStepOnePage.clearLastName()
})

When('dejo el código postal vacío', async () => {
    await CheckoutStepOnePage.clearPostalCode()
})

When('hago clic en Continue', async () => {
    await CheckoutStepOnePage.continue()
})

When('hago clic en Cancel en el paso uno', async () => {
    await CheckoutStepOnePage.cancel()
})

When('limpio todos los campos de información', async () => {
    await CheckoutStepOnePage.clearAllFields()
})

When('lleno información incompleta faltando {string}', async (missingField) => {
    await CheckoutStepOnePage.fillPartialInfo(missingField)
    await CheckoutStepOnePage.continue()
})

When('reviso el resumen del pedido', async () => {
    expect(await CheckoutStepTwoPage.isCheckoutStepTwoPageDisplayed()).toBe(true)
    const summary = await CheckoutStepTwoPage.getOrderSummary()
    expect(summary.items.length).toBeGreaterThan(0)
})

When('finalizo la compra', async () => {
    await CheckoutStepTwoPage.finish()
})

When('hago clic en Cancel en el resumen', async () => {
    await CheckoutStepTwoPage.cancel()
})

When('verifico los cálculos del pedido', async () => {
    const validation = await CheckoutStepTwoPage.validateTotals()
    expect(validation.isValid).toBe(true)
})

When('regreso al catálogo principal', async () => {
    await CheckoutCompletePage.backToProducts()
})

When('hago clic en "Back to Products"', async () => {
    await CheckoutCompletePage.backToHome()
})

Then('debería estar en la página de información del checkout', async () => {
    expect(await CheckoutStepOnePage.isCheckoutStepOnePageDisplayed()).toBe(true)
    expect(await CheckoutStepOnePage.getPageTitle()).toBe('Checkout: Your Information')
})

Then('debería ver el error {string} en el checkout', async (expectedError) => {
    const isErrorDisplayed = await CheckoutStepOnePage.isErrorDisplayed()
    expect(isErrorDisplayed).toBe(true)
    const errorMessage = await CheckoutStepOnePage.getErrorMessage()
    expect(errorMessage).toContain(expectedError)
})

Then('no debería ver ningún error en el checkout', async () => {
    expect(await CheckoutStepOnePage.isErrorDisplayed()).toBe(false)
})

Then('el botón Continue debería estar habilitado', async () => {
    expect(await CheckoutStepOnePage.isContinueButtonEnabled()).toBe(true)
})

Then('todos los campos deberían estar vacíos', async () => {
    expect(await CheckoutStepOnePage.areFieldsEmpty()).toBe(true)
})

Then('todos los campos deberían estar llenos', async () => {
    expect(await CheckoutStepOnePage.areAllFieldsFilled()).toBe(true)
})

Then('debería estar en la página de resumen del checkout', async () => {
    expect(await CheckoutStepTwoPage.isCheckoutStepTwoPageDisplayed()).toBe(true)
    expect(await CheckoutStepTwoPage.getPageTitle()).toBe('Checkout: Overview')
})

Then('debería ver el resumen correcto con todos los productos', async () => {
    const summary = await CheckoutStepTwoPage.getOrderSummary()
    expect(summary.items.length).toBeGreaterThan(0)
    
    summary.items.forEach(item => {
        expect(item.name).toBeDefined()
        expect(item.price).toMatch(/^\$\d+\.\d{2}$/)
        expect(item.quantity).toBeDefined()
    })
})

Then('debería ver la información de pago correcta', async () => {
    const paymentInfo = await CheckoutStepTwoPage.getPaymentInfo()
    expect(paymentInfo).toBeDefined()
    expect(paymentInfo.length).toBeGreaterThan(0)
})

Then('debería ver la información de envío correcta', async () => {
    const shippingInfo = await CheckoutStepTwoPage.getShippingInfo()
    expect(shippingInfo).toBeDefined()
    expect(shippingInfo.length).toBeGreaterThan(0)
})

Then('debería ver los totales calculados correctamente', async () => {
    const validation = await CheckoutStepTwoPage.validateTotals()
    expect(validation.isValid).toBe(true)
    expect(validation.itemTotal).toBeGreaterThan(0)
    expect(validation.tax).toBeGreaterThanOrEqual(0)
    expect(validation.total).toBeGreaterThan(validation.itemTotal)
})

Then('debería ver todos los elementos del resumen', async () => {
    expect(await CheckoutStepTwoPage.areAllSummaryElementsDisplayed()).toBe(true)
})

Then('el botón Finish debería estar habilitado', async () => {
    expect(await CheckoutStepTwoPage.isFinishButtonEnabled()).toBe(true)
})

Then('debería ver el mensaje de confirmación de compra', async () => {
    expect(await CheckoutCompletePage.isOrderComplete()).toBe(true)
    const validation = await CheckoutCompletePage.validateSuccessMessages()
    expect(validation.isHeaderCorrect).toBe(true)
    expect(validation.hasThankYouMessage).toBe(true)
})

Then('debería estar en la página de confirmación', async () => {
    expect(await CheckoutCompletePage.isCheckoutCompletePageDisplayed()).toBe(true)
    expect(await CheckoutCompletePage.getPageTitle()).toBe('Checkout: Complete!')
})

Then('el carrito debería estar vacío después de la compra', async () => {
    expect(await CheckoutCompletePage.isCartEmptyAfterPurchase()).toBe(true)
})

Then('debería ver la imagen de confirmación', async () => {
    expect(await CheckoutCompletePage.isPonyExpressImageDisplayed()).toBe(true)
})

Then('debería ver el botón "Back to Products"', async () => {
    expect(await CheckoutCompletePage.isBackToProductsButtonDisplayed()).toBe(true)
})

Then('debería poder volver al catálogo', async () => {
    await CheckoutCompletePage.navigateBackToShopping()
})

Then('debería ver todos los elementos de confirmación', async () => {
    const elements = await CheckoutCompletePage.verifyPageElements()
    expect(elements.allElementsPresent).toBe(true)
})

Then('debería estar de vuelta en el carrito', async () => {
    expect(await CartPage.isCartPageDisplayed()).toBe(true)
})

Then('el proceso de checkout debería completarse exitosamente', async () => {
    const confirmation = await CheckoutCompletePage.completeSuccessfulFlow()
    expect(confirmation.success).toBe(true)
    expect(confirmation.cartEmpty).toBe(true)
})

Then('la información de pago debería ser {string}', async (expectedPayment) => {
    const paymentInfo = await CheckoutStepTwoPage.getPaymentInfo()
    expect(paymentInfo).toContain(expectedPayment)
})

Then('la información de envío debería ser {string}', async (expectedShipping) => {
    const shippingInfo = await CheckoutStepTwoPage.getShippingInfo()
    expect(shippingInfo).toContain(expectedShipping)
})

Then('debería poder ver el subtotal, impuestos y total', async () => {
    const itemTotal = await CheckoutStepTwoPage.getItemTotal()
    const tax = await CheckoutStepTwoPage.getTax()
    const total = await CheckoutStepTwoPage.getTotal()
    
    expect(itemTotal).toContain('Item total:')
    expect(tax).toContain('Tax:')
    expect(total).toContain('Total:')
})


Then('debería ver el error específico para nombre faltante', async () => {
    const errorMessage = await CheckoutStepOnePage.getErrorMessage()
    expect(errorMessage).toContain('First Name is required')
})

Then('debería ver el error específico para apellido faltante', async () => {
    const errorMessage = await CheckoutStepOnePage.getErrorMessage()
    expect(errorMessage).toContain('Last Name is required')
})

Then('debería ver el error específico para código postal faltante', async () => {
    const errorMessage = await CheckoutStepOnePage.getErrorMessage()
    expect(errorMessage).toContain('Postal Code is required')
})