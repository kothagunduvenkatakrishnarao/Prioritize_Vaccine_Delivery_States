from rest_framework import serializers

from .models import Ranking

class RankingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ranking
        fields = ('state', 'stateCode','rank')
