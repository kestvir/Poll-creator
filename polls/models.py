from django.db import models


class Question(models.Model):
    question_text = models.TextField()
    datetime = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-datetime',)

    def __str__(self):
        return f'{self.question_text}'


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=100)
    choice_count = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.choice_text} for {self.question}'
