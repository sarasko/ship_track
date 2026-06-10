#!/bin/bash
# scripts/localstack-init.sh
# Runs automatically inside LocalStack on startup (mounted to /etc/localstack/init/ready.d/)
# Creates all SNS topics, SQS queues, and wire-ups needed for ShipTrack.

set -e

ENDPOINT="http://localhost:4566"
REGION="eu-west-1"
ACCOUNT_ID="000000000000"  # LocalStack default account ID

echo "==> [LocalStack Init] Creating SNS topic..."
aws --endpoint-url=$ENDPOINT sns create-topic \
    --name shiptrack-events \
    --region $REGION

SNS_ARN="arn:aws:sns:$REGION:$ACCOUNT_ID:shiptrack-events"
echo "    SNS ARN: $SNS_ARN"

echo "==> [LocalStack Init] Creating SQS queues..."

aws --endpoint-url=$ENDPOINT sqs create-queue \
    --queue-name order-events \
    --region $REGION

aws --endpoint-url=$ENDPOINT sqs create-queue \
    --queue-name inventory-events \
    --region $REGION

aws --endpoint-url=$ENDPOINT sqs create-queue \
    --queue-name notification-events \
    --region $REGION

# Dead-letter queues
aws --endpoint-url=$ENDPOINT sqs create-queue \
    --queue-name order-events-dlq \
    --region $REGION

aws --endpoint-url=$ENDPOINT sqs create-queue \
    --queue-name inventory-events-dlq \
    --region $REGION

aws --endpoint-url=$ENDPOINT sqs create-queue \
    --queue-name notification-events-dlq \
    --region $REGION

echo "==> [LocalStack Init] Fetching queue ARNs..."

ORDER_ARN=$(aws --endpoint-url=$ENDPOINT sqs get-queue-attributes \
    --queue-url http://localhost:4566/000000000000/order-events \
    --attribute-names QueueArn \
    --region $REGION \
    --query 'Attributes.QueueArn' --output text)

INVENTORY_ARN=$(aws --endpoint-url=$ENDPOINT sqs get-queue-attributes \
    --queue-url http://localhost:4566/000000000000/inventory-events \
    --attribute-names QueueArn \
    --region $REGION \
    --query 'Attributes.QueueArn' --output text)

NOTIFICATION_ARN=$(aws --endpoint-url=$ENDPOINT sqs get-queue-attributes \
    --queue-url http://localhost:4566/000000000000/notification-events \
    --attribute-names QueueArn \
    --region $REGION \
    --query 'Attributes.QueueArn' --output text)

echo "    order-events ARN:        $ORDER_ARN"
echo "    inventory-events ARN:    $INVENTORY_ARN"
echo "    notification-events ARN: $NOTIFICATION_ARN"

echo "==> [LocalStack Init] Subscribing queues to SNS topic..."

aws --endpoint-url=$ENDPOINT sns subscribe \
    --topic-arn $SNS_ARN \
    --protocol sqs \
    --notification-endpoint $ORDER_ARN \
    --region $REGION

aws --endpoint-url=$ENDPOINT sns subscribe \
    --topic-arn $SNS_ARN \
    --protocol sqs \
    --notification-endpoint $INVENTORY_ARN \
    --region $REGION

aws --endpoint-url=$ENDPOINT sns subscribe \
    --topic-arn $SNS_ARN \
    --protocol sqs \
    --notification-endpoint $NOTIFICATION_ARN \
    --region $REGION

echo "==> [LocalStack Init] Creating S3 bucket for product images..."
aws --endpoint-url=$ENDPOINT s3 mb s3://shiptrack-product-images --region $REGION

echo ""
echo "==> [LocalStack Init] Done. Summary:"
echo "    SNS topic:              shiptrack-events"
echo "    SQS queues:             order-events, inventory-events, notification-events"
echo "    DLQs:                   order-events-dlq, inventory-events-dlq, notification-events-dlq"
echo "    S3 bucket:              shiptrack-product-images"
echo "    LocalStack endpoint:    http://localstack:4566  (from inside Docker network)"
echo "    LocalStack endpoint:    http://localhost:4566   (from host machine)"
