FROM python:3.12.7-slim
WORKDIR .
COPY . .
RUN pip install -r requirements.txt
CMD ['uvicorn', 'api:app', '--port', '3800']