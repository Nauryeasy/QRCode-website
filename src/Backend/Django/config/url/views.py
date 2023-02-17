from django.http import JsonResponse
from django.shortcuts import render
import json
from . import check_url
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def processing_url(request):
    global res
    if request.method == 'POST':
        url = request.POST.get('url')
        print(url)
        if url is not None:
            try:
                res = check_url.check_link(url)
            except:
                return f'Invalid link'
        else:
            return f'Link verification error'

    return JsonResponse(res)
