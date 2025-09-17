import Page from './page.js'

class InventoryPage extends Page {
    get title() { return $('.title') }
    get hamburgerMenu() { return $('#react-burger-menu-btn') }
    get logoutLink() { return $('#logout_sidebar_link') }
    get cartBadge() { return $('.shopping_cart_badge') }
    get cartIcon() { return $('#shopping_cart_container') }
    get sortDropdown() { return $('[data-test="product_sort_container"]') }
    get inventoryContainer() { return $('.inventory_container') }

    get sidebarMenu() { return $('.bm-menu') }
    get allItemsLink() { return $('#inventory_sidebar_link') }
    get aboutLink() { return $('#about_sidebar_link') }
    get resetAppLink() { return $('#reset_sidebar_link') }
    get closeMenuBtn() { return $('#react-burger-cross-btn') }

    get productItems() { return $$('.inventory_item') }
    get productNames() { return $$('.inventory_item_name') }
    get productPrices() { return $$('.inventory_item_price') }
    get productDescriptions() { return $$('.inventory_item_desc') }
    get productImages() { return $$('.inventory_item_img img') }
    get addToCartButtons() { return $$('button[id^="add-to-cart"]') }
    get removeButtons() { return $$('button[id^="remove"]') }

    get backpackAddBtn() { return $('#add-to-cart-sauce-labs-backpack') }
    get bikeLightAddBtn() { return $('#add-to-cart-sauce-labs-bike-light') }
    get boltTShirtAddBtn() { return $('#add-to-cart-sauce-labs-bolt-t-shirt') }
    get fleeceJacketAddBtn() { return $('#add-to-cart-sauce-labs-fleece-jacket') }
    get onesieAddBtn() { return $('#add-to-cart-sauce-labs-onesie') }
    get redTShirtAddBtn() { return $('#add-to-cart-test.allthethings()-t-shirt-(red)') }

    get backpackRemoveBtn() { return $('#remove-sauce-labs-backpack') }
    get bikeLightRemoveBtn() { return $('#remove-sauce-labs-bike-light') }
    get boltTShirtRemoveBtn() { return $('#remove-sauce-labs-bolt-t-shirt') }
    get fleeceJacketRemoveBtn() { return $('#remove-sauce-labs-fleece-jacket') }
    get onesieRemoveBtn() { return $('#remove-sauce-labs-onesie') }
    get redTShirtRemoveBtn() { return $('#remove-test.allthethings()-t-shirt-(red)') }

    async getPageTitle() {
        await this.title.waitForDisplayed()
        return await this.title.getText()
    }

    async addProductToCart(productName) {
        const productButtons = {
            'Sauce Labs Backpack': this.backpackAddBtn,
            'Sauce Labs Bike Light': this.bikeLightAddBtn,
            'Sauce Labs Bolt T-Shirt': this.boltTShirtAddBtn,
            'Sauce Labs Fleece Jacket': this.fleeceJacketAddBtn,
            'Sauce Labs Onesie': this.onesieAddBtn,
            'Test.allTheThings() T-Shirt (Red)': this.redTShirtAddBtn
        }
        
        const button = productButtons[productName]
        if (button && await button.isDisplayed()) {
            await button.click()
            await browser.pause(500)
        } else {
            throw new Error(`Producto "${productName}" no encontrado o no disponible`)
        }
    }

    async removeProductFromCart(productName) {
        const removeButtons = {
            'Sauce Labs Backpack': this.backpackRemoveBtn,
            'Sauce Labs Bike Light': this.bikeLightRemoveBtn,
            'Sauce Labs Bolt T-Shirt': this.boltTShirtRemoveBtn,
            'Sauce Labs Fleece Jacket': this.fleeceJacketRemoveBtn,
            'Sauce Labs Onesie': this.onesieRemoveBtn,
            'Test.allTheThings() T-Shirt (Red)': this.redTShirtRemoveBtn
        }
        
        const button = removeButtons[productName]
        if (button && await button.isDisplayed()) {
            await button.click()
            await browser.pause(500)
        }
    }

    async getCartItemCount() {
        try {
            await this.cartBadge.waitForDisplayed({ timeout: 1000 })
            const badgeText = await this.cartBadge.getText()
            return parseInt(badgeText)
        } catch {
            return 0
        }
    }

    async goToCart() {
        await this.cartIcon.click()
    }

    async sortProducts(option) {
        await this.sortDropdown.selectByVisibleText(option)
        await browser.pause(1000)
    }

    async getProductNames() {
        const names = await this.productNames
        const nameTexts = []
        for (let name of names) {
            nameTexts.push(await name.getText())
        }
        return nameTexts
    }

    async getProductPrices() {
        const prices = await this.productPrices
        const priceTexts = []
        for (let price of prices) {
            priceTexts.push(await price.getText())
        }
        return priceTexts
    }

    async getProductDescriptions() {
        const descriptions = await this.productDescriptions
        const descTexts = []
        for (let desc of descriptions) {
            descTexts.push(await desc.getText())
        }
        return descTexts
    }

    async clickProductByName(productName) {
        const names = await this.productNames
        for (let name of names) {
            if ((await name.getText()) === productName) {
                await name.click()
                break
            }
        }
    }

    async getProductCount() {
        return (await this.productItems).length
    }

    async isProductDisplayed(productName) {
        const names = await this.getProductNames()
        return names.includes(productName)
    }

    async openMenu() {
        await this.hamburgerMenu.click()
        await this.sidebarMenu.waitForDisplayed()
    }

    async closeMenu() {
        await this.closeMenuBtn.click()
    }

    async logout() {
        await this.openMenu()
        await this.logoutLink.waitForDisplayed()
        await this.logoutLink.click()
    }

    async resetApp() {
        await this.openMenu()
        await this.resetAppLink.click()
        await this.closeMenu()
    }

    async goToAbout() {
        await this.openMenu()
        await this.aboutLink.click()
    }

    async isInventoryPageDisplayed() {
        try {
            await this.inventoryContainer.waitForDisplayed({ timeout: 5000 })
            return true
        } catch {
            return false
        }
    }

    async verifyProductsLoaded() {
        const productCount = await this.getProductCount()
        return productCount === 6 
    }
}

export default new InventoryPage()