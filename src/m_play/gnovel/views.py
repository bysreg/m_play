from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def index(request):
	context = {
		'text': 'sing ngarso sung tulodo'
	}
	return render(request, 'gnovel/index.html', context)

def exp(request):
	context = {}
	return render(request, 'gnovel/exp.html', context)