Feature: Dropdown en HerokuApp

@dropdownOpcionValida
Scenario: Seleccionar una opción válida
    Given estoy en la página de dropdown
    When selecciono la opción "Option 2"
    Then la opción seleccionada debería ser "2"

@dropdownDefault
Scenario: Validar que por defecto no hay opción seleccionada
    Given estoy en la página de dropdown
    Then la opción seleccionada debería ser ""
