from django.shortcuts import render
import json
from src.Backend.Scripts.check_url import check_link


def processing_url(request):
    global data_dict
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data_dict = json.loads(json_data)

    try:
        link = data_dict["url"]
        stats = check_link(link)
    except:
        return "Empty Dictionary error"

    if len(stats) == 0:
        return "Link verification error"

    return stats
