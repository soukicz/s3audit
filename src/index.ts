import {Command, flags} from '@oclif/command'
import {AWSError, S3} from 'aws-sdk'

import {S3Audit} from './@types'
import Bucket from './bucket'

import {default as ConsoleFormatter} from './formatters/console'
import {default as CsvFormmater} from './formatters/csv'

class S3Audit extends Command {
  static description = 'Audits S3 bucket settings'

  static args = []

  static examples = [
    '$ s3audit',
    '$ s3audit --bucket=s3-bucket=name',
    '$ s3audit --format=csv',
  ]

  static flags = {
    bucket: flags.string({
      description: 'The name of a bucket to target'
    }),

    format: flags.string({
      description: 'The output format to use',
      default: 'console',
      options: ['console', 'csv']
    }),

    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static usage = 's3audit --bucket=s3-bucket-name --output=csv'

  async run() {
    const {flags} = this.parse(S3Audit)
    const buckets: Bucket[] = []
    const format: string = flags.format

    if (flags.bucket) {
      return this.auditBuckets(format, [new Bucket(flags.bucket)])
    }

    new S3().listBuckets((error: AWSError, data?: S3.Types.ListBucketsOutput) => {
      if (!data || data.Buckets === undefined) {
        return this.exit()
      }

      data.Buckets.forEach(bucket => {
        if (bucket.Name !== undefined) {
          buckets.push(new Bucket(bucket.Name))
        }
      })

      this.auditBuckets(format, buckets)
    })
  }

  private auditBuckets(format: string, buckets: Array<Bucket>) {
    let formatter: S3Audit.Types.Formatter

    switch (format) {
    case 'csv':
      formatter = new CsvFormmater((output: string) => {
        this.log(output)
      })

      break
    default:
      formatter = new ConsoleFormatter()
    }

    formatter.run(buckets)
  }
}

export = S3Audit
