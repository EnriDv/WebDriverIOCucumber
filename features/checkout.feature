Feature: Proceso de Checkout Completo
  Como usuario autenticado con productos en el carrito
  Quiero completar el proceso de checkout
  Para finalizar mi compra exitosamente

Background:
  Given que estoy logueado como "standard_user"
  And que he agregado "Sauce Labs Backpack" al carrito previamente
  And que he agregado "Sauce Labs Bike Light" al carrito previamente
  And que tengo 2 producto(s) en el carrito

@checkout @smoke
Scenario: Acceder al proceso de checkout
  When voy al carrito de compras
  And procedo al checkout
  Then debería estar en la página de información del checkout

@checkoutExitoso @positivo
Scenario: Completar checkout exitosamente con información válida
  When voy al carrito de compras
  And procedo al checkout
  And completo la información personal con "Juan", "Pérez", "12345"
  Then debería estar en la página de resumen del checkout
  When finalizo la compra
  Then debería ver el mensaje de confirmación de compra
  And el carrito debería estar vacío después de la compra

@informacionPersonal @positivo
Scenario Outline: Llenar información personal paso a paso
  When voy al carrito de compras
  And procedo al checkout
  And ingreso "<nombre>" como nombre
  And ingreso "<apellido>" como apellido  
  And ingreso "<codigo>" como código postal
  And hago clic en Continue
  Then debería estar en la página de resumen del checkout

  Examples:
    | nombre | apellido | codigo |
    | María  | García   | 54321  |
    | Pedro  | López    | 67890  |
    | Ana    | Martín   | 11111  |

@camposFaltantes @negativo
Scenario Outline: Validar campos obligatorios faltantes
  When voy al carrito de compras
  And procedo al checkout
  And lleno información incompleta faltando "<campo_faltante>"
  Then debería ver el error "<error_esperado>" en el checkout
  And debería estar en la página de información del checkout

  Examples:
    | campo_faltante | error_esperado              |
    | firstName      | First Name is required      |
    | lastName       | Last Name is required       |
    | postalCode     | Postal Code is required     |

@todosVacios @negativo
Scenario: Intentar continuar con todos los campos vacíos
  When voy al carrito de compras
  And procedo al checkout
  And dejo el nombre vacío
  And dejo el apellido vacío
  And dejo el código postal vacío
  And hago clic en Continue
  Then debería ver el error específico para nombre faltante
  And debería estar en la página de información del checkout

@resumenPedido @validacion
Scenario: Verificar resumen completo del pedido
  When voy al carrito de compras
  And procedo al checkout
  And completo la información personal con "Test", "User", "99999"
  Then debería estar en la página de resumen del checkout
  And debería ver el resumen correcto con todos los productos
  And debería ver la información de pago correcta
  And debería ver la información de envío correcta
  And debería ver los totales calculados correctamente

@calculosTotales @validacion
Scenario: Validar cálculos de precios en el resumen
  When voy al carrito de compras
  And procedo al checkout
  And completo la información personal con "Test", "Calculator", "00000"
  And reviso el resumen del pedido
  Then debería ver todos los elementos del resumen
  And debería poder ver el subtotal, impuestos y total
  And debería ver los totales calculados correctamente

@cancelacion @navegacion
Scenario: Cancelar desde información personal
  When voy al carrito de compras
  And procedo al checkout
  And hago clic en Cancel en el paso uno
  Then debería estar de vuelta en el carrito

@cancelacion @navegacion
Scenario: Cancelar desde resumen del pedido
  When voy al carrito de compras
  And procedo al checkout
  And completo la información personal con "Cancel", "Test", "00000"
  And hago clic en Cancel en el resumen
  Then debería estar de vuelta en el carrito

@flujoCompleto @smoke
Scenario: Flujo de checkout completo paso a paso
  When voy al carrito de compras
  Then debería estar en la página del carrito
  And el carrito debería contener 2 producto(s)
  
  When procedo al checkout
  Then debería estar en la página de información del checkout
  And todos los campos deberían estar vacíos
  
  When completo la información personal con "Flujo", "Completo", "12345"
  Then debería estar en la página de resumen del checkout
  And debería ver el resumen correcto con todos los productos
  
  When finalizo la compra
  Then debería estar en la página de confirmación
  And debería ver el mensaje de confirmación de compra
  And el carrito debería estar vacío después de la compra

@confirmacion @validacion
Scenario: Verificar página de confirmación completa
  When voy al carrito de compras
  And procedo al checkout
  And completo la información personal con "Confirmación", "Test", "99999"
  And finalizo la compra
  Then debería estar en la página de confirmación
  And debería ver todos los elementos de confirmación
  And debería ver la imagen de confirmación
  And debería ver el botón "Back to Products"

@navegacionPost @positivo
Scenario: Navegar después de completar compra
  When voy al carrito de compras
  And procedo al checkout
  And completo la información personal con "Post", "Compra", "11111"
  And finalizo la compra
  And debería poder volver al catálogo
  When hago clic en "Back to Products"
  Then debería estar en el catálogo de productos

@multipleProdcuts @validacion
Scenario: Checkout con múltiples productos variados
  Given que he agregado "Sauce Labs Bolt T-Shirt" al carrito previamente
  And que he agregado "Sauce Labs Fleece Jacket" al carrito previamente
  And que tengo 4 producto(s) en el carrito
  When voy al carrito de compras
  And procedo al checkout
  And completo la información personal con "Multiple", "Products", "55555"
  Then debería ver el resumen correcto con todos los productos
  When finalizo la compra
  Then el proceso de checkout debería completarse exitosamente

@informacionPago @validacion
Scenario: Verificar información de pago predeterminada
  When voy al carrito de compras
  And procedo al checkout
  And completo la información personal con "Payment", "Info", "77777"
  Then la información de pago debería ser "SauceCard #31337"
  And la información de envío debería ser "Free Pony Express Delivery!"

@edgeCases @negativo
Scenario: Campos con información muy larga
  When voy al carrito de compras
  And procedo al checkout
  And ingreso "NombreMuyLargoQueExcedeLimites" como nombre
  And ingreso "ApellidoMuyLargoQueExcedeLimites" como apellido
  And ingreso "CodigoPostalMuyLargo123456789" como código postal
  And hago clic en Continue
  Then debería estar en la página de resumen del checkout

@usuarioProblematico @negativo
Scenario: Checkout con usuario problemático
  Given que estoy logueado como "problem_user"
  And que he agregado "Sauce Labs Backpack" al carrito previamente
  And que tengo productos en el carrito para checkout
  When voy al carrito de compras
  And procedo al checkout
  And completo la información personal con "Problem", "User", "99999"
  And finalizo la compra
  Then debería ver el mensaje de confirmación de compra

@performance @validacion
Scenario: Checkout con usuario de rendimiento lento
  Given que estoy logueado como "performance_glitch_user"
  And que he agregado "Sauce Labs Backpack" al carrito previamente
  And que tengo productos en el carrito para checkout
  When voy al carrito de compras
  And procedo al checkout
  And completo la información personal con "Performance", "Test", "88888"
  And finalizo la compra
  Then debería ver el mensaje de confirmación de compra