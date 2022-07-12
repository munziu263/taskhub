FROM python:3

WORKDIR /api

ARG TASKHUB_API_ENV

ENV YOUR_ENV=${TASKHUB_API_ENV} \
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.1.13

RUN pip install "poetry==$POETRY_VERSION"

COPY poetry.lock pyproject.toml /api/

RUN poetry config virtualenvs.create false \
  && poetry install $(test "$YOUR_ENV" == production && echo "--no-dev") --no-interaction --no-ansi

COPY . /api

WORKDIR /api/api/app

RUN poetry install

EXPOSE 5000

CMD [ "gunicorn", "-w", "5", "-b", "127.0.0.1:5000", "wsgi:app" ]