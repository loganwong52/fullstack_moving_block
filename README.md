# fullstack_moving_block
Use the left/right arrow keys to move red block. Use spacebar to shoot enemy. 1.5 second bullet cooldown. Uses images from the Noun API. Requires a database.

How to run the fullstack_moving_block code:

1. Make sure postgres psql is running: sudo /etc/init.d/postgresql start
2. sudo -i -u postgres
3. psql
4. CHECK your database exists by listing all databases: \l
5. This database is named moving_block_scores_db


Okay, so this project is run on a DJANGO server. It's not a React frontend application.
If you try to do npm run dev, the project will NOT work correctly!

1. cd into the summ22CPcoop/fullstack_moving_block folder

2. ls -a to see that the .venv folder is there.

3. source .venv/bin/activate to switch into your virtual enviornment

4. cd block_proj
5. python3 manage.py makemigrations block_app
6. python3 manage.py migrate
7. pythone manage.py runserver

8. click the link: http://127.0.0.1:8000/
