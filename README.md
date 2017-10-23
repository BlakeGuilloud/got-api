## Game of Thrones GraphQL wrapper

Serverless, GraphQL wrapper around a GOT API.

```
query {
  character(id: 12) {
    name,
    gender,
    aliases {
      alias
    },
    titles {
      title
    },
    father {
      name
    }
  }
}
```
=>
```
{
  "data": {
    "character": {
      "name": "Balon Greyjoy",
      "gender": "Male",
      "aliases": [
        {
          "alias": "Balon the Brave"
        },
        {
          "alias": "Balon the Blessed"
        },
        {
          "alias": "Balon the Twice Crowned"
        },
        {
          "alias": "Balon the Widowmaker"
        },
        {
          "alias": "The Kraken King"
        }
      ],
      "father": {
        "name": "Quellon Greyjoy"
      }
    }
  }
}
```