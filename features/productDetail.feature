Feature: Visualización y Gestión de Detalles de Productos
  Como usuario autenticado de Swag Labs
  Quiero poder ver los detalles específicos de cada producto
  Para tomar decisiones informadas antes de agregar al carrito

Background:
  Given que estoy en la página de login de Swag Labs
  When ingreso las credenciales "standard_user" y "secret_sauce"
  Then debería acceder al catálogo de productos

@producto-detalle-acceso @navegacion-inicial @smoke
Scenario: Acceder a la página de detalle de producto
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería estar en la página de detalle del producto
  And debería ver los detalles del producto "Sauce Labs Backpack"

@producto-detalle-informacion @datos-completos @validacion-contenido
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

@producto-detalle-validacion @estructura-datos @validacion-formato
Scenario: Validar que todos los datos del producto sean correctos
  When hago clic en el producto "Sauce Labs Backpack"
  Then todos los datos del producto deberían ser válidos
  And debería poder ver todos los detalles completos del producto
  And la imagen debería cargarse correctamente

@producto-detalle-agregar @desde-detalle @gestion-carrito
Scenario: Agregar producto al carrito desde página de detalle
  Given que el carrito está vacío
  When hago clic en el producto "Sauce Labs Backpack"
  And debería ver el botón "Add to cart"
  When agrego el producto al carrito desde la página de detalle
  Then debería ver el botón "Remove"
  And el contador del carrito debería incrementarse

@producto-detalle-remover @desde-detalle @gestion-carrito
Scenario: Remover producto del carrito desde página de detalle
  Given agrego "Sauce Labs Backpack" al carrito
  And tengo 1 producto(s) en el carrito
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería ver el botón "Remove"
  When remuevo el producto del carrito desde la página de detalle
  Then debería ver el botón "Add to cart"
  And el contador del carrito debería decrementarse

@producto-detalle-navegacion @regreso-catalogo @navegacion-paginas
Scenario: Navegación desde página de detalle
  When hago clic en el producto "Sauce Labs Backpack"
  And regreso al catálogo desde el detalle
  Then debería poder navegar de vuelta al inventario
  And debería ver el título "Products"

@producto-detalle-navegacion @ir-carrito @navegacion-paginas
Scenario: Ir al carrito desde página de detalle
  Given agrego "Sauce Labs Bike Light" al carrito
  When hago clic en el producto "Sauce Labs Backpack"
  And voy al carrito desde la página de detalle
  Then debería estar en la página del carrito

@producto-detalle-cambio-estado @botones-dinamicos @validacion-interaccion
Scenario: Verificar cambio de estado de botones
  Given que el carrito está vacío
  When hago clic en el producto "Sauce Labs Backpack"
  And cambio el estado del producto en el carrito
  Then el estado de los botones debería cambiar apropiadamente

@producto-detalle-flujo-complejo @agregar-remover-agregar @validacion-flujo
Scenario: Flujo agregar-remover-agregar
  Given que el carrito está vacío
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería poder completar el flujo add-remove-add correctamente

@producto-detalle-multiples @varios-productos @validacion-consistencia
Scenario: Verificar múltiples productos desde detalle
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería ver los detalles del producto "Sauce Labs Backpack"
  And el precio debería ser razonable para standard_user
  
  When regreso al catálogo desde el detalle
  And hago clic en el producto "Sauce Labs Bike Light"
  Then debería ver los detalles del producto "Sauce Labs Bike Light"
  And todos los datos del producto deberían ser válidos

@producto-detalle-estado-carrito @verificacion-botones @validacion-estado
Scenario: Verificar estado correcto según contenido del carrito
  Given que el producto no está en el carrito
  When hago clic en el producto "Sauce Labs Fleece Jacket"
  Then debería ver el botón "Add to cart"
  
  When agrego el producto al carrito desde la página de detalle
  Then el producto debería agregarse al carrito correctamente
  And debería ver el botón "Remove"

@producto-detalle-flujo-multiple @agregar-varios @gestion-avanzada
Scenario: Agregar múltiples productos desde sus páginas de detalle
  Given que el carrito está vacío
  When hago clic en el producto "Sauce Labs Backpack"
  And agrego el producto al carrito desde la página de detalle
  And regreso al catálogo desde el detalle
  And hago clic en el producto "Sauce Labs Bike Light"
  And agrego el producto al carrito desde la página de detalle
  Then el contador del carrito debería incrementarse

@producto-detalle-problem-user @usuario-problematico @comportamientos-especiales
Scenario: Comportamiento con usuario problemático
  Given que estoy en la página de login de Swag Labs
  When ingreso las credenciales "problem_user" y "secret_sauce"
  Then debería acceder al catálogo de productos
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería ver los detalles del producto "Sauce Labs Backpack"
  And para problem_user los datos pueden estar incorrectos
  And el precio puede ser anómalo para problem_user
  And la imagen puede estar rota para problem_user

@producto-detalle-precios @formato-monetario @validacion-precios
Scenario: Validar formato de precios en detalles
  When hago clic en el producto "Sauce Labs Bolt T-Shirt"
  Then debería ver el precio del producto
  And el precio debería ser razonable para standard_user

@producto-detalle-imagenes @carga-visual @validacion-imagenes
Scenario: Verificar carga de imágenes de productos
  When hago clic en el producto "Sauce Labs Onesie"
  Then debería ver la imagen del producto
  And la imagen debería cargarse correctamente

@producto-detalle-performance @usuario-lento @comportamientos-especiales
Scenario: Rendimiento con usuario lento
  Given que estoy en la página de login de Swag Labs
  When ingreso las credenciales "performance_glitch_user" y "secret_sauce"
  Then debería acceder al catálogo de productos
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería estar en la página de detalle del producto
  And debería ver todos los detalles completos del producto

@producto-detalle-visual @usuario-visual @comportamientos-especiales
Scenario: Verificación visual de elementos
  Given que estoy en la página de login de Swag Labs
  When ingreso las credenciales "visual_user" y "secret_sauce"
  Then debería acceder al catálogo de productos
  When hago clic en el producto "Test.allTheThings() T-Shirt (Red)"
  Then debería estar en la página de detalle del producto
  And todos los datos del producto deberían ser válidos

@producto-detalle-flujo-completo @detalle-a-carrito @end-to-end @smoke
Scenario: Flujo completo desde inventario, detalle, carrito
  Given que el carrito está vacío
  When hago clic en el producto "Sauce Labs Fleece Jacket"
  Then debería ver los detalles del producto "Sauce Labs Fleece Jacket"
  
  When agrego el producto al carrito desde la página de detalle
  And voy al carrito desde la página de detalle
  Then debería estar en la página del carrito
  And el carrito debería contener "Sauce Labs Fleece Jacket"

@producto-detalle-navegacion-completa @todas-paginas @navegacion-completa
Scenario: Navegación completa entre todas las páginas
  When hago clic en el producto "Sauce Labs Bike Light"
  Then debería estar en la página de detalle del producto
  
  When regreso al catálogo desde el detalle
  Then debería estar en el catálogo de productos
  
  When voy al carrito de compras
  Then debería estar en la página del carrito
  
  When hago clic en "Continue Shopping"
  Then debería estar en el catálogo de productos