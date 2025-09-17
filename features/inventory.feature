Feature: Gestión del Catálogo de Productos
  Como usuario autenticado de Swag Labs
  Quiero poder navegar y gestionar el catálogo de productos
  Para seleccionar y agregar productos al carrito

Background:
  Given que estoy en la página de login de Swag Labs
  When ingreso las credenciales "standard_user" y "secret_sauce"
  Then debería acceder al catálogo de productos

@inventario-visualizacion @carga-productos @smoke
Scenario: Verificar carga correcta del catálogo
  Then debería ver el título "Products"
  And debería ver 6 productos en el catálogo
  And debería verificar que todos los productos se cargaron correctamente

@inventario-agregar @productos-individuales @funcionalidad-basica
Scenario Outline: Agregar productos individuales al carrito
  Given que el carrito está vacío
  When agrego "<producto>" al carrito
  Then el carrito debería mostrar 1 producto(s)
  And debería ver el producto "<producto>" en el catálogo

  Examples:
    | producto                        |
    | Sauce Labs Backpack             |
    | Sauce Labs Bike Light           |
    | Sauce Labs Bolt T-Shirt         |
    | Sauce Labs Fleece Jacket        |
    | Sauce Labs Onesie               |
    | Test.allTheThings() T-Shirt (Red) |

@inventario-agregar @productos-multiples @funcionalidad-basica
Scenario: Agregar múltiples productos al carrito
  Given que el carrito está vacío
  When agrego "Sauce Labs Backpack" al carrito
  And agrego "Sauce Labs Bike Light" al carrito
  And agrego "Sauce Labs Bolt T-Shirt" al carrito
  Then el carrito debería mostrar 3 producto(s)

@inventario-remover @gestion-carrito @funcionalidad-basica
Scenario: Remover productos del carrito desde el inventario
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que tengo 1 producto(s) en el carrito
  When remuevo "Sauce Labs Backpack" del carrito
  Then el carrito debería mostrar 0 producto(s)

@inventario-ordenar @filtros-productos @funcionalidad-avanzada
Scenario Outline: Ordenar productos en el catálogo
  When ordeno los productos por "<opcion_orden>"
  Then los productos deberían estar ordenados correctamente

  Examples:
    | opcion_orden           |
    | Name (A to Z)         |
    | Name (Z to A)         |
    | Price (low to high)   |
    | Price (high to low)   |

@inventario-ordenar @alfabetico-ascendente @validacion-ordenamiento
Scenario: Validar ordenamiento alfabético A-Z
  When ordeno los productos por "Name (A to Z)"
  Then los productos deberían estar ordenados alfabéticamente A-Z

@inventario-ordenar @alfabetico-descendente @validacion-ordenamiento
Scenario: Validar ordenamiento alfabético Z-A
  When ordeno los productos por "Name (Z to A)"
  Then los productos deberían estar ordenados alfabéticamente Z-A

@inventario-ordenar @precio-ascendente @validacion-ordenamiento
Scenario: Validar ordenamiento por precio ascendente
  When ordeno los productos por "Price (low to high)"
  Then los productos deberían estar ordenados por precio ascendente

@inventario-ordenar @precio-descendente @validacion-ordenamiento
Scenario: Validar ordenamiento por precio descendente
  When ordeno los productos por "Price (high to low)"
  Then los productos deberían estar ordenados por precio descendente

@inventario-ui @elementos-interfaz @validacion-visual
Scenario: Verificar elementos de la interfaz del inventario
  Then debería poder ver todos los productos con sus precios
  And debería poder ver todas las descripciones de productos
  And debería ver todos los botones "Add to cart" disponibles

@inventario-botones @cambio-estados @validacion-interaccion
Scenario: Verificar cambio de botones al agregar productos
  Given que el carrito está vacío
  When agrego "Sauce Labs Backpack" al carrito
  And agrego "Sauce Labs Bike Light" al carrito
  Then algunos botones deberían mostrar "Remove"
  And el carrito debería mostrar 2 producto(s)

@inventario-navegacion @detalle-producto @navegacion-paginas
Scenario: Navegación a página de detalle de producto
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería ver los detalles del producto "Sauce Labs Backpack"

@inventario-menu @navegacion-lateral @funcionalidad-menu
Scenario: Funcionalidad del menú hamburguesa
  When abro el menú hamburguesa
  Then el menú lateral debería estar visible
  When cierro el menú hamburguesa
  Then el menú lateral debería estar cerrado

@inventario-reset @limpiar-estado @funcionalidad-menu
Scenario: Reset de la aplicación
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que tengo 1 producto(s) en el carrito
  When hago clic en "Reset App State"
  Then el carrito debería estar vacío después del reset
  And todos los productos deberían mostrar "Add to cart" después del reset

@inventario-navegacion @ir-carrito @navegacion-paginas
Scenario: Navegar al carrito con productos
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  When voy al carrito de compras
  Then debería estar en la página del carrito

@inventario-agregar @todos-productos @casos-limite
Scenario: Agregar todos los productos disponibles
  Given que el carrito está vacío
  When agrego todos los productos disponibles al carrito
  Then el carrito debería mostrar 6 producto(s)

@inventario-agregar @datos-tabulares @funcionalidad-avanzada
Scenario: Agregar productos usando tabla de datos
  Given que el carrito está vacío
  When agrego múltiples productos al carrito:
    | producto                |
    | Sauce Labs Backpack     |
    | Sauce Labs Bike Light   |
    | Sauce Labs Onesie       |
  Then el carrito debería mostrar 3 producto(s)

@inventario-usuario-problematico @problem-user @comportamientos-especiales
Scenario: Comportamiento con usuario problemático
  Given que estoy en la página de login de Swag Labs
  When ingreso las credenciales "problem_user" y "secret_sauce"
  Then debería acceder al catálogo de productos
  When agrego "Sauce Labs Backpack" al carrito
  Then el carrito debería mostrar 1 producto(s)
  And los precios pueden estar incorrectos para problem_user

@inventario-rendimiento @performance-user @comportamientos-especiales
Scenario: Verificar carga de productos con usuario de rendimiento lento
  Given que estoy en la página de login de Swag Labs
  When ingreso las credenciales "performance_glitch_user" y "secret_sauce"
  Then debería acceder al catálogo de productos
  And debería ver 6 productos en el catálogo
  And debería poder ver todos los productos con sus precios

@inventario-visual @visual-user @comportamientos-especiales
Scenario: Verificación con usuario visual
  Given que estoy en la página de login de Swag Labs
  When ingreso las credenciales "visual_user" y "secret_sauce"
  Then debería acceder al catálogo de productos
  And debería ver 6 productos en el catálogo
  And debería poder ver todas las descripciones de productos

@inventario-errores @error-user @comportamientos-especiales
Scenario: Manejo de usuario con errores
  Given que estoy en la página de login de Swag Labs
  When ingreso las credenciales "error_user" y "secret_sauce"
  Then debería acceder al catálogo de productos
  When agrego "Sauce Labs Backpack" al carrito
  Then el carrito debería mostrar 1 producto(s)
  #error_user puede tener comportamientos inesperados