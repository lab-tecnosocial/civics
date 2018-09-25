# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-09-25 07:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0040_auto_20180925_0719'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ods',
            options={'ordering': ['name'], 'verbose_name': 'ODS', 'verbose_name_plural': 'ODS'},
        ),
        migrations.AddField(
            model_name='ods',
            name='order',
            field=models.PositiveSmallIntegerField(default=1, verbose_name='Orden'),
        ),
    ]
