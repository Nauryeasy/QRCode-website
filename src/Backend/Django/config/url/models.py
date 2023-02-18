from django.db import models


class notable_links(models.Model):
    url = models.URLField('Ссылка')


class reviews(models.Model):
    id_url = models.IntegerField("Id ссылки")
    email_author = models.EmailField("Email автора")
    review = models.TextField("Отзыв")
