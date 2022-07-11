from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        if not username:
            raise ValueError("Users must have an username")
        user = self.model(username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        sudo = self.create_user(username, password)
        sudo.is_admin = True
        sudo.save(using=self._db)
        return sudo


class User(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True, auto_created=True)
    username = models.CharField('Username', max_length=30, unique=True)
    password = models.CharField('Password', max_length=256)
    email = models.EmailField('Email', max_length=100)

    def save(self, **kwargs):
        some_salt = 'mMuJ0DrIK6vgtdIYepkIxP'
        self.password = make_password(self.password, some_salt)
        super().save(**kwargs)

    objects = UserManager()
    USERNAME_FIELD = 'username'
