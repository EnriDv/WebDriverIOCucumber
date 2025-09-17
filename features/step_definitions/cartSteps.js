import { Given, When, Then } from '@wdio/cucumber-framework'
import CartPage from '../pageobjects/cartPage.js'
import InventoryPage from '../pageobjects/inventoryPage.js'

Given('que estoy en la página del carrito', async () => {
    expect(await CartPage.isCartPageDisplayed()).toBe(true)
})

Given('que el carrito contiene {string}', async (productName) => {
    expect(await CartPage.isItemInCart(productName)).toBe(true)
})

Given('que el carrito contiene los siguientes productos:', async (dataTable) => {
    const expectedProducts = dataTable.hashes()
    const cartItems = await CartPage.getCartItemNames()
    
    for (const product of expectedProducts) {
        expect(cartItems).toContain(product.producto)
    }
})

Given('que he añadido productos al carrito desde el inventario', async () => {
    // Este step asume que ya se agregaron productos previamente
    const itemCount = await CartPage.getCartItemCount()
    expect(itemCount).toBeGreaterThan(0)
})

When('voy al carrito de compras', async () => {
    await InventoryPage.goToCart()
    expect(await CartPage.isCartPageDisplayed()).toBe(true)
})

When('elimino {string} del carrito', async (productName) => {
    await CartPage.removeItemByName(productName)
})

When('elimino el producto en la posición {int}', async (position) => {
    const index = position - 1 
    await CartPage.removeItemByIndex(index)
})

When('elimino todos los productos del carrito', async () => {
    await CartPage.removeAllItems()
})

When('hago clic en "Continue Shopping"', async () => {
    await CartPage.continueShopping()
})

When('procedo al checkout', async () => {
    await CartPage.proceedToCheckout()
})

When('vuelvo al inventario desde el carrito', async () => {
    await CartPage.goToInventory()
})

// Then steps para Carrito
Then('debería estar en la página del carrito', async () => {
    expect(await CartPage.isCartPageDisplayed()).toBe(true)
    expect(await CartPage.getPageTitle()).toBe('Your Cart')
})

Then('el carrito debería contener {string}', async (productName) => {
    expect(await CartPage.isItemInCart(productName)).toBe(true)
})

Then('el carrito no debería contener {string}', async (productName) => {
    expect(await CartPage.isItemInCart(productName)).toBe(false)
})

Then('el carrito debería contener {int} producto(s)', async (expectedCount) => {
    const itemCount = await CartPage.getCartItemCount()
    expect(itemCount).toBe(expectedCount)
})

Then('el carrito debería estar vacío', async () => {
    expect(await CartPage.isCartEmpty()).toBe(true)
    expect(await CartPage.getCartItemCount()).toBe(0)
})

Then('debería ver el botón "Continue Shopping"', async () => {
    expect(await CartPage.isContinueShoppingButtonDisplayed()).toBe(true)
})

Then('debería ver el botón "Checkout"', async () => {
    expect(await CartPage.isCheckoutButtonDisplayed()).toBe(true)
})

Then('el botón "Checkout" debería estar habilitado', async () => {
    expect(await CartPage.isCheckoutButtonEnabled()).toBe(true)
})

Then('el botón "Checkout" debería estar deshabilitado', async () => {
    expect(await CartPage.isCheckoutButtonEnabled()).toBe(false)
})

Then('debería ver todos los detalles del producto {string}', async (productName) => {
    const cartItems = await CartPage.getCartItemNames()
    const cartDescriptions = await CartPage.getCartItemDescriptions()
    const cartPrices = await CartPage.getCartItemPrices()
    
    expect(cartItems).toContain(productName)
    
    const productIndex = cartItems.indexOf(productName)
    expect(productIndex).toBeGreaterThanOrEqual(0)
    
    expect(cartDescriptions[productIndex]).toBeDefined()
    expect(cartDescriptions[productIndex].length).toBeGreaterThan(0)
    expect(cartPrices[productIndex]).toMatch(/^\$\d+\.\d{2}$/)
})

Then('todas las cantidades deberían ser {string}', async (expectedQuantity) => {
    const quantities = await CartPage.getCartQuantities()
    quantities.forEach(qty => {
        expect(qty).toBe(expectedQuantity)
    })
})

Then('debería ver el resumen correcto del carrito', async () => {
    const summary = await CartPage.getCartSummary()
    expect(summary.length).toBeGreaterThan(0)
    
    summary.forEach(item => {
        expect(item.name).toBeDefined()
        expect(item.name.length).toBeGreaterThan(0)
        expect(item.price).toMatch(/^\$\d+\.\d{2}$/)
        expect(item.quantity).toBeDefined()
    })
})

Then('el badge del carrito debería mostrar {int}', async (expectedCount) => {
    const badgeCount = await CartPage.getCartBadgeCount()
    expect(badgeCount).toBe(expectedCount)
})

Then('el badge del carrito no debería estar visible', async () => {
    const badgeCount = await CartPage.getCartBadgeCount()
    expect(badgeCount).toBe(0)
})

Then('debería poder validar correctamente los datos del carrito', async () => {
    const validation = await CartPage.validateCartData()
    expect(validation.isDataConsistent).toBe(true)
    expect(validation.pricesValid).toBe(true)
    expect(validation.quantitiesValid).toBe(true)
    expect(validation.itemCount).toBeGreaterThan(0)
})

Then('los precios deberían tener formato monetario correcto', async () => {
    const prices = await CartPage.getCartItemPrices()
    prices.forEach(price => {
        expect(price).toMatch(/^\$\d+\.\d{2}$/)
        const numericValue = parseFloat(price.replace('$', ''))
        expect(numericValue).toBeGreaterThan(0)
    })
})

Then('debería poder ver los nombres completos de los productos', async () => {
    const names = await CartPage.getCartItemNames()
    names.forEach(name => {
        expect(name.length).toBeGreaterThan(0)
        expect(name).not.toBe('undefined')
        expect(name).not.toBe('')
    })
})

Then('debería poder ver las descripciones completas', async () => {
    const descriptions = await CartPage.getCartItemDescriptions()
    descriptions.forEach(desc => {
        expect(desc.length).toBeGreaterThan(10) 
        expect(desc).not.toBe('undefined')
        expect(desc).not.toBe('')
    })
})

Then('el contador del carrito debería coincidir con los items mostrados', async () => {
    const displayedItems = await CartPage.getCartItemCount()
    const badgeCount = await CartPage.getCartBadgeCount()
    
    if (displayedItems > 0) {
        expect(badgeCount).toBe(displayedItems)
    } else {
        expect(badgeCount).toBe(0)
    }
})

Then('debería poder calcular el total esperado de los productos', async () => {
    const prices = await CartPage.getCartItemPrices()
    let expectedTotal = 0
    
    prices.forEach(price => {
        const numericPrice = parseFloat(price.replace('$', ''))
        expectedTotal += numericPrice
    })
    
    expect(expectedTotal).toBeGreaterThan(0)
})

Then('debería manejar correctamente un carrito con muchos productos', async () => {
    const itemCount = await CartPage.getCartItemCount()
    const validation = await CartPage.validateCartData()
    
    expect(validation.isDataConsistent).toBe(true)
    if (itemCount > 5) {
        expect(await CartPage.isCheckoutButtonEnabled()).toBe(true)
    }
})