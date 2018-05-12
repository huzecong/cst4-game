if __name__ == '__main__':
    import os

    from application import app, initialize

    CONFIG_FILE = 'config.py'

    # change Jinja2 template syntax, avoiding conflict with AngularJS
    jinja_options = app.jinja_options.copy()
    jinja_options.update({
        'variable_start_string': '{-',
        'variable_end_string': '-}'
    })
    app.jinja_options = jinja_options

    app.config.from_pyfile(CONFIG_FILE)

    initialize()

    if app.config['DEBUG']:
        # monitor HTML files, restart when change detected
        extra_dirs = [
                'application/templates',
                'application/modules',
                'application/static'
                ]
        extra_files = extra_dirs[:]
        for extra_dir in extra_dirs:
            for dirname, dirs, files in os.walk(extra_dir):
                for filename in files:
                    filename = os.path.join(dirname, filename)
                    if os.path.isfile(filename):
                        extra_files.append(filename)
        app.run(host='0.0.0.0', port=app.config.get('PORT', 8000), debug=True, extra_files=extra_files)
    else:
        app.run(host='0.0.0.0', port=app.config.get('PORT', 8000), debug=False)
