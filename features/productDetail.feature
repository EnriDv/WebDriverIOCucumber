Feature: Visualización y Gestión de Detalles de Productos
  Como usuario autenticado de Swag Labs
  Quiero poder ver los detalles específicos de cada producto
  Para tomar decisiones informadas antes de agregar al carrito

Background:
  Given que estoy logueado como "standard_user"

@productDetail @smoke
Scenario: Acceder a la página de detalle de producto
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería estar en la página de detalle del producto
  And debería ver los detalles del producto "Sauce Labs Backpack"

@informacionProducto @validacion
Scenario Outline: Verificar información completa de productos específicos
  When hago clic en el producto "<producto>"
  Then debería ver los detalles del producto "<producto>"
  And debería ver el nombre del producto
  And debería ver la descripción del producto
  And debería ver el precio del producto
  And debería ver la imagen del producto
  And debería ver el botón "Back to products"

  Examples:
    | producto                        |
    | Sauce Labs Backpack             |
    | Sauce Labs Bike Light           |
    | Sauce Labs Bolt T-Shirt         |
    | Sauce Labs Fleece Jacket        |
    | Sauce Labs Onesie               |
    | Test.allTheThings() T-Shirt (Red) |

@validacionDatos @positivo
Scenario: Validar que todos los datos del producto sean correctos
  When hago clic en el producto "Sauce Labs Backpack"
  Then todos los datos del producto deberían ser válidos
  And debería poder ver todos los detalles completos del producto
  And la imagen debería cargarse correctamente

@agregarCarrito @positivo
Scenario: Agregar producto al carrito desde página de detalle
  Given que el carrito está vacío
  When hago clic en el producto "Sauce Labs Backpack"
  And debería ver el botón "Add to cart"
  When agrego el producto al carrito desde la página de detalle
  Then debería ver el botón "Remove"
  And el contador del carrito debería incrementarse

@removerCarrito @positivo
Scenario: Remover producto del carrito desde página de detalle
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que tengo 1 producto(s) en el carrito
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería ver el botón "Remove"
  When remuevo el producto del carrito desde la página de detalle
  Then debería ver el botón "Add to cart"
  And el contador del carrito debería decrementarse

@navegacion @positivo
Scenario: Navegación desde página de detalle
  When hago clic en el producto "Sauce Labs Backpack"
  And regreso al catálogo desde el detalle
  Then debería poder navegar de vuelta al inventario
  And debería ver el título "Products"

@navegacionCarrito @positivo
Scenario: Ir al carrito desde página de detalle
  Given que he agregado "Sauce Labs Bike Light" al carrito previamente
  When hago clic en el producto "Sauce Labs Backpack"
  And voy al carrito desde la página de detalle
  Then debería estar en la página del carrito

@cambioEstado @validacion
Scenario: Verificar cambio de estado de botones
  Given que el carrito está vacío
  When hago clic en el producto "Sauce Labs Backpack"
  And cambio el estado del producto en el carrito
  Then el estado de los botones debería cambiar apropiadamente

@flujoComplejo @validacion
Scenario: Flujo agregar-remover-agregar
  Given que el carrito está vacío
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería poder completar el flujo add-remove-add correctamente

@verificacionProductos @smoke
Scenario: Verificar múltiples productos desde detalle
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería ver los detalles del producto "Sauce Labs Backpack"
  And el precio debería ser razonable para standard_user
  
  When regreso al catálogo desde el detalle
  And hago clic en el producto "Sauce Labs Bike Light"
  Then debería ver los detalles del producto "Sauce Labs Bike Light"
  And todos los datos del producto deberían ser válidos

@estadoCarrito @validacion
Scenario: Verificar estado correcto según contenido del carrito
  Given que el producto no está en el carrito
  When hago clic en el producto "Sauce Labs Fleece Jacket"
  Then debería ver el botón "Add to cart"
  
  When agrego el producto al carrito desde la página de detalle
  Then el producto debería agregarse al carrito correctamente
  And debería ver el botón "Remove"

@multiples @positivo
Scenario: Agregar múltiples productos desde sus páginas de detalle
  Given que el carrito está vacío
  When hago clic en el producto "Sauce Labs Backpack"
  And agrego el producto al carrito desde la página de detalle
  And regreso al catálogo desde el detalle
  And hago clic en el producto "Sauce Labs Bike Light"
  And agrego el producto al carrito desde la página de detalle
  Then el contador del carrito debería incrementarse

@usuarioProblematico @negativo
Scenario: Comportamiento con usuario problemático
  Given que estoy logueado como "problem_user"
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería ver los detalles del producto "Sauce Labs Backpack"
  And para problem_user los datos pueden estar incorrectos
  And el precio puede ser anómalo para problem_user
  And la imagen puede estar rota para problem_user

@validacionPrecios @validacion
Scenario: Validar formato de precios en detalles
  When hago clic en el producto "Sauce Labs Bolt T-Shirt"
  Then debería ver el precio del producto
  And el precio debería ser razonable para standard_user

@imagenes @ui
Scenario: Verificar carga de imágenes de productos
  When hago clic en el producto "Sauce Labs Onesie"
  Then debería ver la imagen del producto
  And la imagen debería cargarse correctamente

@performance @validacion
Scenario: Rendimiento con usuario lento
  Given que estoy logueado como "performance_glitch_user"
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería estar en la página de detalle del producto
  And debería ver todos los detalles completos del producto

@visual @ui
Scenario: Verificación visual de elementos
  Given que estoy logueado como "visual_user"
  When hago clic en el producto "Test.allTheThings() T-Shirt (Red)"
  Then debería estar en la página de detalle del producto
  And todos los datos del producto deberían ser válidos

@flujoCompleto @smoke
Scenario: Flujo completo desde inventario, detalle, carrito
  Given que el carrito está vacío
  When hago clic en el producto "Sauce Labs Fleece Jacket"
  Then debería ver los detalles del producto "Sauce Labs Fleece Jacket"
  
  When agrego el producto al carrito desde la página de detalle
  And voy al carrito desde la página de detalle
  Then debería estar en la página del carrito
  And el carrito debería contener "Sauce Labs Fleece Jacket"

@navegacionCompleta @positivo
Scenario: Navegación completa entre todas las páginas
  When hago clic en el producto "Sauce Labs Bike Light"
  Then debería estar en la página de detalle del producto
  
  When regreso al catálogo desde el detalle
  Then debería estar en el catálogo de productos
  
  When voy al carrito de compras
  Then debería estar en la página del carrito
  
  When hago clic en "Continue Shopping"
  Then debería estar en el catálogo de productos