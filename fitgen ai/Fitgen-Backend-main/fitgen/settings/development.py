from .base import *

DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
if DEBUG:
    ALLOWED_HOSTS.append("localhost")
    ALLOWED_HOSTS.append("127.0.0.1")

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
CORS_ALLOW_ALL_ORIGINS = True


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "fitgen", #fitgendb for sir's system 
        "USER": "postgres",
        "PASSWORD": "spriyam", #Remember to chage this password if running on different system for sir's system admin@123
        "HOST": "localhost",
        "PORT": "5432",
    }
}

# Additional local development settings
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
