# -*- coding: utf-8  -*-
import cgi, cgitb
storage = cgi.FieldStorage()
option = storage.getvalue('option')
img = storage.getvalue('img')
print('Status: 200 OK')
print('Content-Type: text/plain')
print('')
if img is not None:
    print(img)