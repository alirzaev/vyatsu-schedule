# Node.js VyatSU schedule web server

This web server provides REST API for viewing groups schedules in machine-readable representation

## Usage

#### Show schedule calls
  - URL: `/vyatsu/bells`
  - Method: `GET`
  - Success response:
    - Code: 200
    - Content: `[["8:20", "9:50"], ... ["18:55", "20:25"]]`

#### Show list of groups (JSON)
  - URL: `/vyatsu/groups.json`
  - Method: `GET`
  - Success response:
    - Code: 200 <br />
      Content: `{ "ПОДб-1101-53-00": "5948", ... "ТиТб-1801-01-00": "6026" }`

#### Show list of groups (XML)
  - URL: `/vyatsu/groups.xml`
  - Method: `GET`
  - Success response:
    - Code: 200 <br />
      Content: 
      ```
      <?xml version="1.0" ?>
      <groups>
      <group name="ХМа-1501-02-00">5972</group>
      ...
      </groups>
      ```

#### Show schedule of group
  - URL: `/vyatsu/schedule?group_name=:name&season=:season`
  - Method: `GET`
  - URL params:
    - `name=[string]`
    - `season='autumn' | 'spring'`
  - Success response:
    - Code: 200 <br />
      Content:
      ```
      { "weeks":
        [
          [
            ["","Математика...", ... ],
            ...
          ],
          [
            ["Технологии программирования...", ... ],
            ...
          ]
        ]
      }
      ```
  - Error response:
    - Code: 422 <br />
      Content: `{ 'error': 'Invalid param 'season'' }` OR `{ 'error': 'No such group' }`

    OR

    - Code: 424 <br />
      Content: `{ 'error': 'vyatsu.ru unavailable' }`

#### Parse html document with group schedule
  - URL: `/vyatsu/parse_schedule`
  - Method: `POST`
  - Data params:
    ```    {       "html_schedule": "<HTML><HEAD>..."     }    ```  - Success response:
    - Code: 200 <br />
      Content:
      ```
      { "weeks":
        [
          [
            ["","Математика...", ... ],
            ...
          ],
          [
            ["Технологии программирования...", ... ],
            ...
          ]
        ]
      }
      ```
