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
		context['name'] = name;
		
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

def result(request):
	context = {
		'phone_title' : 'Ryan found a lost wallet',
		'phone_choice' : 'You chose to give it to the waiter',
		'phone_resolution' : 'They found the owner- it was Cat’s!',
		'phone_question' : 'What would have happened if they didn’t get it back to her?',
		'phone_rel_ryan' : 'Your relationship with Ryan increased',
		'phone_rel_ryan_image' : static('gnovel/res/result/ryan_happy.png'),
		'phone_rel_priya' : 'Your relationship with Priya increased',
		'phone_rel_priya_image' : static('gnovel/res/result/priya_happy.png'),
		'phone_rel_cat' : 'Your relationship with Cat increased',
		'phone_rel_cat_image' : static('gnovel/res/result/ryan_happy.png'),

		'unauthorized_assistance_title': 'Ryan asked for your help',
		'unauthorized_assistance_choice': 'You gave Ryan your old assignments',
		'unauthorized_assistance_resolution': 'Turns out that’s against the academic code...',
		'unauthorized_assistance_question' : 'Was there a way to help Ryan without violating the code?',
		'unauthorized_assistance_rel_ryan' : 'Your relationship with Ryan increased',
		'unauthorized_assistance_rel_ryan_image' : static('gnovel/res/result/ryan_happy.png'),
		'unauthorized_assistance_rel_priya' : 'Your relationship with Priya increased',
		'unauthorized_assistance_rel_priya_image' : static('gnovel/res/result/priya_happy.png'),
		'unauthorized_assistance_rel_cat' : 'Your relationship with Cat increased',		
		'unauthorized_assistance_rel_cat_image' : static('gnovel/res/result/cat_happy.png'),
		
		'plagiarism_title' : 'Priya copied work from codehub',
		'plagiarism_choice' : 'You got Priya to redo her work',
		'plagiarism_resolution' : 'It was Ok; B-',
		'plagiarism_question' : 'Was there a way to help Priya?',
		'plagiarism_rel_ryan' : 'Your relationship with Ryan increased',
		'plagiarism_rel_ryan_image' : static('gnovel/res/result/ryan_happy.png'),
		'plagiarism_rel_priya' : 'Your relationship with Priya increased',
		'plagiarism_rel_priya_image' : static('gnovel/res/result/priya_happy.png'),
		'plagiarism_rel_cat' : 'Your relationship with Cat increased',		
		'plagiarism_rel_cat_image' : static('gnovel/res/result/cat_happy.png'),

		'using_test_title' : 'Ryan wanted to use last year’s blank exam.',
		'using_test_choice' : 'You told Ryan not to use the test',
		'using_test_resolution' : 'Ryan didn’t use it either. He’s glad he didn’t use it, and he’s patching things up with Priya. ',
		'using_test_question' : 'What would have happened if you did take the test? ',
		'using_test_rel_ryan' : 'Your relationship with Ryan increased',
		'using_test_rel_ryan_image' : static('gnovel/res/result/ryan_happy.png'),
		'using_test_rel_priya' : 'Your relationship with Priya increased',
		'using_test_rel_priya_image' : static('gnovel/res/result/priya_happy.png'),
		'using_test_rel_cat' : 'Your relationship with Cat increased',		
		'using_test_rel_cat_image' : static('gnovel/res/result/cat_happy.png'),		
	}
	return render(request, 'gnovel/result.html', context)
