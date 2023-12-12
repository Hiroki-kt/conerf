import docker

client = docker.from_env()
containers = client.containers.list()
nerf_containers = {}
for container in containers:
    print(container.id, container.name)
    if "train" in container.name:
        print(f"train: {container.id}")
        nerf_containers["train"] = container.id
    elif "colmap" in container.name:
        print(f"colmap: {container.id}")
        nerf_containers["colmap"] = container.id
    elif "viewer" in container.name:
        print(f"viewer: {container.id}")
        nerf_containers["viewer"] = container.id
