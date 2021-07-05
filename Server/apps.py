from django.apps import AppConfig


class ServerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Server'
    print(' starting scheduler')
    def ready(self):
        from .Server_Model import data_updater
        data_updater.start()