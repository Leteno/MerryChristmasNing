
import asyncio

## please save this to config file
# currentIndex=1
# poemtryLine=1

def getPoemtry():
    with open('build/poem.dat') as f:
        poemtryLine=1
        while(True):
            data=f.readline().split(',')
            title=data[1]
            time=data[2]
            author=data[3]
            content=data[4]
            print('getPoemtry: title %s, time %s, author %s, content %s' % (title, time, author, content))
            poemtryLine= poemtryLine + 1
            yield (title, content, 'https://www.bilibili.com')

def getPoemtryJson():
    machine = getPoemtry()
    currentIndex = 1
    while(True):
        if (currentIndex > 5):
            machine = getPoemtry() # reset, ugly
            currentIndex = 1
        title, content, url = machine.send(None)
        json = '{"index": %d, "content": {"title": "%s", "body": "%s", "taget_url": "%s"}}' % (currentIndex, title, content, url)
        currentIndex = currentIndex + 1
        yield json

def test(machine):
    title, content, url = machine.send(None)
    print('test: title %s, content %s, url %s' % (title, content, url))
    
# machine = getPoemtry()
# test(machine)
# test(machine)
