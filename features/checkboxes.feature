Feature: Checkboxes en HerokuApp

@checkboxOn
Scenario: Activar el primer checkbox
    Given estoy en la página de checkboxes
    When activo el checkbox 1
    Then el checkbox 1 debería estar seleccionado
