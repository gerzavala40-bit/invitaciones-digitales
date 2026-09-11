import subprocess
import os

input_file = "screen-recording-app-2026-07-22T00-09-58-trimmed.mp4"
output_file = "post_instagram_encuadrado.mp4"

# Set ffmpeg path
os.environ["PATH"] = os.environ.get("PATH", "") + ";" + os.path.expandvars("%LOCALAPPDATA%\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.2-full_build\\bin") + ";" + os.path.expandvars("%LOCALAPPDATA%\\Microsoft\\WinGet\\Links")

filter_complex = (
    "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=20:20[bg]; " 
    "[0:v]scale=860:1760:force_original_aspect_ratio=increase,crop=860:1760[fg]; " 
    "[fg]pad=900:1800:(ow-iw)/2:(oh-ih)/2:black[phone]; " 
    "[bg][phone]overlay=(W-w)/2:(H-h)/2[outv]"
)

cmd = [
    "ffmpeg", "-y", "-i", input_file,
    "-filter_complex", filter_complex,
    "-map", "[outv]", "-map", "0:a?",
    "-c:v", "libx264", "-crf", "23", "-preset", "fast",
    "-c:a", "aac", "-b:a", "128k",
    output_file
]

print("Running FFmpeg command...")
result = subprocess.run(cmd, capture_output=True, text=True)
if result.returncode != 0:
    print("Error:", result.stderr)
else:
    print("Finished processing video successfully!")
