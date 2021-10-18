from flask import Response
from flask_restful import Resource, abort, request
from bson import ObjectId
from dogsearch.db import get_db


class ImageList(Resource):
    def post(self):
        if request.mimetype.startswith("image/"):
            _, ext = request.mimetype.split("/")
            data = request.get_data()
            db = get_db()
            id = db.images.insert_one(
                {"data": data, "ext": ext, "status": "PENDING"}
            ).inserted_id
            return [{"id": str(id)}], 201
        elif request.mimetype == "application/zip":
            pass
        else:
            abort(400, description="Only images or ZIP archives are accepted")


class Image(Resource):
    def get(self, id_str):
        try:
            id = ObjectId(id_str)
        except Exception:
            abort(404, description="Image not found")
        db = get_db()
        image = db.images.find_one({"_id": id})
        if image is None:
            abort(404, description="Image not found")
        mimetype = "image/{}".format(image["ext"])
        r = Response(response=image["data"], status=200, mimetype=mimetype)
        return r
