

def make(title, time, author, content, target_url):
    with open(target_url, 'w') as f:
        f.write("<!DOCTYPE html>")
        f.write("<html>")
        f.write("<head><title>Merry Christmas</title></head>")
        f.write("<body>")
        f.write("<p>title: %s, time: %s, author: %s, content: %s</p>" % (title, time, author, content))
        f.write("</body>")
        f.write("</html>")

