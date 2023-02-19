from email_validate import validate, validate_or_fail


def validate_email(email):
    return validate(email_address=email)
