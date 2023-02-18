from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import render
import json
from . import check_url
from django.views.decorators.csrf import csrf_exempt
from .models import reviews, notable_links


@csrf_exempt
def processing_url(request):
    link_list = notable_links.objects.all()
    flag = True

    if request.method == 'POST':
        url = request.POST.get('url')
        if len(url) == 0:
            return HttpResponseBadRequest('Link is null error')
        else:
            for link in link_list:
                if link.url == url:
                    flag = False
                    need_reviews = {}
                    reviews_list = reviews.objects.all()
                    for i in range(len(reviews_list)):
                        if reviews_list[i].id_url == link.id:
                            review = {
                                "email": reviews_list[i].email_author,
                                "comment": reviews_list[i].review
                            }
                            need_reviews.update({f"{i}": review})
                    break
            if flag:
                new_url = notable_links(
                    url=url
                )
                new_url.save()
                need_reviews = []
            try:
                res = check_url.check_link(url)
            except:
                return HttpResponseBadRequest("Invalid link")
    return JsonResponse({"statistic": res, "reviews": need_reviews})