# Generated by Django 3.2.4 on 2021-06-05 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Server', '0003_alter_ranking_statecode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='population',
            name='population',
            field=models.IntegerField(),
        ),
    ]
