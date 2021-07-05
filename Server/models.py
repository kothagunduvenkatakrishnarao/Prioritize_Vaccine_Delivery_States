from django.db import models

# Create your models here.


class Ranking(models.Model):
    state=models.CharField(max_length=60)
    stateCode=models.CharField(max_length=3)
    rank=models.IntegerField()

    def __str__(self):
        return self.state
