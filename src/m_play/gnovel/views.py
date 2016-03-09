from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Log
from django.http import HttpResponse
from django.template import RequestContext, Template

import json

def index(request):
	context = {}
	return render(request, 'gnovel/index.html', context)

def exp(request):
	context = {}
	return render(request, 'gnovel/exp.html', context)

def exp2(request):
	context = {}
	return render(request, 'gnovel/exp2.html', context)

def log(request):
	name=None
	scene=None
	type=None
	action_number=None
	action_value=None

	if request.method == 'POST' :
		name = request.POST['name']
		scene = request.POST['scene']
		type = request.POST['type']
		action_number = request.POST['action_number']
		action_value = request.POST['action_value']

	if name is not None:
		Log.objects.create(name=name, scene=scene, type=type, action_number=action_number, action_value=action_value)		
		return HttpResponse(json.dumps({'status_code': 1}))

	return HttpResponse(json.dumps({'status_code': -1}))