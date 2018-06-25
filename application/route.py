import os
import subprocess

try:
    GIT_COMMIT_HASH = subprocess.check_output(['git', 'rev-parse', '--short', 'HEAD']).decode('ascii').strip()
except subprocess.CalledProcessError:
    GIT_COMMIT_HASH = 'final'

from flask import render_template, session, send_from_directory, url_for

from . import app

@app.route('/')
def route_index():
    return render_template('index.html', static_version=GIT_COMMIT_HASH, debug=app.config['DEBUG'])

@app.route('/favicon')
def route_favicon():
    directory = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'static/favicon')
    return send_from_directory(directory, 'favicon.png')

@app.route('/<path:path>')
def route_html(path):
    if path == '':
        path = 'index.html'
    return render_template(path)
