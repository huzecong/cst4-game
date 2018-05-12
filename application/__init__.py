from flask import Flask

app = Flask('cs-game', template_folder='application/templates', static_folder='application/static', static_url_path='/static')

def initialize():
    from . import route
