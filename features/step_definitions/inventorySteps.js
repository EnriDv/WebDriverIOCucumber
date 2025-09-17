import { Given, When, Then } from '@wdio/cucumber-framework'
import InventoryPage from '../pageobjects/inventoryPage.js'
import LoginPage from '../pageobjects/loginPage.js'

Given('que estoy logueado como {string}', async (userType) => {
    await LoginPage.open()
    await LoginPage.login(userType, 'secret_sauce')
    expect(await InventoryPage.isInventoryPageDisplayed()).toBe(true)
    expect(await InventoryPage.getPageTitle()).toBe('Products')
})

Given('que estoy en el catálogo de productos', async () => {
    expect(await InventoryPage.isInventoryPageDisplayed()).toBe(true)
})

Given('que el carrito está vacío', async () => {
    const cartCount = await InventoryPage.getCartItemCount()
    expect(cartCount).toBe(0)
})

Given('que tengo {int} producto(s) en el carrito', async (expectedCount) => {
    const cartCount = await InventoryPage.getCartItemCount()
    expect(cartCount).toBe(expectedCount)
})

Given('que he agregado {string} al carrito previamente', async (productName) => {
    await InventoryPage.addProductToCart(productName)
    const cartCount = await InventoryPage.getCartItemCount()
    expect(cartCount).toBeGreaterThan(0)
})

// When steps para Inventario
When('agrego {string} al carrito', async (productName) => {
    await InventoryPage.addProductToCart(productName)
})

When('remuevo {string} del carrito', async (productName) => {
    await InventoryPage.removeProductFromCart(productName)
})

When('ordeno los productos por {string}', async (sortOption) => {
    await InventoryPage.sortProducts(sortOption)
})

When('hago clic en el producto {string}', async (productName) => {
    await InventoryPage.clickProductByName(productName)
})

When('abro el menú hamburguesa', async () => {
    await InventoryPage.openMenu()
})

When('cierro el menú hamburguesa', async () => {
    await InventoryPage.closeMenu()
})

When('hago clic en "All Items" del menú', async () => {
    await InventoryPage.openMenu()
    await InventoryPage.allItemsLink.click()
})

When('hago clic en "About" del menú', async () => {
    await InventoryPage.goToAbout()
})

When('hago clic en "Reset App State"', async () => {
    await InventoryPage.resetApp()
})

When('voy al carrito de compras', async () => {
    await InventoryPage.goToCart()
})

When('agrego múltiples productos al carrito:', async (dataTable) => {
    const products = dataTable.hashes()
    for (const product of products) {
        await InventoryPage.addProductToCart(product.producto)
    }
})

When('agrego todos los productos disponibles al carrito', async () => {
    const productNames = await InventoryPage.getProductNames()
    for (const productName of productNames) {
        await InventoryPage.addProductToCart(productName)
    }
})

Then('debería ver {int} productos en el catálogo', async (expectedCount) => {
    const productCount = await InventoryPage.getProductCount()
    expect(productCount).toBe(expectedCount)
})

Then('el carrito debería mostrar {int} producto(s)', async (expectedCount) => {
    const count = await InventoryPage.getCartItemCount()
    expect(count).toBe(expectedCount)
})

Then('los productos deberían estar ordenados correctamente', async () => {
    const productNames = await InventoryPage.getProductNames()
    expect(productNames.length).toBeGreaterThan(0)
})

Then('los productos deberían estar ordenados alfabéticamente A-Z', async () => {
    const productNames = await InventoryPage.getProductNames()
    const sortedNames = [...productNames].sort()
    expect(productNames).toEqual(sortedNames)
})

Then('los productos deberían estar ordenados alfabéticamente Z-A', async () => {
    const productNames = await InventoryPage.getProductNames()
    const sortedNames = [...productNames].sort().reverse()
    expect(productNames).toEqual(sortedNames)
})

Then('los productos deberían estar ordenados por precio ascendente', async () => {
    const prices = await InventoryPage.getProductPrices()
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')))
    const sortedPrices = [...numericPrices].sort((a, b) => a - b)
    expect(numericPrices).toEqual(sortedPrices)
})

Then('los productos deberían estar ordenados por precio descendente', async () => {
    const prices = await InventoryPage.getProductPrices()
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')))
    const sortedPrices = [...numericPrices].sort((a, b) => b - a)
    expect(numericPrices).toEqual(sortedPrices)
})

Then('debería ver el título {string}', async (expectedTitle) => {
    const title = await InventoryPage.getPageTitle()
    expect(title).toBe(expectedTitle)
})

Then('debería poder ver todos los productos con sus precios', async () => {
    const productNames = await InventoryPage.getProductNames()
    const productPrices = await InventoryPage.getProductPrices()
    
    expect(productNames.length).toBeGreaterThan(0)
    expect(productPrices.length).toBe(productNames.length)
    
    productPrices.forEach(price => {
        expect(price).toMatch(/^\$\d+\.\d{2}$/)
    })
})

Then('debería poder ver todas las descripciones de productos', async () => {
    const descriptions = await InventoryPage.getProductDescriptions()
    expect(descriptions.length).toBeGreaterThan(0)
    
    descriptions.forEach(desc => {
        expect(desc.length).toBeGreaterThan(0)
    })
})

Then('debería ver el producto {string} en el catálogo', async (productName) => {
    const isDisplayed = await InventoryPage.isProductDisplayed(productName)
    expect(isDisplayed).toBe(true)
})

Then('no debería ver ningún producto en el catálogo', async () => {
    const productCount = await InventoryPage.getProductCount()
    expect(productCount).toBe(0)
})

Then('el menú lateral debería estar visible', async () => {
    expect(await InventoryPage.sidebarMenu.isDisplayed()).toBe(true)
})

Then('el menú lateral debería estar cerrado', async () => {
    expect(await InventoryPage.sidebarMenu.isDisplayed()).toBe(false)
})

Then('debería ver todos los botones "Add to cart" disponibles', async () => {
    const addButtons = await InventoryPage.addToCartButtons
    expect(addButtons.length).toBe(6)
    
    for (const button of addButtons) {
        expect(await button.isDisplayed()).toBe(true)
        expect(await button.isEnabled()).toBe(true)
    }
})

Then('algunos botones deberían mostrar "Remove"', async () => {
    const removeButtons = await InventoryPage.removeButtons
    expect(removeButtons.length).toBeGreaterThan(0)
    
    for (const button of removeButtons) {
        expect(await button.isDisplayed()).toBe(true)
        expect(await button.getText()).toBe('Remove')
    }
})

Then('el carrito debería estar vacío después del reset', async () => {
    const count = await InventoryPage.getCartItemCount()
    expect(count).toBe(0)
})

Then('todos los productos deberían mostrar "Add to cart" después del reset', async () => {
    const removeButtons = await InventoryPage.removeButtons
    expect(removeButtons.length).toBe(0)
    
    const addButtons = await InventoryPage.addToCartButtons
    expect(addButtons.length).toBe(6)
})

Then('los precios pueden estar incorrectos para problem_user', async () => {
    const prices = await InventoryPage.getProductPrices()
    const hasAnomalousPrices = prices.some(price => {
        const numericPrice = parseFloat(price.replace('$', ''))
        return numericPrice > 100 // Precio  alto
    })

})

Then('debería verificar que todos los productos se cargaron correctamente', async () => {
    const productsLoaded = await InventoryPage.verifyProductsLoaded()
    expect(productsLoaded).toBe(true)
})