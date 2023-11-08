FROM python:3.11.6
ENV PYTHONUNBUFFERED 1
WORKDIR /app/backend
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN pip freeze > requirements.txt
COPY . ./
# EXPOSE 8080
CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8080"]
