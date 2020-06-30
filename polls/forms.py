from django import forms
from .models import Question, Choice


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['question_text']


class ChoiceForm(forms.ModelForm):
    class Meta:
        model = Choice
        fields = ['choice_text']


ChoiceFormset = forms.inlineformset_factory(
    parent_model=Question, model=Choice, form=ChoiceForm, fields=('choice_text',), min_num=2, max_num=1000, extra=0, validate_max=True, can_delete=False)
