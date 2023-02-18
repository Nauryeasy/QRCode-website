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
                    flag, need_reviews, reviews_list = False, {}, reviews.objects.filter(id_url=link.id)
                    need_reviews = {str(i): {"email": review.email_author, "comment": review.review} for i, review in
                                    enumerate(reviews_list)}
                break
            if flag:
                new_url, need_reviews = notable_links(
                    url=url
                ), []
                new_url.save()
            try:
                res = check_url.check_link(url)
            except:
                return HttpResponseBadRequest("Invalid link")
    return JsonResponse({"statistic": res, "reviews": need_reviews})


@csrf_exempt
def add_review(request):
    review_data = request.POST
    links_list = notable_links.objects.all()
    for link in links_list:
        if review_data.get("url") == link.url:
            new_review = reviews(
                id_url=link.id,
                email_author=review_data.get("email"),
                review=review_data.get("review")
            )
            new_review.save()
            reviews_list = reviews.objects.filter(id_url=link.id)
            need_reviews = {str(i): {"email": review.email_author, "comment": review.review} for i, review in enumerate(reviews_list)}

    return JsonResponse(need_reviews)