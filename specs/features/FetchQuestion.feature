Feature: Category

  Scenario: Choose category
    Given c: artsandliterature
    When Picking a category
    Then The picked category should be: artsandliterature