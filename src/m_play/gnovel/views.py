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

def get_char_image(name, point):
	point = int(point)
	if point > 0:
		return static('gnovel/res/result/'+name+'_happy.png')
	else:
		return static('gnovel/res/result/'+name+'_sad.png')

def result(request):
	context = {}
	# context = {
	# 	'phone_title' : 'Ryan found a lost wallet',
	# 	'phone_choice' : 'You chose to give it to the waiter',
	# 	'phone_resolution' : 'They found the owner- it was Cat’s!',
	# 	'phone_question' : 'What would have happened if they didn’t get it back to her?',
	# 	'phone_rel_ryan' : 'Your relationship with Ryan increased',
	# 	'phone_rel_ryan_image' : static('gnovel/res/result/ryan_happy.png'),
	# 	'phone_rel_priya' : 'Your relationship with Priya increased',
	# 	'phone_rel_priya_image' : static('gnovel/res/result/priya_happy.png'),
	# 	'phone_rel_cat' : 'Your relationship with Cat increased',
	# 	'phone_rel_cat_image' : static('gnovel/res/result/ryan_happy.png'),

	# 	'unauthorized_assistance_title': 'Ryan asked for your help',
	# 	'unauthorized_assistance_choice': 'You gave Ryan your old assignments',
	# 	'unauthorized_assistance_resolution': 'Turns out that’s against the academic code...',
	# 	'unauthorized_assistance_question' : 'Was there a way to help Ryan without violating the code?',
	# 	'unauthorized_assistance_rel_ryan' : 'Your relationship with Ryan increased',
	# 	'unauthorized_assistance_rel_ryan_image' : static('gnovel/res/result/ryan_happy.png'),
	# 	'unauthorized_assistance_rel_priya' : 'Your relationship with Priya increased',
	# 	'unauthorized_assistance_rel_priya_image' : static('gnovel/res/result/priya_happy.png'),
	# 	'unauthorized_assistance_rel_cat' : 'Your relationship with Cat increased',		
	# 	'unauthorized_assistance_rel_cat_image' : static('gnovel/res/result/cat_happy.png'),
		
	# 	'plagiarism_title' : 'Priya copied work from codehub',
	# 	'plagiarism_choice' : 'You got Priya to redo her work',
	# 	'plagiarism_resolution' : 'It was Ok; B-',
	# 	'plagiarism_question' : 'Was there a way to help Priya?',
	# 	'plagiarism_rel_ryan' : 'Your relationship with Ryan increased',
	# 	'plagiarism_rel_ryan_image' : static('gnovel/res/result/ryan_happy.png'),
	# 	'plagiarism_rel_priya' : 'Your relationship with Priya increased',
	# 	'plagiarism_rel_priya_image' : static('gnovel/res/result/priya_happy.png'),
	# 	'plagiarism_rel_cat' : 'Your relationship with Cat increased',		
	# 	'plagiarism_rel_cat_image' : static('gnovel/res/result/cat_happy.png'),

	# 	'using_test_title' : 'Ryan wanted to use last year’s blank exam.',
	# 	'using_test_choice' : 'You told Ryan not to use the test',
	# 	'using_test_resolution' : 'Ryan didn’t use it either. He’s glad he didn’t use it, and he’s patching things up with Priya. ',
	# 	'using_test_question' : 'What would have happened if you did take the test? ',
	# 	'using_test_rel_ryan' : 'Your relationship with Ryan increased',
	# 	'using_test_rel_ryan_image' : static('gnovel/res/result/ryan_happy.png'),
	# 	'using_test_rel_priya' : 'Your relationship with Priya increased',
	# 	'using_test_rel_priya_image' : static('gnovel/res/result/priya_happy.png'),
	# 	'using_test_rel_cat' : 'Your relationship with Cat increased',		
	# 	'using_test_rel_cat_image' : static('gnovel/res/result/cat_happy.png'),		
	# 	}

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
