s3audit
==================

Checks the settings for all S3 buckets in an AWS account for public access

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

<!-- toc -->
* [Install](#install)
* [Usage](#usage)
<!-- tocstop -->

For an introduction, read
[Securing S3 buckets with s3audit](https://medium.com/the-scale-factory/securing-s3-buckets-with-s3audit-a8cb989cb861)

# Install
<!-- install -->
Download and install the [latest release from GitHub](https://github.com/scalefactory/s3audit/releases)

Or install the NPM package:

```sh-session
$ npm install -g s3audit
```
<!-- installstop -->

# Usage
<!-- usage -->

### Node
AWS credentials will be taken from environment variables.
It is recommended to run this in combination with [AWS Vault](https://github.com/99designs/aws-vault)

### IAM Role

You should use a role which is allowed these actions for all buckets in your account:

```
s3:ListAllMyBuckets,
s3:GetBucketAcl,
s3:GetBucketLogging,
s3:GetBucketPolicy,
s3:GetBucketPublicAccessBlock,
s3:GetBucketVersioning,
s3:GetBucketWebsite,
s3:GetEncryptionConfiguration
```

```sh-session
$ aws-vault exec <profile> -- s3audit

  ❯ Checking 1 bucket
    ❯ s3audit-demo
      ❯ Bucket public access configuration
        ✖ BlockPublicAcls is set to false
        ✖ IgnorePublicAcls is set to false
        ✖ BlockPublicPolicy is set to false
        ✖ RestrictPublicBuckets is set to false
      ✖ Server side encryption is not enabled
      ✖ Object versioning is not enabled
      ✖ MFA Delete is not enabled
      ✔ Static website hosting is disabled
      ✔ Bucket policy doesn't allow a wildcard entity
      ✔ Bucket ACL doesn't allow access to "Everyone" or "Any authenticated AWS user"
      ✖ Logging is not enabled
```

<!-- usagestop -->
