from django.db import models

class User(models.Model):
    email = models.EmailField(max_length=254, unique=True, primary_key=True)
    password = models.CharField(max_length=300)
    user_created = models.DateTimeField(auto_now_add=True)
    user_updated = models.DateTimeField(auto_now=True)    
    name = models.CharField(max_length=80, default='')
    age = models.IntegerField(default=0)
    sex = models.CharField(max_length=10, null=True, blank=True)
    height_inches = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.email

class PoseAnalysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to User model
    shoulder_width_in = models.FloatField()
    chest_circumference_in = models.FloatField()
    waist_width_in = models.FloatField()
    waist_circumference_in = models.FloatField()
    hip_width_in = models.FloatField()
    hip_circumference_in = models.FloatField()
    biceps_left_length_in = models.FloatField()
    biceps_right_length_in = models.FloatField()
    biceps_left_circumference_in = models.FloatField()
    biceps_right_circumference_in = models.FloatField()
    forearm_left_length_in = models.FloatField()
    forearm_right_length_in = models.FloatField()
    forearm_left_circumference_in = models.FloatField()
    forearm_right_circumference_in = models.FloatField()
    thigh_left_length_in = models.FloatField()
    thigh_right_length_in = models.FloatField()
    thigh_left_circumference_in = models.FloatField()
    thigh_right_circumference_in = models.FloatField()
    calf_left_length_in = models.FloatField()
    calf_right_length_in = models.FloatField()
    calf_left_circumference_in = models.FloatField()
    calf_right_circumference_in = models.FloatField()

    def __str__(self):
        return f"Pose analysis for {self.user.email}"
