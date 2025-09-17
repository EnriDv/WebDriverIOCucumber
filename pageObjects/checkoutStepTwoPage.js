import Page from './page.js'

class CheckoutStepTwoPage extends Page {
    get title() { return $('.title') }
    get checkoutSummaryContainer() { return $('.checkout_summary_container') }
    get summaryInfo() { return $('.summary_info') }

    get cartItems() { return $$('.cart_item') }
    get cartItemNames() { return $$('.inventory_item_name') }
    get cartItemPrices() { return $$('.inventory_item_price') }
    get cartItemDescriptions() { return $$('.inventory_item_desc') }
    get cartQuantities() { return $$('.cart_quantity') }

    get paymentInfoLabel() { return $('[data-test="payment-info-label"]') }
    get paymentInfo() { return $('[data-test="payment-info-value"]') }
    get shippingInfoLabel() { return $('[data-test="shipping-info-label"]') }
    get shippingInfo() { return $('[data-test="shipping-info-value"]') }

    get itemTotalLabel() { return $('[data-test="subtotal-label"]') }
    get taxLabel() { return $('[data-test="tax-label"]') }
    get totalLabel() { return $('[data-test="total-label"]') }

    get finishBtn() { return $('#finish') }
    get cancelBtn() { return $('#cancel') }

    get hamburgerMenu() { return $('#react-burger-menu-btn') }
    get cartIcon() { return $('#shopping_cart_container') }
    get cartBadge() { return $('.shopping_cart_badge') }

    async getPageTitle() {
        await this.title.waitForDisplayed()
        return await this.title.getText()
    }

    async finish() {
        await this.finishBtn.click()
    }

    async cancel() {
        await this.cancelBtn.click()
    }

    async getItemTotal() {
        await this.itemTotalLabel.waitForDisplayed()
        return await this.itemTotalLabel.getText()
    }

    async getTax() {
        await this.taxLabel.waitForDisplayed()
        return await this.taxLabel.getText()
    }

    async getTotal() {
        await this.totalLabel.waitForDisplayed()
        return await this.totalLabel.getText()
    }

    async getPaymentInfo() {
        await this.paymentInfo.waitForDisplayed()
        return await this.paymentInfo.getText()
    }

    async getShippingInfo() {
        await this.shippingInfo.waitForDisplayed()
        return await this.shippingInfo.getText()
    }

    async getPaymentInfoLabel() {
        return await this.paymentInfoLabel.getText()
    }

    async getShippingInfoLabel() {
        return await this.shippingInfoLabel.getText()
    }

    async getCartItemNames() {
        const names = await this.cartItemNames
        const nameTexts = []
        for (let name of names) {
            nameTexts.push(await name.getText())
        }
        return nameTexts
    }

    async getCartItemPrices() {
        const prices = await this.cartItemPrices
        const priceTexts = []
        for (let price of prices) {
            priceTexts.push(await price.getText())
        }
        return priceTexts
    }

    async getCartItemDescriptions() {
        const descriptions = await this.cartItemDescriptions
        const descTexts = []
        for (let desc of descriptions) {
            descTexts.push(await desc.getText())
        }
        return descTexts
    }

    async getCartQuantities() {
        const quantities = await this.cartQuantities
        const quantityTexts = []
        for (let qty of quantities) {
            quantityTexts.push(await qty.getText())
        }
        return quantityTexts
    }

    async getCartItemCount() {
        return (await this.cartItems).length
    }

    async getOrderSummary() {
        const names = await this.getCartItemNames()
        const prices = await this.getCartItemPrices()
        const quantities = await this.getCartQuantities()
        const descriptions = await this.getCartItemDescriptions()
        
        const items = []
        for (let i = 0; i < names.length; i++) {
            items.push({
                name: names[i],
                price: prices[i],
                quantity: quantities[i],
                description: descriptions[i]
            })
        }
        
        return {
            items,
            itemTotal: await this.getItemTotal(),
            tax: await this.getTax(),
            total: await this.getTotal(),
            paymentInfo: await this.getPaymentInfo(),
            shippingInfo: await this.getShippingInfo()
        }
    }

    async calculateExpectedSubtotal() {
        const prices = await this.getCartItemPrices()
        let subtotal = 0
        
        for (let price of prices) {
            const numericPrice = parseFloat(price.replace('$', ''))
            subtotal += numericPrice
        }
        
        return subtotal
    }

    async validateTotals() {
        const itemTotalText = await this.getItemTotal()
        const taxText = await this.getTax()
        const totalText = await this.getTotal()
        
        // Extraer valores numéricos
        const itemTotal = parseFloat(itemTotalText.replace(/[^\d.]/g, ''))
        const tax = parseFloat(taxText.replace(/[^\d.]/g, ''))
        const total = parseFloat(totalText.replace(/[^\d.]/g, ''))
        
        const expectedTotal = itemTotal + tax
        const isValid = Math.abs(total - expectedTotal) < 0.01 
        
        return {
            itemTotal,
            tax,
            total,
            expectedTotal,
            isValid
        }
    }

    async validatePaymentAndShipping() {
        const paymentInfo = await this.getPaymentInfo()
        const shippingInfo = await this.getShippingInfo()
        
        return {
            hasPaymentInfo: paymentInfo !== '',
            hasShippingInfo: shippingInfo !== '',
            paymentInfo,
            shippingInfo
        }
    }

    async isCheckoutStepTwoPageDisplayed() {
        try {
            await this.checkoutSummaryContainer.waitForDisplayed({ timeout: 5000 })
            const title = await this.getPageTitle()
            return title === 'Checkout: Overview'
        } catch {
            return false
        }
    }

    async isFinishButtonEnabled() {
        return await this.finishBtn.isEnabled()
    }

    async isCancelButtonDisplayed() {
        return await this.cancelBtn.isDisplayed()
    }

    async areAllSummaryElementsDisplayed() {
        const elementsDisplayed = await Promise.all([
            this.paymentInfoLabel.isDisplayed(),
            this.paymentInfo.isDisplayed(),
            this.shippingInfoLabel.isDisplayed(),
            this.shippingInfo.isDisplayed(),
            this.itemTotalLabel.isDisplayed(),
            this.taxLabel.isDisplayed(),
            this.totalLabel.isDisplayed()
        ])
        
        return elementsDisplayed.every(displayed => displayed === true)
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

    async verifyItemsMatchCart(expectedItems) {
        const currentItems = await this.getCartItemNames()
        const expectedNames = expectedItems.map(item => item.name)
        
        return {
            itemsMatch: JSON.stringify(currentItems.sort()) === JSON.stringify(expectedNames.sort()),
            currentItems,
            expectedNames
        }
    }
}

export default new CheckoutStepTwoPage()