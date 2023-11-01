from subprocess import Popen

commands = ["python -m http.server","python -m flask --app index.py run"]

procs = [ Popen(i) for i in commands ]
for p in procs:
    p.wait()