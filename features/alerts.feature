Feature: JavaScript Alerts en HerokuApp

@alertSimple
Scenario: Aceptar un alert simple
    Given estoy en la página de alerts
    When disparo un alert y lo acepto
    Then debería ver el mensaje "You successfully clicked an alert" en el resultado

@alertConfirm
Scenario: Cancelar un confirm
    Given estoy en la página de alerts
    When disparo un confirm y lo cancelo
    Then debería ver el mensaje "You clicked: Cancel" en el resultado

@alertPrompt
Scenario: Aceptar un prompt con texto
    Given estoy en la página de alerts
    When disparo un prompt y escribo "Hola Cucumber"
    Then debería ver el mensaje "You entered: Hola Cucumber" en el resultado
