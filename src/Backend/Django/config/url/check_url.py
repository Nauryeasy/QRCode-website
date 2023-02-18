import requests
import re
import jsbeautifier
import ssl
import socket


def check_link(link):

    stats = {
        'redirect': False,
        'https': False,
        'ssl': False,
        'suspicious': False,
        'solution': False,
        'suspicious_js': False,
        'Long level': False,
        'Unreadability': False
             }

    response = requests.get(link)
    content_type = response.headers['content-type']

    js_code = response.text
    beautified_js = jsbeautifier.beautify(js_code)

    response = requests.head(link, allow_redirects=False)
    if response.status_code in (301, 302):
        stats['redirect'] = True

    if "eval(" in js_code or "document.location.replace(" in js_code:
        stats['suspicious_js'] = True

    if 'application/octet-stream' in content_type or '.exe' in link or '.dll' in link:
        stats["solution"] = True

    if link.startswith('https://'):
        stats['https'] = True

    response.raise_for_status()
    url = response.url
    domain = url.split('//')[1].split('/')[0]
    context = ssl.create_default_context()
    with socket.create_connection((domain, 443)) as sock:
        with context.wrap_socket(sock, server_hostname=domain) as ssl_sock:
            cert = ssl_sock.getpeercert()
            if cert:
                stats['ssl'] = True
            else:
                stats['ssl'] = False

#    if re.search(r'(paypal|ebay|amazon|google|facebook|twitter|telegram)', link):
#        stats['suspicious'] = True

    if any(site in link for site in ['google', 'facebook', 'amazon', 'twitter', 'linkedin']):
        stats['suspicious'] = True

    if len(link.split('.')) > 4:
        stats['Long level'] = True

    # Check if the domain name contains an unreadable sequence
    if any(char in link for char in ['xn--', 'xn----', 'xn------']):
        stats['Unreadability'] = True

    return stats