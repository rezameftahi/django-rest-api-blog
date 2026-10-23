{% extends "mail_templated/base.tpl" %}

{% block subject %}
account activation
{% endblock %}

{% block html %}
Your token is: {{ token }}
{% endblock %}