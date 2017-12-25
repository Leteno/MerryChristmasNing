

def make(title, time, author, content, target_url):
    with open(target_url, 'w') as f:
        f.write("<!DOCTYPE html>")
        f.write("<html>")
        f.write("<head>")
        f.write('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">')
        f.write("<title>Merry Christmas</title>")
        f.write('<link rel="stylesheet" type="text/css" href="merry_christmas.css" />')
        f.write("</head>")
        f.write("<body>")
        f.write("<div class='title'>%s</div>" % title)
        f.write("<div class='author'>%s(%s)</div>" % (author, time))
        f.write("<div class='content'>%s</div>" % content)
        f.write("</body>")
        f.write("</html>")

