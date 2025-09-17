import Page from './page.js'

class CheckoutCompletePage extends Page {
    get title() { return $('.title') }
    get checkoutCompleteContainer() { return $('.checkout_complete_container') }
    
    get completeHeader() { return $('[data-test="complete-header"]') }
    get completeText() { return $('[data-test="complete-text"]') }
    
    get ponyExpressImg() { return $('.pony_express') }
    get checkoutCompleteImg() { return $('[data-test="pony-express"]') }
    
    get backHomeBtn() { return $('#back-to-products') }
    
    get hamburgerMenu() { return $('#react-burger-menu-btn') }
    get cartIcon() { return $('#shopping_cart_container') }
    get cartBadge() { return $('.shopping_cart_badge') }

    async getPageTitle() {
        await this.title.waitForDisplayed()
        return await this.title.getText()
    }

    async getCompleteHeader() {
        await this.completeHeader.waitForDisplayed()
        return await this.completeHeader.getText()
    }

    async getCompleteText() {
        await this.completeText.waitForDisplayed()
        return await this.completeText.getText()
    }

    async backToHome() {
        await this.backHomeBtn.click()
    }

    async backToProducts() {
        await this.backToHome()
    }

    async isOrderComplete() {
        try {
            await this.completeHeader.waitForDisplayed({ timeout: 5000 })
            await this.completeText.waitForDisplayed()
            return true
        } catch {
            return false
        }
    }

    async isCheckoutCompletePageDisplayed() {
        try {
            await this.checkoutCompleteContainer.waitForDisplayed({ timeout: 5000 })
            const title = await this.getPageTitle()
            return title === 'Checkout: Complete!'
        } catch {
            return false
        }
    }

    async isBackToProductsButtonDisplayed() {
        return await this.backHomeBtn.isDisplayed()
    }

    async isPonyExpressImageDisplayed() {
        try {
            return await this.ponyExpressImg.isDisplayed() || await this.checkoutCompleteImg.isDisplayed()
        } catch {
            return false
        }
    }

    async validateSuccessMessages() {
        const header = await this.getCompleteHeader()
        const text = await this.getCompleteText()
        
        const expectedHeader = 'Thank you for your order!'
        const isHeaderCorrect = header === expectedHeader
        const hasThankYouMessage = text.includes('dispatched') || text.includes('pony')
        
        return {
            header,
            text,
            isHeaderCorrect,
            hasThankYouMessage,
            expectedHeader
        }
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

    async isCartEmptyAfterPurchase() {
        const badgeCount = await this.getCartBadgeCount()
        return badgeCount === 0
    }

    async getConfirmationDetails() {
        const header = await this.getCompleteHeader()
        const text = await this.getCompleteText()
        const title = await this.getPageTitle()
        const isImageDisplayed = await this.isPonyExpressImageDisplayed()
        const isButtonDisplayed = await this.isBackToProductsButtonDisplayed()
        
        return {
            title,
            header,
            text,
            isImageDisplayed,
            isButtonDisplayed,
            cartEmpty: await this.isCartEmptyAfterPurchase()
        }
    }

    async completeSuccessfulFlow() {
        const isDisplayed = await this.isCheckoutCompletePageDisplayed()
        if (!isDisplayed) {
            throw new Error('No se encuentra en la página de checkout completo')
        }
        
        const messages = await this.validateSuccessMessages()
        if (!messages.isHeaderCorrect) {
            throw new Error(`Header incorrecto. Esperado: "${messages.expectedHeader}", Actual: "${messages.header}"`)
        }
        
        const cartEmpty = await this.isCartEmptyAfterPurchase()
        if (!cartEmpty) {
            throw new Error('El carrito no se vació después de la compra')
        }
        
        return {
            success: true,
            messages,
            cartEmpty
        }
    }

    async navigateBackToShopping() {
        const isButtonDisplayed = await this.isBackToProductsButtonDisplayed()
        if (!isButtonDisplayed) {
            throw new Error('Botón "Back to Products" no está disponible')
        }
        
        await this.backToProducts()
    }

    async verifyPageElements() {
        const elements = {
            title: await this.title.isDisplayed(),
            header: await this.completeHeader.isDisplayed(),
            text: await this.completeText.isDisplayed(),
            image: await this.isPonyExpressImageDisplayed(),
            backButton: await this.isBackToProductsButtonDisplayed()
        }
        
        const allElementsPresent = Object.values(elements).every(isPresent => isPresent === true)
        
        return {
            elements,
            allElementsPresent
        }
    }
}

export default new CheckoutCompletePage()