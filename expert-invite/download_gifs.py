import urllib.request
import re
import os
import shutil

url = "https://latarjetadigital.app/julia-xv/"
output_dir = r"C:\Te invitoapp\expert-invite\public\icons"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

print("Fetching:", url)
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Find all .gif URLs
    gif_urls = re.findall(r'https?://[^\s"\']+\.gif', html)
    # Also find relative ones if any, but WordPress usually uses absolute wp-content URLs
    
    # Sometimes it's encoded or using wp-content directly
    gif_urls = list(set(gif_urls))
    print(f"Found {len(gif_urls)} GIF URLs:")
    
    for gurl in gif_urls:
        filename = gurl.split("/")[-1]
        filepath = os.path.join(output_dir, filename)
        print(f"Downloading {filename}...")
        try:
            with urllib.request.urlopen(gurl) as response, open(filepath, 'wb') as out_file:
                shutil.copyfileobj(response, out_file)
        except Exception as e:
            print(f"Failed to download {gurl}: {e}")
            
    print("Done!")
except Exception as e:
    print(f"Error: {e}")
