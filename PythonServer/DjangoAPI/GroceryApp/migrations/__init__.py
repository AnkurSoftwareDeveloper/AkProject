from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='customer',
            fields=[
                ('customerid', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('c_firstName', models.CharField(default='', max_length=70)),
                ('c_lastName', models.CharField(default='', max_length=70)),
                ('c_email', models.CharField(default='', max_length=70)),
                ('c_password', models.CharField(default='', max_length=70)),
                ('c_pincode', models.CharField(default='', max_length=70)),
                ('c_Phone', models.CharField(default='', max_length=70)),
                ('c_address1', models.CharField(default='', max_length=70)),
                ('c_address2', models.CharField(default='', max_length=70)),
                ('c_city', models.CharField(default='', max_length=70)),
                ('c_state', models.CharField(default='', max_length=70)),
            ],
        ),
    ]