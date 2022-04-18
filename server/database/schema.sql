
{ "bsonType": "uuid" } {
   " _id": {"bsonType": "objectID"},
    "username": {"bsonType": "string"},
    "password": {"bsonType": "string"},
    "email": {"bsonType": "string"},
    "pantryList": {
        "ingredient": {
            "price_per_unit": {"bsonType": "number"},
            "price_per_gram_ml": {"bsonType": "number"},
            "supplier": {"bsonType": "string"},
            "unit_size": {"bsonType": "string"},
            "date_added": {"bsonType": "string"}
        }
    },
    "recipes": {
        "recipe": {
            "name": {"bsonType": "string"},
            "description": {"bsonType": "string"},
            "yield": {"bsonType": "string"},
            "ingredients": {
                "ingredient": {"bsonType": "string"},
            },
            "directions": {
                "step": {"bsonType": "string"}
            }
        }
    }
}