from django.shortcuts import render
import json



def processing_url(request):
    link = ""
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data_dict = json.loads(json_data)
        link = data_dict["url"]

    if link != "":
        pass
