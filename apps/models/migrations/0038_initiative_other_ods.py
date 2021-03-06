# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-09-24 12:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0037_auto_20180924_1219'),
    ]

    operations = [
        migrations.AddField(
            model_name='initiative',
            name='other_ods',
            field=models.CharField(blank=True, choices=[('1', '1 Fin de la pobreza'), ('2', '2 Hambre cero'), ('3', '3 Salud y bienestar'), ('4', '4 Educación de calidad'), ('5', '5 Igualdad de género'), ('6', '6 Agua limpia y saneamiento'), ('7', '7 Energía asequible y no contaminante'), ('8', '8 Trabajo decente y crecimiento económico'), ('9', '9 Industria, innovación e infraestructura'), ('10', '10 Reducción de las desigualdades'), ('11', '11 Ciudades y comunidades sostenibles'), ('12', '12 Producción y consumo responsables'), ('13', '13 Acción por el clima'), ('14', '14 Vida submarina'), ('15', '15 Vida de ecosistemas terrestres'), ('16', '16 Paz, justicia e instituciones sólidas'), ('17', '17 Alianzas para lograr los objetivos')], help_text='Indícanos otros Objetivos de Desarrollo Sostenible (ODS) con los que también trabaja tu iniciativa (máximo 3).', max_length=2, null=True, verbose_name='Otros ODS'),
        ),
    ]
