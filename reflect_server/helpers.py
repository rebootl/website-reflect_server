import re
import urllib.request
from bs4 import BeautifulSoup

def create_ref(s):
    '''create a ref from a string
allows alphanumerics and dashes,
convert everything else to dashes,
lowercase'''
    alnum_dashed = re.sub(r'[^a-zA-Z0-9-]', '-', s)
    return alnum_dashed.lower()

def get_active_topic_tags(sel_data):
    topics = []
    subtags=[]
    for topic in sel_data:
        if topic["active"]: topics.append(topic)
        for subtag in topic["subtags"]:
            if subtag["active"]: subtags.append(subtag)
    return topics, subtags

def get_url_info(url):
    # return objs.
    # r = { 'success': false,
    #       'err_msg': 'code/msg' }
    # r = { 'success': true,
    #       'cont_type': 'text/html',
    #       'title': 'blabla website' }
    req = urllib.request.Request(url, headers = {'User-Agent' : "Magic Browser"})
    try:
        response = urllib.request.urlopen(req)
    except urllib.error.HTTPError as e:
        print(e.code)
        return { 'success': False, 'err_msg': e.code }
    except urllib.error.URLError as e:
        print(e.reason)
        return { 'success': False, 'err_msg': str(e.reason) }
    #except:
    #    print("error :(")
    #    return { 'success': False, 'err_msg': "unknown error..." }
    else:
        # get link type
        headers = dict((k, v) for k, v in response.getheaders())
        # (debug print)
        #print(headers)
        if 'text/html' in headers['Content-Type']:
            # get the page title
            soup = BeautifulSoup(response.read(), 'html.parser')
            link_title = soup.title.string
            print(link_title)
            return { 'success': True,
                'cont_type': 'text/html',
                'title': link_title }
        elif headers['Content-Type'].startswith('image'):
            return { 'success': True,
                'cont_type': headers['Content-Type'],
                'title': "" }
        else:
            return { 'success': True,
                'cont_type': headers['Content-Type'],
                'title': "" }
