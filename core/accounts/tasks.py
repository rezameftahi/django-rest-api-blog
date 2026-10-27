from celery import shared_task
from mail_templated import EmailMessage


@shared_task
def send_email_task(template_name, context, from_email, recipient_list):
    email_obj = EmailMessage(
        template_name,
        context,
        from_email,
        to=recipient_list,
    )
    return email_obj.send()
