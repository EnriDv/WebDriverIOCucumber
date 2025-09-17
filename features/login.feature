Feature: Autenticación en Swag Labs
  Como usuario de Swag Labs
  Quiero poder autenticarme en el sistema
  Para acceder al catálogo de productos

Background:
  Given que estoy en la página de login de Swag Labs

@loginValido @smoke
Scenario Outline: Login exitoso con diferentes usuarios válidos
  When ingreso las credenciales "<usuario>" y "secret_sauce"
  Then debería acceder al catálogo de productos

  Examples:
    | usuario                  |
    | standard_user           |
    | problem_user            |
    | performance_glitch_user |
    | error_user              |
    | visual_user             |

@loginFallido @negativo
Scenario: Login fallido con usuario bloqueado
  When ingreso las credenciales "locked_out_user" y "secret_sauce"
  Then debería ver el mensaje de error "Epic sadface: Sorry, this user has been locked out."
  And debería permanecer en la página de login

@loginInvalido @negativo
Scenario Outline: Login fallido con credenciales inválidas
  When ingreso las credenciales "<usuario>" y "<password>"
  Then debería ver el mensaje de error "Epic sadface: Username and password do not match any user in this service"
  And debería permanecer en la página de login

  Examples:
    | usuario        | password      |
    | usuario_falso  | secret_sauce  |
    | standard_user  | password_malo |
    | invalid_user   | invalid_pass  |

@camposVacios @negativo
Scenario: Login con ambos campos vacíos
  When intento hacer login con credenciales vacías
  Then debería ver el mensaje de error "Epic sadface: Username is required"
  And debería permanecer en la página de login

@camposVacios @negativo
Scenario: Login solo con usuario sin contraseña
  When ingreso solo el usuario "standard_user"
  And hago clic en el botón de login
  Then el mensaje de error debería ser específico para contraseña faltante
  And debería permanecer en la página de login

@camposVacios @negativo
Scenario: Login solo con contraseña sin usuario
  When ingreso solo la contraseña "secret_sauce"
  And hago clic en el botón de login
  Then el mensaje de error debería ser específico para usuario faltante
  And debería permanecer en la página de login

@ui @positivo
Scenario: Verificar elementos de la página de login
  Then debería ver el logo de Swag Labs
  And debería ver las credenciales de prueba
  And debería poder ver la lista de usuarios disponibles

@errorHandling
Scenario: Manejo y limpieza de errores
  When ingreso las credenciales "invalid_user" y "invalid_pass"
  Then debería ver el mensaje de error "Epic sadface: Username and password do not match any user in this service"
  When limpio el error mostrado
  Then el error debería desaparecer
  And los campos de login deberían estar vacíos

@edgeCases @negativo
Scenario: Casos límite con caracteres especiales
  When ingreso caracteres especiales "!@#$%^&*()" en el usuario
  And ingreso "secret_sauce" como contraseña
  And hago clic en el botón de login
  Then debería ver el mensaje de error "Epic sadface: Username and password do not match any user in this service"

@edgeCases @negativo
Scenario: Usuario con muchos caracteres
  When ingreso un usuario muy largo con 100 caracteres
  And ingreso "secret_sauce" como contraseña
  And hago clic en el botón de login
  Then debería ver el mensaje de error "Epic sadface: Username and password do not match any user in this service"

@regresion @positivo
Scenario: Verificar persistencia de credenciales válidas
  Given que he ingresado "standard_user" en el campo usuario
  And que he ingresado "secret_sauce" en el campo contraseña
  Then el campo usuario debería contener "standard_user"
  And el campo contraseña debería contener "secret_sauce"
  When hago clic en el botón de login
  Then debería acceder al catálogo de productos