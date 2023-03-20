# fAPI ⚙️

A simple *rest* api without any real-world purpose (*yet*).

**possible requests from the root route (/)**

`GET /`

```bash
curl -i -H 'Accept: application/json' http://localhost:7777/
```

**response:**

```json
HTTP/1.1 200 OK

{ 
 "message": "[fapi] - running" 
}
```

---
---
---

**possible requests from the skins route (/skins)**

`POST /skins`

```bash
curl -i -H 'Accept: application/json' -d 'id=1224&name=Wicked%20Slick&weapon=P2000&team=CT' http://localhost:7777/skins
```

**response:**

```json
HTTP/1.1 201 Created

{
 "createdId": 1224
}
```


`GET /skins`

```bash
curl -i -H 'Accept: application/json' http://localhost:7777/skins/
```

**response:**

```json
HTTP/1.1 200 OK

{
  [
    {
      "id": 1228,
      "name": "Temukau",
      "weapon": "M4A4",
      "team": "CT"
    },
    {
      "id": 1221,
      "name": "Head Shot",
      "weapon": "AK-47",
      "team": "T"
    },
    {
      "id": 1222,
      "name": "Duality",
      "weapon": "AWP",
      "team": "BOTH"
    },
    {
      "id": 1229,
      "name": "Sakkaku",
      "weapon": "MAC-10",
      "team": "T"
    },
  ]
}
```


`GET /skins/:id`

```bash
curl -i -H 'Accept: application/json' http://localhost:7777/skins/1229
```

**response:**

```json
HTTP/1.1 200 OK

{
   "id": 1229,
   "name": "Sakkaku",
   "weapon": "MAC-10",
   "team": "T"
}
```


`PUT /skins/:id`


```bash
curl -i -H 'Accept: application/json' -X PUT -d 'name=Neon%20Rider&weapon=MAC-10&team=T' http://localhost:7777/skins/1229
```

**response:**

```json
HTTP/1.1 200 OK

{
   "updatedId": 1229
}
```


`DELETE /skins/:id`

```bash
curl -i -H 'Accept: application/json' -X DELETE http://localhost:7777/skins/1229
```

**response:**

```json
HTTP/1.1 204 No Content
```

---
---
---

**possible requests from the users route (/users)**

`POST /users`

```bash
curl -i -H 'Accept: application/json' -d 'id=5&name=User%205&role=dev&team=xs' http://localhost:7777/users
```

**response:**

```json
HTTP/1.1 201 Created

{
  "createdId": 5
}
```


`GET /users`

```bash
curl -i -H 'Accept: application/json' http://localhost:7777/users/
```

**response:**

```json
HTTP/1.1 200 OK

{
  [
    {
      "id": 1,
      "name": "User 1",
      "role": "lead",
      "team": "f"
    },
    {
      "id": 2,
      "name": "User 2",
      "role": "lead",
      "team": "f"
    },
    {
      "id": 3,
      "name": "User 3",
      "role": "dev",
      "team": "xs"
    },
    {
      "id": 4,
      "name": "Sakkaku",
      "role": "dev",
      "team": "xs"
    }
  ]
}
```


`GET /users/:id`

```bash
curl -i -H 'Accept: application/json' http://localhost:7777/users/4
```

**response:**

```json
HTTP/1.1 200 OK

{
   "id": 4,
   "name": "Sakkaku",
   "role": "dev",
   "team": "xs"
}
```


`PUT /users/:id`


```bash
curl -i -H 'Accept: application/json' -X PUT -d 'name=User%205&role=lead&team=f' http://localhost:7777/users/5
```

**response:**

```json
HTTP/1.1 200 OK

{
   "updatedId": 5
}
```


`DELETE /users/:id`

```bash
curl -i -H 'Accept: application/json' -X DELETE http://localhost:7777/users/5
```

**response:**

```json
HTTP/1.1 204 No Content
```


---

**fapi** is available under the [MIT License](https://github.com/otvv/fapi/blob/master/LICENSE)
