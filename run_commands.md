# Solo login exitosos
npx wdio run --cucumberOpts.tagExpression='@login-exitoso'

# Solo validaciones de campos
npx wdio run --cucumberOpts.tagExpression='@validacion-campos'

# Solo gestión de carrito
npx wdio run --cucumberOpts.tagExpression='@carrito-eliminar or @carrito-agregar'

# Solo ordenamiento de productos
npx wdio run --cucumberOpts.tagExpression='@inventario-ordenar'

# Solo navegación entre páginas
npx wdio run --cucumberOpts.tagExpression='@navegacion-paginas'

---

# Solo problem_user
npx wdio run --cucumberOpts.tagExpression='@problem-user'

# Solo performance issues
npx wdio run --cucumberOpts.tagExpression='@performance-user'

# Solo usuarios especiales
npx wdio run --cucumberOpts.tagExpression='@comportamientos-especiales'

---

# Solo validaciones matemáticas
npx wdio run --cucumberOpts.tagExpression='@validacion-matematica'

# Solo validaciones de formularios
npx wdio run --cucumberOpts.tagExpression='@validacion-formulario'

# Solo casos límite
npx wdio run --cucumberOpts.tagExpression='@casos-limite'

---

# Solo flujos E2E
npx wdio run --cucumberOpts.tagExpression='@end-to-end'

# Solo flujos completos
npx wdio run --cucumberOpts.tagExpression='@flujo-completo'

# Solo smoke tests
npx wdio run --cucumberOpts.tagExpression='@smoke'


---

# Ejemplo de Ejecucion

# Ejecutar solo problemas de login
npx wdio run --cucumberOpts.tagExpression='@login-fallido'

# Ejecutar solo funcionalidad de ordenamiento
npx wdio run --cucumberOpts.tagExpression='@inventario-ordenar'

# Ejecutar solo validaciones de checkout
npx wdio run --cucumberOpts.tagExpression='@checkout-validacion'

# Ejecutar solo navegación entre páginas
npx wdio run --cucumberOpts.tagExpression='@navegacion-paginas'

# Ejecutar combinaciones específicas
npx wdio run --cucumberOpts.tagExpression='@smoke and @flujo-completo'
