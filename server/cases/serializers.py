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
    stages = ProcessStageSerializer(many=True, required=False)
    tags = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )
    services = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )
    stacks = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Case
        fields = [
            'title', 'description', 'project_url', 'status',
            'review_text', 'client_name', 'client_position', 'client_avatar',
            'images', 'stages', 'tags', 'services', 'stacks'
        ]

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
        for index, stage_data in enumerate(stages_data):
            ProcessStage.objects.create(case=case, order=index, **stage_data)

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
        images_data = validated_data.pop('images', None)
        stages_data = validated_data.pop('stages', None)
        tags_data = validated_data.pop('tags', None)
        services_data = validated_data.pop('services', None)
        stacks_data = validated_data.pop('stacks', None)

        # Update basic fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if images_data is not None:
            # Remove old images
            instance.images.all().delete()
            # Create new images
            for index, image in enumerate(images_data):
                CaseImage.objects.create(case=instance, image=image, order=index)

        if stages_data is not None:
            # Remove old stages
            instance.stages.all().delete()
            # Create new stages
            for index, stage_data in enumerate(stages_data):
                ProcessStage.objects.create(case=instance, order=index, **stage_data)

        if tags_data is not None:
            instance.tags.clear()
            for tag_name in tags_data:
                tag, _ = Tag.objects.get_or_create(name=tag_name)
                instance.tags.add(tag)

        if services_data is not None:
            instance.services.clear()
            for service_name in services_data:
                service, _ = Service.objects.get_or_create(name=service_name)
                instance.services.add(service)

        if stacks_data is not None:
            instance.stacks.clear()
            for stack_name in stacks_data:
                stack, _ = Stack.objects.get_or_create(name=stack_name)
                instance.stacks.add(stack)

        return instance 