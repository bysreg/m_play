from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def index(request):
	context = {}
	return render(request, 'gnovel/index.html', context)

def exp(request):
	context = {}
	return render(request, 'gnovel/exp.html', context)

def exp2(request):
	context = {}
	return render(request, 'gnovel/exp2.html', context)