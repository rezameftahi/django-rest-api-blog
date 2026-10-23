{% extends "mail_templated/base.tpl" %}

{% block subject %}
account activation
{% endblock %}

{% block html %}
Your token is: http://localhost:8000/accounts/api/v1/activation/confirm/{{ token }}
{% endblock %}