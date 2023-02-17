from django.shortcuts import render
import json
from src.Backend.Scripts.check_url import check_link


def processing_url(request):
    link = ""
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data_dict = json.loads(json_data)

    link = data_dict["url"]

    try:
        stats = check_link(link)
    except:
        return "Error"

    if len(stats) == 0:
        return "Error"

    return stats