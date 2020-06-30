from django.contrib import admin
from .models import Question, Choice

class ChoiceInline(admin.TabularInline):
    model = Choice


class PollAdmin(admin.ModelAdmin):
    inlines = [
        ChoiceInline,
    ]


admin.site.register(Question, PollAdmin)
