#return the suffix of a file, dont ensure that the file is really the type defined in the suffix
def get_file_type(file_name):
    for i in range(len(file_name)):
        if file_name[-(i+1)]=='.':
            return file_name[(-i):]
    
    return None