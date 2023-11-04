import subprocess

input_file = "/mnt/test/IMG_2601.MOV"
frame_step = 1
output_file = "/mnt/data/chair/img_1_%04d.jpg"

command = f"ffmpeg -i {input_file} -vf framestep={frame_step} -q:v 1 {output_file}"
subprocess.call(command, shell=True)
