from rembg import remove

input_path = 'test/img_1_0020.jpg'
output_path = 'test/output.jpg'

with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input = i.read()
        output = remove(input)
        o.write(output)
