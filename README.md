# fapi ⚙️

A simple *rest* api without any real-world purpose (*yet*).

**possible requests from the root route (/)**

`GET /`

```bash
curl -i -H 'Accept: application/json' http://localhost:7777/
```

**response:**

```bash
HTTP/1.1 200 OK

{ message: [fapi] - running }
```

---



**possible requests from the skins route (/skins)**

`GET /skins`

```bash
curl -i -H 'Accept: application/json' http://localhost:7777/skins/
```

**response:**

```bash
HTTP/1.1 200 OK

{
 "skins":
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



`POST /skins`

```bash
curl -i -H 'Accept: application/json' -d 'id=1224&name=Wicked%20Slick&weapon=P2000&team=CT' http://localhost:7777/skins
```

**response:**

```bash
HTTP/1.1 201 Created

{
  "id": 1224,
  "name": "Wicked Slick",
  "weapon": "P2000",
  "team": "CT"
}
```



`GET /skins/:id`

```bash
curl -i -H 'Accept: application/json' http://localhost:7777/skins/1229
```

**response:**

```bash
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

```bash
HTTP/1.1 200 OK

{
   "id": 1229,
   "name": "Neon Rider",
   "weapon": "MAC-10",
   "team": "T"
}
```



`DELETE /skins/:id`

```bash
curl -i -H 'Accept: application/json' -X DELETE http://localhost:7777/skins/1229
```

**response:**

```bash
HTTP/1.1 204 No Content

it will show an object with the updated skin list after the deletion
```

---

**possible requests from the users route (/users)**



---

**fapi** is available under the [MIT License](https://github.com/otvv/fapi/blob/master/LICENSE)
