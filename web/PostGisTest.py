from web.models import Mask
import json
with open('../Maps/8/geojson_t1.json') as json_file:
    m=Mask(code='test',poly=json.load(json_file)[0])
    m.save()
