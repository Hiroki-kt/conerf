import subprocess

job_id = 4

print("colmap")
# command = [
#     "docker",
#     "run",
#     "--gpus",
#     "all",
#     "-u",
#     "$(id -u)",
#     "-v",
#     "/home/$(whoami)/wd/conerf:/workspace/",
#     "-v",
#     "/home/$(whoami)/.cache/:/home/user/.cache/",
#     "--rm",
#     "-it",
#     "--shm-size=12gb",
#     "nerfstudio-89",
#     "ns-process-data",
#     "images",
#     "--data",
#     f"/workspace/data/{job_id}",
#     "--output-dir",
#     f"/workspace/outputs/{job_id}",
# ]
command = f"docker run --gpus all -u 1000 -v /home/hiro/wd/conerf:/workspace/ -v /home/hiro/.cache/:/home/user/.cache/ --rm -it --shm-size=12gb nerfstudio-89 ns-process-data images --data /workspace/data/{job_id} --output-dir /workspace/outputs/{job_id}-2"
subprocess.call(command, shell=True)
