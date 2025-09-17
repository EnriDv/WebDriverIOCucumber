Feature: Gestión del Catálogo de Productos
  Como usuario autenticado de Swag Labs
  Quiero poder navegar y gestionar el catálogo de productos
  Para seleccionar y agregar productos al carrito

Background:
  Given que estoy logueado como "standard_user"

@inventario @smoke
Scenario: Verificar carga correcta del catálogo
  Then debería ver el título "Products"
  And debería ver 6 productos en el catálogo
  And debería verificar que todos los productos se cargaron correctamente

@agregarProductos @positivo
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

@agregarMultiples @positivo
Scenario: Agregar múltiples productos al carrito
  Given que el carrito está vacío
  When agrego "Sauce Labs Backpack" al carrito
  And agrego "Sauce Labs Bike Light" al carrito
  And agrego "Sauce Labs Bolt T-Shirt" al carrito
  Then el carrito debería mostrar 3 producto(s)

@removerProductos @positivo
Scenario: Remover productos del carrito desde el inventario
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que tengo 1 producto(s) en el carrito
  When remuevo "Sauce Labs Backpack" del carrito
  Then el carrito debería mostrar 0 producto(s)

@ordenamiento @positivo
Scenario Outline: Ordenar productos en el catálogo
  When ordeno los productos por "<opcion_orden>"
  Then los productos deberían estar ordenados correctamente

  Examples:
    | opcion_orden           |
    | Name (A to Z)         |
    | Name (Z to A)         |
    | Price (low to high)   |
    | Price (high to low)   |

@ordenamiento @validacion
Scenario: Validar ordenamiento alfabético A-Z
  When ordeno los productos por "Name (A to Z)"
  Then los productos deberían estar ordenados alfabéticamente A-Z

@ordenamiento @validacion
Scenario: Validar ordenamiento alfabético Z-A
  When ordeno los productos por "Name (Z to A)"
  Then los productos deberían estar ordenados alfabéticamente Z-A

@ordenamiento @validacion
Scenario: Validar ordenamiento por precio ascendente
  When ordeno los productos por "Price (low to high)"
  Then los productos deberían estar ordenados por precio ascendente

@ordenamiento @validacion
Scenario: Validar ordenamiento por precio descendente
  When ordeno los productos por "Price (high to low)"
  Then los productos deberían estar ordenados por precio descendente

@interfaz @positivo
Scenario: Verificar elementos de la interfaz del inventario
  Then debería poder ver todos los productos con sus precios
  And debería poder ver todas las descripciones de productos
  And debería ver todos los botones "Add to cart" disponibles

@interfaz @positivo
Scenario: Verificar cambio de botones al agregar productos
  Given que el carrito está vacío
  When agrego "Sauce Labs Backpack" al carrito
  And agrego "Sauce Labs Bike Light" al carrito
  Then algunos botones deberían mostrar "Remove"
  And el carrito debería mostrar 2 producto(s)

@navegacion @positivo
Scenario: Navegación a página de detalle de producto
  When hago clic en el producto "Sauce Labs Backpack"
  Then debería ver los detalles del producto "Sauce Labs Backpack"

@menu @positivo
Scenario: Funcionalidad del menú hamburguesa
  When abro el menú hamburguesa
  Then el menú lateral debería estar visible
  When cierro el menú hamburguesa
  Then el menú lateral debería estar cerrado

@menu @positivo
Scenario: Reset de la aplicación
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  And que tengo 1 producto(s) en el carrito
  When hago clic en "Reset App State"
  Then el carrito debería estar vacío después del reset
  And todos los productos deberían mostrar "Add to cart" después del reset

@carrito @positivo
Scenario: Navegar al carrito con productos
  Given que he agregado "Sauce Labs Backpack" al carrito previamente
  When voy al carrito de compras
  Then debería estar en la página del carrito

@todosProductos @positivo
Scenario: Agregar todos los productos disponibles
  Given que el carrito está vacío
  When agrego todos los productos disponibles al carrito
  Then el carrito debería mostrar 6 producto(s)

@multiples @positivo
Scenario: Agregar productos usando tabla de datos
  Given que el carrito está vacío
  When agrego múltiples productos al carrito:
    | producto                |
    | Sauce Labs Backpack     |
    | Sauce Labs Bike Light   |
    | Sauce Labs Onesie       |
  Then el carrito debería mostrar 3 producto(s)

@usuarioProblematico @negativo
Scenario: Comportamiento con usuario problemático
  Given que estoy logueado como "problem_user"
  When agrego "Sauce Labs Backpack" al carrito
  Then el carrito debería mostrar 1 producto(s)
  And los precios pueden estar incorrectos para problem_user

@rendimiento @smoke
Scenario: Verificar carga de productos con usuario de rendimiento lento
  Given que estoy logueado como "performance_glitch_user" 
  Then debería ver 6 productos en el catálogo
  And debería poder ver todos los productos con sus precios

@visuales @ui
Scenario: Verificación con usuario visual
  Given que estoy logueado como "visual_user"
  Then debería ver 6 productos en el catálogo
  And debería poder ver todas las descripciones de productos

@errores @negativo  
Scenario: Manejo de usuario con errores
  Given que estoy logueado como "error_user"
  When agrego "Sauce Labs Backpack" al carrito
  Then el carrito debería mostrar 1 producto(s)
  # Nota: error_user puede tener comportamientos inesperados