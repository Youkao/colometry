import base64
from PIL import Image
from io import BytesIO

img = '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'


def b64_decode(encoded_string):
    image = Image.open(BytesIO(base64.b64decode(encoded_string)))
    return image


def b64_encode(array_of_image):
    image = Image.fromarray(array_of_image.astype('uint8'), 'RGB')
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    b64_string = base64.b64encode(buffered.getvalue())
    return b64_string

def set_origin_array(image):


    if image.mode == "RGB":
        channels = 3
    elif image.mode == "L":
        channels = 1
    elif image.mode == "RGBA":
        image = Picture.rgba2rgb(image)
        channels = 3
       # elif image.mode == "P":
        #     image.convert("RGB")
        #
        #     channels = 3
    else:
        print("Unknown mode: %s" % image.mode)
        return

    height, width = image.size
    pixel_values = list(image.getdata())
    pixel_values = np.array(pixel_values).reshape((width, height, channels))
    return pixel_values


code_with_padding = f"{img}{'=' * (len(img) % 4)}"
image = b64_decode(code_with_padding)    
print(image)
print(set_origin_array(image))
array = set_origin_array(image)
print(array)
#import matplotlib.pyplot as plt
#
#fig = plt.figure(figsize=(10, 5))
#
#ax2 = fig.add_subplot()
#
#ax2.imshow()
#plt.show()
