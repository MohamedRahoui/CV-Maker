import datetime

from django.db import models


def year_choices():
    return [(y, y) for y in range(1950, datetime.date.today().year + 1)]


def month_choices():
    return [(m, m) for m in range(1, 13)]


class BaseModel(models.Model):
    class Meta:
        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
