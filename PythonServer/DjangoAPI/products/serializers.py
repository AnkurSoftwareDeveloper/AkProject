from rest_framework import serializers
from rest_framework.fields import ImageField
from .models import *
# from drf_extra_fields.fields import Base64ImageField

class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__' 

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'

class StockAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockAlert
        fields = '__all__' 

class ProductSerializer(serializers.ModelSerializer):
    # category = CategorySerializer()
    # subcategory = SubCategorySerializer()
    # stockalert = StockAlertSerializer()
    # category = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    # subcategory = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    # stockalert = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    image = Base64ImageField(max_length=None, use_url=True, required=False)
    # image = serializers.ImageField(required=False)
    product_name = serializers.CharField(max_length=50,required=False)
    quantity = serializers.CharField(max_length=25,required=False)
    description = serializers.CharField(
        max_length=1000,required=False,
        style={'base_template': 'textarea.html'},
    )

    class Meta:
        model = Product
        fields = '__all__'

class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'    
        