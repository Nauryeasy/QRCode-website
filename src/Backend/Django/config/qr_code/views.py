from django.http import JsonResponse, HttpResponseBadRequest
from . import check_url
from django.views.decorators.csrf import csrf_exempt
from . import get_qr_code
from . import tranlete_qr_code


@csrf_exempt
def processing_url(request):
    if request.method == 'POST':
        url_blob = request.POST.get('image')
        if len(url_blob) == 0:
            return JsonResponse({"error": 'Request is null error'})
        else:
            try:
                get_qr_code.get_png_from_blob(url_blob)
            except:
                return JsonResponse({"error": 'Invalid blob'})
            try:
                url = tranlete_qr_code.get_link_qr_code()
            except:
                return JsonResponse({"error": 'Invalid QR-code'})
            if len(url) == 0:
                return JsonResponse({"error": 'Link is null error'})
            else:
                try:
                    res = check_url.check_link(url)
                except:
                    return JsonResponse({"error": "Invalid link"})
    return JsonResponse(res)