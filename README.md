# Node.js VyatSU schedule web server

This web server provides REST API for viewing groups schedules in machine-readable representation

## Usage

#### Show schedule calls
  - URL: `/vyatsu/bells`
  - Method: `GET`
  - Success response:
    - Code: 200
    
      Content: `[["8:20", "9:50"], ... ["18:55", "20:25"]]`

#### Show list of groups (JSON)
  - URL: `/vyatsu/groups.json`
  - Method: `GET`
  - Success response:
    - Code: 200
    
      Content: `{ "Group name": "Group id", ... "Group name": "Group id" }`
  - Error response:
    - Code: 424
    
      Content: `{ error: 'vyatsu.ru error: <status code>' }`

    - Code: 503
    
      Content: `{ error: 'Service unavailable: <error message>' }`

#### Show list of groups (XML)
  - URL: `/vyatsu/groups.xml`
  - Method: `GET`
  - Success response:
    - Code: 200
    
      Content: 
      ```
      <?xml version="1.0" ?>
      <groups>
      <group name="Group name">Group id</group>
      ...
      </groups>
      ```

#### Show schedule of group
  - URL: `/vyatsu/schedule/:group_id/:season`
  - Method: `GET`
  - URL params:
    - `id=[number]`
    - `season='autumn' | 'spring'`
  - Success response:
    - Code: 200
    
      Content:
      ```
      { weeks:
        [
          [
            ["Subject","Yet another subject", ... ],
            ...
          ],
          [
            ["Some boring suject", ... ],
            ...
          ]
        ]
      }
      ```
  - Error response:
    - Code: 422
    
      Content: `{ error: "Invalid param 'season'" }` OR `{ error: 'Invalid group id' }`

    - Code: 424
    
      Content: `{ error: 'vyatsu.ru error: <status code>' }`

    - Code: 503
    
      Content: `{ error: 'Service unavailable: <error message>' }`

#### Parse html document with group schedule
  - URL: `/vyatsu/parse_schedule`
  - Method: `POST`
  - Data params:
    ```    {       html_schedule: "<HTML><HEAD>..."     }    ```  - Success response:
    - Code: 200
    
      Content:
      ```
      { weeks:
        [
          [
            ["Subject","Yet another subject", ... ],
            ...
          ],
          [
            ["Some boring subject", ... ],
            ...
          ]
        ]
      }
      ```
