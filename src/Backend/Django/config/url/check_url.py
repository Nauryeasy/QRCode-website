import requests
import re


# Define a function to check a link for suspicious parameters
def check_link(link):
    # Initialize a dictionary to store statistics
    stats = {'redirect': False, 'https': False, 'ssl': False, 'suspicious': False}

    # Send a HEAD request to the link to check for redirects
    response = requests.head(link, allow_redirects=False)
    if response.status_code in (301, 302):
        stats['redirect'] = True

    # Check for HTTPS support
    if link.startswith('https://'):
        stats['https'] = True

    # Check for SSL certificate
    try:
        response = requests.get(link)
        cert = response.connection.sock.getpeercert()
        if cert:
            stats['ssl'] = True
    except:
        pass

    # Check for suspicious URL parameters
    if re.search(r'(paypal|ebay|amazon|google|facebook|twitter|telegram)', link):
        stats['suspicious'] = True

    return stats


# Define a function to display link statistics
def display_stats(link):
    # Check the link for suspicious parameters
    stats = check_link(link)

    # Display statistics
    print("Statistics for", link)
    print("Redirect:", stats['redirect'])
    print("HTTPS:", stats['https'])
    print("SSL:", stats['ssl'])
    print("Suspicious:", stats['suspicious'])