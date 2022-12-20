Feature: Difficulty

  Scenario: Choose difficulty
    Given d: hard
    When Picking a difficulty
    Then The picked difficulty should be: hard