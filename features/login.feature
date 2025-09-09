Feature: Login en HerokuApp
    
@loginValido
Scenario: Login exitoso con credenciales válidas
    Given estoy en la página de login
    When ingreso "tomsmith" y "SuperSecretPassword!"
    Then debería ver el mensaje "You logged into a secure area!"

@loginInvalido  
Scenario: Login fallido con credenciales inválidas
    Given estoy en la página de login
    When ingreso "usuario_invalido" y "clave_invalida"
    Then debería ver el mensaje "Your username is invalid!"

    