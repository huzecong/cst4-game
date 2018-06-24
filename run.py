import os


def gather_scripts():
    script_dir = 'scripts'
    exclude_dirs = ['image']
    folders = [d for d in os.listdir(script_dir) if os.path.isdir(os.path.join(script_dir, d))]
    folders = sorted(set(folders).difference(exclude_dirs))

    scripts = []
    for d in folders:
        files = sorted([f for f in os.listdir(os.path.join(script_dir, d)) if f.endswith('.js') and not f.startswith('_')])
        for f in files:
            with open(os.path.join(script_dir, d, f), 'r', encoding='utf-8') as rf:
                scripts.append(rf.read())

    js = '[' + ','.join(scripts) + ']'
    with open(os.path.join(script_dir, 'merged_script.js'), 'w', encoding='utf-8') as f:
        f.write(js)

    print('Merged script file written')


if __name__ == '__main__':
    gather_scripts()

    from application import app, initialize

    CONFIG_FILE = 'config.py'
    PRODUCTION_CONFIG_FILE = 'config.production.py'

    # change Jinja2 template syntax, avoiding conflict with AngularJS
    jinja_options = app.jinja_options.copy()
    jinja_options.update({
        'variable_start_string': '{-',
        'variable_end_string': '-}'
    })
    app.jinja_options = jinja_options

    app.config.from_pyfile(CONFIG_FILE)
    if os.path.exists(PRODUCTION_CONFIG_FILE):
        app.config.from_pyfile(PRODUCTION_CONFIG_FILE)

    initialize()

    if app.config['DEBUG']:
        # monitor HTML files, restart when change detected
        extra_dirs = [
                'application/templates',
                'application/modules',
                'application/static'
                'scripts/'
            ]
        extra_files = extra_dirs[:]
        for extra_dir in extra_dirs:
            for dirname, dirs, files in os.walk(extra_dir):
                for filename in files:
                    filename = os.path.join(dirname, filename)
                    if os.path.isfile(filename):
                        extra_files.append(filename)
        app.run(host='127.0.0.1', port=app.config.get('PORT', 8000), debug=True, extra_files=extra_files)
    else:
        app.run(host='0.0.0.0', port=app.config.get('PORT', 8000), debug=False)
