#TODO: REMOVE THIS EXAMPLE
Feature: Search my linkedIn profile

  @business
  @only
  Scenario: Visiting search page and look for my linkedIn profile
    When I visit a search page and search for "in/nunofilipebento"
    And I see the following result
      | Name       | Position            | Where |
      | Nuno Bento | Software Engineer I | Livi  |

  Scenario: Ignore this one