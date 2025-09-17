import { Given, When, Then } from '@wdio/cucumber-framework'
import ProductDetailPage from '../pageobjects/productDetailPage.js'
import InventoryPage from '../pageobjects/inventoryPage.js'

Given('que estoy en la página de detalle de un producto', async () => {
    expect(await ProductDetailPage.isProductDetailPageDisplayed()).toBe(true)
})

Given('que estoy viendo el detalle de {string}', async (productName) => {
    expect(await ProductDetailPage.isProductDetailPageDisplayed()).toBe(true)
    const displayedProductName = await ProductDetailPage.getProductName()
    expect(displayedProductName).toBe(productName)
})

Given('que el producto no está en el carrito', async () => {
    expect(await ProductDetailPage.isProductNotInCart()).toBe(true)
})

Given('que el producto ya está en el carrito', async () => {
    expect(await ProductDetailPage.isProductInCart()).toBe(true)
})

When('hago clic en el producto {string}', async (productName) => {
    await InventoryPage.clickProductByName(productName)
    expect(await ProductDetailPage.isProductDetailPageDisplayed()).toBe(true)
})

When('agrego el producto al carrito desde la página de detalle', async () => {
    await ProductDetailPage.addToCart()
})

When('remuevo el producto del carrito desde la página de detalle', async () => {
    await ProductDetailPage.removeFromCart()
})

When('regreso al catálogo desde el detalle', async () => {
    await ProductDetailPage.goBack()
})

When('hago clic en "Back to products"', async () => {
    await ProductDetailPage.backToProducts()
})

When('cambio el estado del producto en el carrito', async () => {
    const action = await ProductDetailPage.toggleCartStatus()
    // La acción puede ser 'added' o 'removed'
    expect(['added', 'removed']).toContain(action)
})

When('voy al carrito desde la página de detalle', async () => {
    await ProductDetailPage.goToCart()
})

Then('debería ver los detalles del producto {string}', async (expectedName) => {
    expect(await ProductDetailPage.isProductDetailPageDisplayed()).toBe(true)
    const productName = await ProductDetailPage.getProductName()
    expect(productName).toBe(expectedName)
})

Then('debería estar en la página de detalle del producto', async () => {
    expect(await ProductDetailPage.isProductDetailPageDisplayed()).toBe(true)
})

Then('debería ver el nombre del producto', async () => {
    const productName = await ProductDetailPage.getProductName()
    expect(productName).toBeDefined()
    expect(productName.length).toBeGreaterThan(0)
})

Then('debería ver la descripción del producto', async () => {
    const description = await ProductDetailPage.getProductDescription()
    expect(description).toBeDefined()
    expect(description.length).toBeGreaterThan(10) // Descripción mínima
})

Then('debería ver el precio del producto', async () => {
    const price = await ProductDetailPage.getProductPrice()
    expect(price).toMatch(/^\$\d+\.\d{2}$/)
})

Then('debería ver la imagen del producto', async () => {
    expect(await ProductDetailPage.isProductImageDisplayed()).toBe(true)
    const imageSrc = await ProductDetailPage.getProductImageSrc()
    expect(imageSrc).toBeDefined()
    expect(imageSrc.length).toBeGreaterThan(0)
})

Then('debería ver el botón "Add to cart"', async () => {
    expect(await ProductDetailPage.isAddToCartButtonDisplayed()).toBe(true)
})

Then('debería ver el botón "Remove"', async () => {
    expect(await ProductDetailPage.isRemoveButtonDisplayed()).toBe(true)
})

Then('debería ver el botón "Back to products"', async () => {
    expect(await ProductDetailPage.isBackButtonDisplayed()).toBe(true)
})

Then('el producto debería agregarse al carrito correctamente', async () => {
    const result = await ProductDetailPage.addToCartAndVerify()
    expect(result.success).toBe(true)
    expect(result.buttonChanged).toBe(true)
})

Then('el producto debería removerse del carrito correctamente', async () => {
    const result = await ProductDetailPage.removeFromCartAndVerify()
    expect(result.success).toBe(true)
    expect(result.buttonChanged).toBe(true)
})

Then('el contador del carrito debería incrementarse', async () => {
    const cartCount = await ProductDetailPage.getCartBadgeCount()
    expect(cartCount).toBeGreaterThan(0)
})

Then('el contador del carrito debería decrementarse', async () => {
    const initialCount = await ProductDetailPage.getCartBadgeCount()
    await ProductDetailPage.removeFromCart()
    const newCount = await ProductDetailPage.getCartBadgeCount()
    expect(newCount).toBeLessThan(initialCount)
})

Then('debería poder ver todos los detalles completos del producto', async () => {
    const details = await ProductDetailPage.getProductDetails()
    expect(details.name).toBeDefined()
    expect(details.name.length).toBeGreaterThan(0)
    expect(details.description).toBeDefined()
    expect(details.description.length).toBeGreaterThan(0)
    expect(details.price).toMatch(/^\$\d+\.\d{2}$/)
    expect(details.imageSrc).toBeDefined()
})

Then('todos los datos del producto deberían ser válidos', async () => {
    const validation = await ProductDetailPage.validateProductData()
    expect(validation.allValidationsPass).toBe(true)
    expect(validation.hasName).toBe(true)
    expect(validation.hasDescription).toBe(true)
    expect(validation.hasPriceFormat).toBe(true)
    expect(validation.hasValidPrice).toBe(true)
    expect(validation.hasImage).toBe(true)
    expect(validation.buttonsWorking).toBe(true)
})

Then('debería poder navegar de vuelta al inventario', async () => {
    await ProductDetailPage.goBack()
    expect(await InventoryPage.isInventoryPageDisplayed()).toBe(true)
})

Then('para problem_user los datos pueden estar incorrectos', async () => {
    const problemValidation = await ProductDetailPage.validateForProblemUser()
    expect(problemValidation.productDetails).toBeDefined()
})

Then('el precio debería ser razonable para standard_user', async () => {
    const price = await ProductDetailPage.getProductPrice()
    const numericPrice = parseFloat(price.replace('$', ''))
    expect(numericPrice).toBeGreaterThan(0)
    expect(numericPrice).toBeLessThan(100) // Precio máximo razonable
})

Then('el precio puede ser anómalo para problem_user', async () => {
    const validation = await ProductDetailPage.validateForProblemUser()
    // documenta el comportamiento esperado
})

Then('la imagen debería cargarse correctamente', async () => {
    expect(await ProductDetailPage.isProductImageDisplayed()).toBe(true)
    const imageSrc = await ProductDetailPage.getProductImageSrc()
    expect(imageSrc).toContain('http') // URL válida
})

Then('la imagen puede estar rota para problem_user', async () => {
    const validation = await ProductDetailPage.validateForProblemUser()
})

Then('debería poder completar el flujo add-remove-add correctamente', async () => {
    // Agregar
    if (await ProductDetailPage.isAddToCartButtonDisplayed()) {
        await ProductDetailPage.addToCart()
        expect(await ProductDetailPage.isRemoveButtonDisplayed()).toBe(true)
    }
    
    await ProductDetailPage.removeFromCart()
    expect(await ProductDetailPage.isAddToCartButtonDisplayed()).toBe(true)
    
    await ProductDetailPage.addToCart()
    expect(await ProductDetailPage.isRemoveButtonDisplayed()).toBe(true)
})

Then('el estado de los botones debería cambiar apropiadamente', async () => {
    const initialState = await ProductDetailPage.isProductInCart()
    await ProductDetailPage.toggleCartStatus()
    const newState = await ProductDetailPage.isProductInCart()
    expect(newState).not.toBe(initialState)
})