Feature: Gestión del Carrito de Compras
  Como usuario autenticado de Swag Labs  
  Quiero poder gestionar los productos en mi carrito
  Para revisar mis selecciones antes de proceder al checkout

Background:
  Given que estoy logueado como "standard_user"

@carrito @smoke
Scenario: Acceder al carrito vacío
  Given que el carrito está vacío
  When voy al carrito de compras
  Then debería estar en la página del carrito
  And el carrito debería estar vacío
  And debería ver el botón "Continue Shopping"
  And debería ver el botón "Checkout"
  And el botón "Checkout" debería estar deshabilitado

@carrito @positivo
Scenario: Ver productos agregados en el carrito
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que he agregado "Sauce Labs Bike Light" al carrito previamente
  When voy al carrito de compras
  Then debería estar en la página del carrito
  And el carrito debería contener "Sauce Labs Backpack"
  And el carrito debería contener "Sauce Labs Bike Light"
  And el carrito debería contener 2 producto(s)

@carrito @positivo
Scenario: Verificar detalles completos de productos en el carrito
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  When voy al carrito de compras
  Then debería ver todos los detalles del producto "Sauce Labs Backpack"
  And todas las cantidades deberían ser "1"
  And debería poder ver los nombres completos de los productos
  And debería poder ver las descripciones completas

@eliminarProductos @positivo
Scenario: Eliminar producto específico del carrito
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que he agregado "Sauce Labs Bike Light" al carrito previamente
  When voy al carrito de compras
  And elimino "Sauce Labs Backpack" del carrito
  Then el carrito debería contener "Sauce Labs Bike Light"
  And el carrito no debería contener "Sauce Labs Backpack"
  And el carrito debería contener 1 producto(s)

@eliminarProductos @positivo
Scenario: Eliminar producto por posición
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que he agregado "Sauce Labs Bike Light" al carrito previamente
  When voy al carrito de compras
  And elimino el producto en la posición 1
  Then el carrito debería contener 1 producto(s)

@vaciarCarrito @positivo
Scenario: Vaciar completamente el carrito
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que he agregado "Sauce Labs Bike Light" al carrito previamente
  When voy al carrito de compras
  And elimino todos los productos del carrito
  Then el carrito debería estar vacío
  And el badge del carrito no debería estar visible

@navegacion @positivo
Scenario: Continuar comprando desde el carrito
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  When voy al carrito de compras
  And hago clic en "Continue Shopping"
  Then debería estar en el catálogo de productos
  And debería ver el título "Products"

@checkout @positivo
Scenario: Proceder al checkout con productos
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que he agregado "Sauce Labs Bike Light" al carrito previamente
  When voy al carrito de compras
  Then el botón "Checkout" debería estar habilitado
  When procedo al checkout
  Then debería estar en la página de información del checkout

@validaciones @positivo
Scenario: Validar datos correctos del carrito
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que he agregado "Sauce Labs Bike Light" al carrito previamente
  When voy al carrito de compras
  Then debería poder validar correctamente los datos del carrito
  And los precios deberían tener formato monetario correcto
  And debería ver el resumen correcto del carrito

@contadores @positivo
Scenario: Verificar consistencia de contadores
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que he agregado "Sauce Labs Bike Light" al carrito previamente
  And que he agregado "Sauce Labs Onesie" al carrito previamente
  When voy al carrito de compras
  Then el contador del carrito debería coincidir con los items mostrados
  And el badge del carrito debería mostrar 3

@calculos @validacion
Scenario: Calcular total esperado de productos
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que he agregado "Sauce Labs Bike Light" al carrito previamente
  When voy al carrito de compras
  Then debería poder calcular el total esperado de los productos

@multiples @positivo
Scenario: Carrito con múltiples productos usando tabla
  Given que el carrito está vacío
  When agrego múltiples productos al carrito:
    | producto                |
    | Sauce Labs Backpack     |
    | Sauce Labs Bike Light   |
    | Sauce Labs Bolt T-Shirt |
    | Sauce Labs Fleece Jacket|
  And voy al carrito de compras
  Then el carrito debería contener los siguientes productos:
    | producto                |
    | Sauce Labs Backpack     |
    | Sauce Labs Bike Light   |
    | Sauce Labs Bolt T-Shirt |
    | Sauce Labs Fleece Jacket|
  And el carrito debería contener 4 producto(s)

@edgeCases @positivo
Scenario: Manejo de carrito con muchos productos
  Given que el carrito está vacío
  When agrego todos los productos disponibles al carrito
  And voy al carrito de compras
  Then el carrito debería contener 6 producto(s)
  And debería manejar correctamente un carrito con muchos productos
  And el botón "Checkout" debería estar habilitado

@flujoCompleto @smoke
Scenario: Flujo completo desde inventario hasta carrito
  Given que el carrito está vacío
  When agrego "Sauce Labs Backpack" al carrito
  And agrego "Sauce Labs Bike Light" al carrito
  And voy al carrito de compras
  Then debería estar en la página del carrito
  And el carrito debería contener "Sauce Labs Backpack"
  And el carrito debería contener "Sauce Labs Bike Light"
  And el carrito debería contener 2 producto(s)
  When elimino "Sauce Labs Backpack" del carrito
  Then el carrito debería contener 1 producto(s)
  When hago clic en "Continue Shopping"
  Then debería estar en el catálogo de productos

@negativos @regresion
Scenario: Intentar checkout con carrito vacío
  Given que el carrito está vacío
  When voy al carrito de compras
  Then el carrito debería estar vacío
  And el botón "Checkout" debería estar deshabilitado

@performance @validacion
Scenario: Rendimiento del carrito con usuario lento
  Given que estoy logueado como "performance_glitch_user"
  And que he agregado "Sauce Labs Backpack" al carrito previamente
  When voy al carrito de compras
  Then debería estar en la página del carrito
  And el carrito debería contener "Sauce Labs Backpack"

@problematico @negativo
Scenario: Comportamiento del carrito con usuario problemático
  Given que estoy logueado como "problem_user" 
  And que he agregado "Sauce Labs Backpack" al carrito previamente
  When voy al carrito de compras
  Then debería estar en la página del carrito
  And el carrito debería contener "Sauce Labs Backpack"