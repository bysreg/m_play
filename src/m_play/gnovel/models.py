from django.db import models

class Log(models.Model):

	name = models.CharField(max_length=200)
	date = models.DateTimeField("date", auto_now=True)
	scene = models.CharField(max_length=200)
	type = models.CharField(max_length=200)
	action_number = models.PositiveIntegerField("action number")
	action_value = models.CharField(max_length=200)