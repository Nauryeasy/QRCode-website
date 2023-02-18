from django.db import models


class notable_links(models.Model):
    url = models.URLField('Ссылка')