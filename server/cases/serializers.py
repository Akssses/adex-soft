from rest_framework import serializers
from .models import Case, CaseImage, Tag, Service, Stack, ProcessStage

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']
        ref_name = 'CaseTag'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name']

class StackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stack
        fields = ['id', 'name']

class ProcessStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStage
        fields = ['id', 'title', 'duration', 'description', 'order']

class CaseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseImage
        fields = ['id', 'image', 'order']

class CaseSerializer(serializers.ModelSerializer):
    images = CaseImageSerializer(many=True, read_only=True)
    stages = ProcessStageSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    services = ServiceSerializer(many=True, read_only=True)
    stacks = StackSerializer(many=True, read_only=True)

    class Meta:
        model = Case
        fields = [
            'id', 'title', 'description', 'project_url', 'status',
            'review_text', 'client_name', 'client_position', 'client_avatar',
            'images', 'stages', 'tags', 'services', 'stacks',
            'created_at', 'updated_at'
        ]

class CaseCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )
    stages = ProcessStageSerializer(many=True, required=True)
    tags = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=True
    )
    services = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=True
    )
    stacks = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=True
    )
    project_url = serializers.URLField(required=False, allow_blank=True)
    client_avatar = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Case
        fields = [
            'title', 'description', 'project_url', 'status',
            'review_text', 'client_name', 'client_position', 'client_avatar',
            'images', 'stages', 'tags', 'services', 'stacks'
        ]

    def validate(self, data):
        """
        Custom validation for the case
        """
        # Validate required fields
        required_fields = ['title', 'description', 'status']
        for field in required_fields:
            if not data.get(field):
                raise serializers.ValidationError(f"{field} is required")

        # If there's a review, validate review fields
        if data.get('review_text'):
            if not data.get('client_name'):
                raise serializers.ValidationError("client_name is required when review_text is provided")
            if not data.get('client_position'):
                raise serializers.ValidationError("client_position is required when review_text is provided")

        return data

    def validate_stages(self, value):
        """
        Validate stages data
        """
        if not value:
            raise serializers.ValidationError("At least one stage is required")
        
        for stage in value:
            if not all(key in stage for key in ['title', 'duration', 'description']):
                raise serializers.ValidationError("Each stage must have title, duration and description")
            if not all(stage[key].strip() for key in ['title', 'duration', 'description']):
                raise serializers.ValidationError("Stage fields cannot be empty")
        
        return value

    def to_internal_value(self, data):
        """
        Convert the raw input data into Python datatypes.
        Handle the special case of stages data format.
        """
        # Get a mutable copy of the QueryDict
        data = data.copy()

        # Extract stages data from the request
        stages = []
        i = 0
        while f'stages[{i}]title' in data:
            stage = {
                'title': data.pop(f'stages[{i}]title')[0],
                'duration': data.pop(f'stages[{i}]duration')[0],
                'description': data.pop(f'stages[{i}]description')[0],
                'order': int(data.pop(f'stages[{i}]order')[0])
            }
            stages.append(stage)
            i += 1

        # Add stages back to the data
        if stages:
            data['stages'] = stages

        return super().to_internal_value(data)

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        stages_data = validated_data.pop('stages', [])
        tags_data = validated_data.pop('tags', [])
        services_data = validated_data.pop('services', [])
        stacks_data = validated_data.pop('stacks', [])

        case = Case.objects.create(**validated_data)
        case.save()  # Убедимся что объект сохранен

        # Create images
        for index, image in enumerate(images_data):
            CaseImage.objects.create(case=case, image=image, order=index)

        # Create stages
        for stage_data in stages_data:
            ProcessStage.objects.create(case=case, **stage_data)

        # Add tags
        for tag_name in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            case.tags.add(tag)

        # Add services
        for service_name in services_data:
            service, _ = Service.objects.get_or_create(name=service_name)
            case.services.add(service)

        # Add stacks
        for stack_name in stacks_data:
            stack, _ = Stack.objects.get_or_create(name=stack_name)
            case.stacks.add(stack)

        return case

    def update(self, instance, validated_data):
        # First, update basic fields
        for attr, value in validated_data.items():
            if attr not in ['images', 'stages', 'tags', 'services', 'stacks']:
                setattr(instance, attr, value)
        instance.save()

        # Now handle related fields
        if 'tags' in validated_data:
            tags_data = validated_data.pop('tags')
            tags = [Tag.objects.get_or_create(name=tag_name)[0] for tag_name in tags_data]
            instance.tags.set(tags)

        if 'services' in validated_data:
            services_data = validated_data.pop('services')
            services = [Service.objects.get_or_create(name=service_name)[0] for service_name in services_data]
            instance.services.set(services)

        if 'stacks' in validated_data:
            stacks_data = validated_data.pop('stacks')
            stacks = [Stack.objects.get_or_create(name=stack_name)[0] for stack_name in stacks_data]
            instance.stacks.set(stacks)

        # Handle images
        if 'images' in validated_data:
            images_data = validated_data.pop('images')
            # Delete existing images
            CaseImage.objects.filter(case=instance).delete()
            # Create new images one by one
            for index, image in enumerate(images_data):
                CaseImage.objects.create(
                    case=instance,
                    image=image,
                    order=index
                )

        # Handle stages
        if 'stages' in validated_data:
            stages_data = validated_data.pop('stages')
            # Delete existing stages
            ProcessStage.objects.filter(case=instance).delete()
            # Create new stages
            for index, stage in enumerate(stages_data):
                ProcessStage.objects.create(
                    case=instance,
                    title=stage.get('title'),
                    duration=stage.get('duration'),
                    description=stage.get('description'),
                    order=index
                )

        return instance 