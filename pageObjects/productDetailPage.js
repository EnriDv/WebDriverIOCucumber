import Page from './page.js'

class ProductDetailPage extends Page {
    get productContainer() { return $('.inventory_details_container') }
    get inventoryDetailsContainer() { return $('.inventory_details') }
    
    get productName() { return $('[data-test="inventory-item-name"]') }
    get productDescription() { return $('[data-test="inventory-item-desc"]') }
    get productPrice() { return $('[data-test="inventory-item-price"]') }
    get productImage() { return $('.inventory_details_img') }
    get productImageSrc() { return $('.inventory_details_img img') }
    
    get addToCartBtn() { return $('button[id^="add-to-cart"]') }
    get removeBtn() { return $('button[id^="remove"]') }
    get backBtn() { return $('#back-to-products') }
    
    get hamburgerMenu() { return $('#react-burger-menu-btn') }
    get cartIcon() { return $('#shopping_cart_container') }
    get cartBadge() { return $('.shopping_cart_badge') }

    async getProductName() {
        await this.productName.waitForDisplayed()
        return await this.productName.getText()
    }

    async getProductDescription() {
        await this.productDescription.waitForDisplayed()
        return await this.productDescription.getText()
    }

    async getProductPrice() {
        await this.productPrice.waitForDisplayed()
        return await this.productPrice.getText()
    }

    async getProductImageSrc() {
        await this.productImageSrc.waitForDisplayed()
        return await this.productImageSrc.getAttribute('src')
    }

    async addToCart() {
        if (await this.addToCartBtn.isDisplayed()) {
            await this.addToCartBtn.click()
            await browser.pause(500)
        } else {
            throw new Error('El botón "Add to Cart" no está disponible')
        }
    }

    async removeFromCart() {
        if (await this.removeBtn.isDisplayed()) {
            await this.removeBtn.click()
            await browser.pause(500)
        } else {
            throw new Error('El botón "Remove" no está disponible')
        }
    }

    async goBack() {
        await this.backBtn.click()
    }

    async backToProducts() {
        await this.goBack()
    }

    async isAddToCartButtonDisplayed() {
        try {
            return await this.addToCartBtn.isDisplayed()
        } catch {
            return false
        }
    }

    async isRemoveButtonDisplayed() {
        try {
            return await this.removeBtn.isDisplayed()
        } catch {
            return false
        }
    }

    async isProductInCart() {
        return await this.isRemoveButtonDisplayed()
    }

    async isProductNotInCart() {
        return await this.isAddToCartButtonDisplayed()
    }

    async isBackButtonDisplayed() {
        return await this.backBtn.isDisplayed()
    }

    async isProductImageDisplayed() {
        try {
            await this.productImage.waitForDisplayed()
            return await this.productImage.isDisplayed()
        } catch {
            return false
        }
    }

    async isProductDetailPageDisplayed() {
        try {
            await this.productContainer.waitForDisplayed({ timeout: 5000 })
            return await this.productName.isDisplayed() && 
                   await this.productDescription.isDisplayed() && 
                   await this.productPrice.isDisplayed()
        } catch {
            return false
        }
    }

    async getProductDetails() {
        const name = await this.getProductName()
        const description = await this.getProductDescription()
        const price = await this.getProductPrice()
        const imageSrc = await this.getProductImageSrc()
        const inCart = await this.isProductInCart()
        
        return {
            name,
            description,
            price,
            imageSrc,
            inCart
        }
    }

    async validateProductData() {
        const details = await this.getProductDetails()
        
        const validations = {
            hasName: details.name !== '',
            hasDescription: details.description !== '',
            hasPriceFormat: details.price.startsWith('$'),
            hasValidPrice: !isNaN(parseFloat(details.price.replace('$', ''))),
            hasImage: details.imageSrc !== '',
            hasValidImageUrl: details.imageSrc.includes('http') || details.imageSrc.includes('/'),
            buttonsWorking: await this.isAddToCartButtonDisplayed() || await this.isRemoveButtonDisplayed()
        }
        
        const allValidationsPass = Object.values(validations).every(validation => validation === true)
        
        return {
            ...validations,
            allValidationsPass,
            productDetails: details
        }
    }

    async toggleCartStatus() {
        const isInCart = await this.isProductInCart()
        
        if (isInCart) {
            await this.removeFromCart()
            return 'removed'
        } else {
            await this.addToCart()
            return 'added'
        }
    }

    async addToCartAndVerify() {
        const initialCartCount = await this.getCartBadgeCount()
        await this.addToCart()
        const newCartCount = await this.getCartBadgeCount()
        
        return {
            success: newCartCount === initialCartCount + 1,
            initialCount: initialCartCount,
            newCount: newCartCount,
            buttonChanged: await this.isRemoveButtonDisplayed()
        }
    }

    async removeFromCartAndVerify() {
        const initialCartCount = await this.getCartBadgeCount()
        await this.removeFromCart()
        const newCartCount = await this.getCartBadgeCount()
        
        return {
            success: newCartCount === initialCartCount - 1,
            initialCount: initialCartCount,
            newCount: newCartCount,
            buttonChanged: await this.isAddToCartButtonDisplayed()
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

    async goToCart() {
        await this.cartIcon.click()
    }

    async validateForProblemUser() {
        const details = await this.getProductDetails()
        const price = parseFloat(details.price.replace('$', ''))
        
        return {
            productDetails: details,
            priceSeemsSuspicious: price > 100, 
            imageSeemsSuspicious: !details.imageSrc.includes('jpg') && !details.imageSrc.includes('png')
        }
    }
}

export default new ProductDetailPage()