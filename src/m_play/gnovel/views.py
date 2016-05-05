from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Log
from django.http import HttpResponse
from django.template import RequestContext, Template
from django.utils.safestring import mark_safe
from django.contrib.staticfiles.templatetags.staticfiles import static

import json

def index(request):
	context = {'name': "Lindsey"}
	name=None

	if request.method == 'POST':
		name = request.POST['username']

	if name is not None:
		context['name'] = name

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

def intro(request):
	context = {}
	return render(request, 'gnovel/intro.html', context)

def resources(request):
	context = {}
	return render(request, 'gnovel/resources.html',context)

def get_char_image(name, point):
	point = int(point)
	if point > 0:
		return static('gnovel/res/result/'+name+'_happy.png')
	elif point == 0:
		return static('gnovel/res/result/' +name+'_silhouette.png');
	else:
		return static('gnovel/res/result/'+name+'_sad.png')

def result(request):
	context = {}

 	# i know, this is not a good code, should have used for loop to iterate all possible situations
	if request.method == 'POST':
		situation = "phone_";
		context['phone_title'] = request.POST['phone_title']
		context['phone_choice'] = request.POST['phone_choice']
		context['phone_resolution'] = request.POST['phone_resolution']
		context['phone_question'] = request.POST['phone_question']
		context['phone_rel_ryan_val'] = request.POST['phone_rel_ryan_val']
		context['phone_rel_ryan'] = request.POST['phone_rel_ryan']
		context['phone_rel_priya_val'] = request.POST['phone_rel_priya_val']
		context['phone_rel_priya'] = request.POST['phone_rel_priya']
		context['phone_rel_cat_val'] = request.POST['phone_rel_cat_val']
		context['phone_rel_cat'] = request.POST['phone_rel_cat']

		context[situation + 'rel_ryan_image'] = get_char_image('ryan', request.POST[situation + 'rel_ryan_val'])
		context[situation + 'rel_priya_image'] = get_char_image('priya', request.POST[situation + 'rel_priya_val'])
		context[situation + 'rel_cat_image'] = get_char_image('cat', request.POST[situation + 'rel_cat_val'])

		situation = "unauthorized_assistance_"
		context['unauthorized_assistance_title'] = request.POST['unauthorized_assistance_title']
		context['unauthorized_assistance_choice'] = request.POST['unauthorized_assistance_choice']
		context['unauthorized_assistance_resolution'] = request.POST['unauthorized_assistance_resolution']
		context['unauthorized_assistance_question'] = request.POST['unauthorized_assistance_question']
		context['unauthorized_assistance_rel_ryan_val'] = request.POST['unauthorized_assistance_rel_ryan_val']
		context['unauthorized_assistance_rel_ryan'] = request.POST['unauthorized_assistance_rel_ryan']
		context['unauthorized_assistance_rel_priya_val'] = request.POST['unauthorized_assistance_rel_priya_val']
		context['unauthorized_assistance_rel_priya'] = request.POST['unauthorized_assistance_rel_priya']
		context['unauthorized_assistance_rel_cat_val'] = request.POST['unauthorized_assistance_rel_cat_val']
		context['unauthorized_assistance_rel_cat'] = request.POST['unauthorized_assistance_rel_cat']

		context[situation + 'rel_ryan_image'] = get_char_image('ryan', request.POST[situation + 'rel_ryan_val'])
		context[situation + 'rel_priya_image'] = get_char_image('priya', request.POST[situation + 'rel_priya_val'])
		context[situation + 'rel_cat_image'] = get_char_image('cat', request.POST[situation + 'rel_cat_val'])


		situation = "plagiarism_";
		context['plagiarism_title'] = request.POST['plagiarism_title']
		context['plagiarism_choice'] = request.POST['plagiarism_choice']
		context['plagiarism_resolution'] = request.POST['plagiarism_resolution']
		context['plagiarism_question'] = request.POST['plagiarism_question']
		context['plagiarism_rel_ryan_val'] = request.POST['plagiarism_rel_ryan_val']
		context['plagiarism_rel_ryan'] = request.POST['plagiarism_rel_ryan']
		context['plagiarism_rel_priya_val'] = request.POST['plagiarism_rel_priya_val']
		context['plagiarism_rel_priya'] = request.POST['plagiarism_rel_priya']
		context['plagiarism_rel_cat_val'] = request.POST['plagiarism_rel_cat_val']
		context['plagiarism_rel_cat'] = request.POST['plagiarism_rel_cat']

		context[situation + 'rel_ryan_image'] = get_char_image('ryan', request.POST[situation + 'rel_ryan_val'])
		context[situation + 'rel_priya_image'] = get_char_image('priya', request.POST[situation + 'rel_priya_val'])
		context[situation + 'rel_cat_image'] = get_char_image('cat', request.POST[situation + 'rel_cat_val'])


		situation = "using_test_";
		context['using_test_title'] = request.POST['using_test_title']
		context['using_test_choice'] = request.POST['using_test_choice']
		context['using_test_resolution'] = request.POST['using_test_resolution']
		context['using_test_question'] = request.POST['using_test_question']
		context['using_test_rel_ryan_val'] = request.POST['using_test_rel_ryan_val']
		context['using_test_rel_ryan'] = request.POST['using_test_rel_ryan']
		context['using_test_rel_priya_val'] = request.POST['using_test_rel_priya_val']
		context['using_test_rel_priya'] = request.POST['using_test_rel_priya']
		context['using_test_rel_cat_val'] = request.POST['using_test_rel_cat_val']
		context['using_test_rel_cat'] = request.POST['using_test_rel_cat']

		context[situation + 'rel_ryan_image'] = get_char_image('ryan', request.POST[situation + 'rel_ryan_val'])
		context[situation + 'rel_priya_image'] = get_char_image('priya', request.POST[situation + 'rel_priya_val'])
		context[situation + 'rel_cat_image'] = get_char_image('cat', request.POST[situation + 'rel_cat_val'])
	else:
		context = {}

	return render(request, 'gnovel/result.html', context)
