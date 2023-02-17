from django.shortcuts import render
import json
from . import check_url
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def processing_url(request):
    global data_dict
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data_dict = json.loads(json_data)

    try:
        link = data_dict["url"]
        stats = check_url.check_link(link)
    except:
        return "Empty Dictionary error"

    if len(stats) == 0:
        return "Link verification error"

    return stats
