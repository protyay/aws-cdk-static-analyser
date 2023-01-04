import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as path from 'path';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    // 👇 lambda function definition
    const myFunction = new lambda.Function(this, 'my-function', {
      runtime: lambda.Runtime.NODEJS_14_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/my-lambda')),
    });

    // 👇 define a metric for lambda errors
    const functionErrors : cloudwatch.Metric = myFunction.metricErrors({
      period: cdk.Duration.minutes(1),
    });
    // 👇 define a metric for lambda invocations
    const functionInvocation: cloudwatch. Metric = myFunction.metricInvocations({
      period: cdk.Duration.minutes(1),
    });
  }
}
