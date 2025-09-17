import Page from './page.js'

class CartPage extends Page {
    get title() { return $('.title') }
    get cartContainer() { return $('.cart_contents_container') }
    get cartList() { return $('.cart_list') }
    get cartFooter() { return $('.cart_footer') }

    get cartItems() { return $$('.cart_item') }
    get cartItemNames() { return $$('.inventory_item_name') }
    get cartItemPrices() { return $$('.inventory_item_price') }
    get cartItemDescriptions() { return $$('.inventory_item_desc') }
    get cartQuantities() { return $$('.cart_quantity') }
    get removeButtons() { return $$('button[id^="remove"]') }

    get continueShoppingBtn() { return $('#continue-shopping') }
    get checkoutBtn() { return $('#checkout') }

    get hamburgerMenu() { return $('#react-burger-menu-btn') }
    get cartIcon() { return $('#shopping_cart_container') }
    get cartBadge() { return $('.shopping_cart_badge') }

    async getPageTitle() {
        await this.title.waitForDisplayed()
        return await this.title.getText()
    }

    async getCartItemCount() {
        try {
            const items = await this.cartItems
            return items.length
        } catch {
            return 0
        }
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

    async removeItemByName(productName) {
        const names = await this.cartItemNames
        const removeButtons = await this.removeButtons
        
        for (let i = 0; i < names.length; i++) {
            if ((await names[i].getText()) === productName) {
                await removeButtons[i].click()
                // Esperar a que se actualice el carrito
                await browser.pause(500)
                break
            }
        }
    }

    async removeItemByIndex(index) {
        const removeButtons = await this.removeButtons
        if (index < removeButtons.length) {
            await removeButtons[index].click()
            await browser.pause(500)
        }
    }

    async removeAllItems() {
        let itemCount = await this.getCartItemCount()
        while (itemCount > 0) {
            await this.removeItemByIndex(0)
            itemCount = await this.getCartItemCount()
        }
    }

    async continueShopping() {
        await this.continueShoppingBtn.click()
    }

    async proceedToCheckout() {
        await this.checkoutBtn.click()
    }

    async isCartEmpty() {
        const itemCount = await this.getCartItemCount()
        return itemCount === 0
    }

    async isItemInCart(productName) {
        const itemNames = await this.getCartItemNames()
        return itemNames.includes(productName)
    }

    async getCartSummary() {
        const names = await this.getCartItemNames()
        const prices = await this.getCartItemPrices()
        const quantities = await this.getCartQuantities()
        
        const summary = []
        for (let i = 0; i < names.length; i++) {
            summary.push({
                name: names[i],
                price: prices[i],
                quantity: quantities[i]
            })
        }
        return summary
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

    async isCartPageDisplayed() {
        try {
            await this.cartContainer.waitForDisplayed({ timeout: 5000 })
            const title = await this.getPageTitle()
            return title === 'Your Cart'
        } catch {
            return false
        }
    }

    async isContinueShoppingButtonDisplayed() {
        return await this.continueShoppingBtn.isDisplayed()
    }

    async isCheckoutButtonDisplayed() {
        return await this.checkoutBtn.isDisplayed()
    }

    async isCheckoutButtonEnabled() {
        const itemCount = await this.getCartItemCount()
        return itemCount > 0 && await this.checkoutBtn.isEnabled()
    }

    async goToInventory() {
        await this.continueShopping()
    }

    async validateCartData() {
        const names = await this.getCartItemNames()
        const prices = await this.getCartItemPrices()
        const quantities = await this.getCartQuantities()
        
        const isDataConsistent = names.length === prices.length && prices.length === quantities.length
        
        const pricesValid = prices.every(price => price.startsWith('$') && !isNaN(parseFloat(price.slice(1))))
        
        const quantitiesValid = quantities.every(qty => !isNaN(parseInt(qty)) && parseInt(qty) > 0)
        
        return {
            isDataConsistent,
            pricesValid,
            quantitiesValid,
            itemCount: names.length
        }
    }
}

export default new CartPage()