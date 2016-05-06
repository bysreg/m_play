from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^exp/$', views.exp, name='exp'),
	url(r'^exp2/$', views.exp2, name='exp2'),
	url(r'^log/$', views.log, name="log"),
	url(r'^intro/$', views.intro, name='intro'),
	url(r'^result/$', views.result, name='result'),
	url(r'^credits/$', views.resources, name='resource'),
]
