FROM public.ecr.aws/lambda/nodejs:18

# Copy our app files
COPY . ${LAMBDA_TASK_ROOT}

# Runs the app in serverless mode
CMD ["lambda.handler"]