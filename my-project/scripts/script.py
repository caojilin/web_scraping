import requests
import json

class Restaurant:
    def __init__(self):
        self.api_url = "http://localhost:1337"

    def all(self):
        r = requests.get(self.api_url + "/products")
        return r.json()

    def create(self, params):
        r = requests.post(self.api_url + "/products",
        data=json.dumps({
            'title': params["title"],
            'price': params["price"],
            'image': params["image"]
        }),
        headers={
        'Content-Type': 'application/json'
        })

    def update(self, id, params):
        r = requests.put(self.api_url + "/products/" + str(id),
        data=json.dumps({
            'categories': params["categories"]
        }),
        headers={
        'Content-Type': 'application/json'
        })

restaurant = Restaurant()
data = {'title':'test',
        'price':'test',
        'image':'test'}

print(restaurant.create(data))