from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('url', '0001_initial'),
    ]
    operations = [
        migrations.CreateModel(
            name='reviews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_url', models.IntegerField(verbose_name='Id ссылки')),
                ('email_author', models.EmailField(max_length=254, verbose_name='Email автора')),
                ('review', models.TextField(verbose_name='Отзыв')),
            ],
        ),
    ]
