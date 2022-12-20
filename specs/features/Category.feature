Feature: Category

  Scenario: Choose category
    Given c: artsAndLiterature
    When Picking a category
    Then The picked category should be: artsAndLiterature