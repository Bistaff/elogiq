from django.apps import AppConfig
from django.db.models.signals import post_migrate

class CompaniesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'companies'

    def ready(self):
        # populate the database after all migrations have been executed, without having to specify
        # the dependencies manually, with signal "post_migrate"
        from .signals import populate_initial_data
        post_migrate.connect(populate_initial_data, sender=self)
