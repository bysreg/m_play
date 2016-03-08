from django.contrib import admin
from .models import Log

class LogAdmin(admin.ModelAdmin):
	list_display = ('date', 'name', 'scene', 'type','action_number', 'action_value')
	search_fields = ['name', 'scene']

admin.site.register(Log, LogAdmin)

