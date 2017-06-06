# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-06-06 11:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0017_auto_20170530_1152'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='address',
            field=models.CharField(help_text='Dirección de la iniciativa. No es necesario que vuelvas a introducir la ciudad de la iniciativa.', max_length=200, null=True, verbose_name='Dirección'),
        ),
        migrations.AlterField(
            model_name='event',
            name='video',
            field=models.CharField(blank=True, help_text='Inserta la url de un video de Youtube o Vimeo', max_length=200, null=True, verbose_name='Video'),
        ),
    ]