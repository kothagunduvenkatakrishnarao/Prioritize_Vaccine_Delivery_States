# Generated by Django 3.2.4 on 2021-06-04 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Server', '0002_ranking'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ranking',
            name='stateCode',
            field=models.CharField(max_length=3),
        ),
    ]