# WebDriverIOCucumber
web driver con cucumber

1. login.feature
Escenarios cubiertos:

✅ Login exitoso con 5 tipos de usuarios

❌ Login fallido (usuario bloqueado)

❌ Credenciales inválidas

❌ Campos vacíos/parciales

🔍 Validaciones de UI

⚡ Casos límite y caracteres especiales

2. inventory.feature
Escenarios cubiertos:

✅ Carga y visualización del catálogo

✅ Agregar productos individuales/múltiples

✅ Remover productos del carrito

🔄 Ordenamiento por 4 criterios diferentes

🎛️ Funcionalidad del menú lateral

🔄 Reset de aplicación

👤 Comportamiento con usuarios especiales

3. productDetail.feature
Escenarios cubiertos:

📄 Visualización completa de información

✅ Agregar/remover desde detalle

🧭 Navegación entre páginas

✔️ Validación de datos del producto

🔄 Cambios de estado de botones

🎭 Comportamiento con usuarios problemáticos

4. cart.feature
Escenarios cubiertos:

🛒 Gestión completa del carrito

➖ Eliminación individual y masiva

🧮 Validaciones de datos y cálculos

🏪 Navegación entre carrito e inventario

✅ Preparación para checkout

📊 Consistencia de contadores

5. checkout.feature
Escenarios cubiertos:

📋 Información personal (paso 1)

📄 Resumen del pedido (paso 2)

✅ Confirmación exitosa (paso 3)

❌ Validaciones de campos obligatorios

🚫 Cancelaciones en cada paso

🧮 Validación de cálculos y totales


# Por módulo individual
npx wdio run --spec='./features/login.feature'
npx wdio run --spec='./features/inventory.feature'  
npx wdio run --spec='./features/cart.feature'

 Estrategia de Tags
@smoke: Pruebas principales críticas

@positivo: Casos de éxito

@negativo: Casos de error/fallo

@validacion: Validaciones de datos

@ui: Verificaciones de interfaz

@navegacion: Flujos de navegación

@performance: Pruebas con usuarios lentos

@problematico: Comportamiento con problem_user

@regresion: Casos de regresión importantes

@edgeCases: Casos límite

# Por tipos de prueba
npx wdio run --cucumberOpts.tagExpression='@smoke'
npx wdio run --cucumberOpts.tagExpression='@negativo'
