from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import render
import json
from . import check_url
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def processing_url(request):
    if request.method == 'POST':
        url = request.POST.get('url')
        if len(url) == 0:
            return HttpResponseBadRequest('Link is null error')
        else:
            try:
                res = check_url.check_link(url)
            except:
                return HttpResponseBadRequest("Invalid link")
    return JsonResponse(res)