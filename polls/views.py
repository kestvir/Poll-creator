from django.shortcuts import render, redirect
from .forms import QuestionForm, ChoiceFormset
from .models import Question


def home(request):
    context = {
        'questions': Question.objects.all()
    }
    return render(request, 'polls/home.html', context)


def create(request):
    form = QuestionForm()
    formset = ChoiceFormset(instance=Question())
    if request.method == 'POST':
        form = QuestionForm(request.POST)
        formset = ChoiceFormset(request.POST)
        if form.is_valid() and formset.is_valid():
            question = form.save()
            formset.instance = question
            formset.save()
            return redirect('polls-home')
        else:
            for frm in formset:
                print(frm)

    return render(request, "polls/create.html", {
        'form': form, 'formset': formset
    })


def vote(request, question_id):
    question = Question.objects.get(pk=question_id)

    if request.method == 'POST':
        selected_option = request.POST['choice']
        selected_option_obj = question.choice_set.filter(
            choice_text__contains=selected_option)[0]
        selected_option_obj.choice_count += 1

        selected_option_obj.save()
        return redirect('polls-home')

    context = {
        'question': question
    }
    return render(request, "polls/vote.html", context)


def results(request, question_id):
    choices_count_list = []
    total = 0

    question = Question.objects.get(pk=question_id)

    for choice in question.choice_set.all():
        choices_count_list.append(choice.choice_count)

    for count in choices_count_list:
        total += count

    context = {
        'question': question,
        'total': total
    }

    return render(request, "polls/results.html", context)
