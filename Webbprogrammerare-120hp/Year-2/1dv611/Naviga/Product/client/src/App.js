import { notification } from 'antd'
const React = require('react')
const Uppy = require('@uppy/core')
// const Url = require('@uppy/url')
const AwsS3 = require('@uppy/aws-s3')
const GoogleDrive = require('@uppy/google-drive')
const { Dashboard } = require('@uppy/react')

/* eslint-disable */
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
/* eslint-enable */

/**
 * Main application class for initilizing the frontend.
 * Uses uppy module for uploading images from computer,
 * url and google drive. Uppy module runs when browser is opened,
 * closes when closed.
 * @returns {Rendered uppy components}
 */
class App extends React.Component {
  constructor (props) {
    super(props)

    this.uppy = new Uppy({
      id: 'uppy1',
      autoProceed: false,
      debug: true,
      restrictions: {
        allowedFileTypes: ['image/png', 'image/gif', 'image/jpg', 'image/jpeg', '.heic', '.heif'],
        maxFileSize: 14000000
      }
    })
      .use(AwsS3, {
        getUploadParameters (file) {
          const body = {
            filename: file.data.name
          }

          /* ***
          Fetches a preSigned url from a lambda function that is used to POST the image to an S3 bucket.
          *** */
          return fetch('https://hrcws9cl96.execute-api.eu-north-1.amazonaws.com/development/getuploaduri', {
            method: 'POST',
            body: JSON.stringify(body)
          })
              .then(res => res.json())
              .then(res => {
                return {
                  method: 'POST',
                  url: res.url,
                  fields: res.fields,
                  headers: {}
                }
              })
        }
      })
      .use(GoogleDrive, {
        target: Uppy.Dashboard,
        serverUrl: 'https://aqueous-hamlet-44959.herokuapp.com'
      })
      /* TODO FIX THIS SH*T */
      // .use(Url, {
      //   target: Uppy.Dashboard,
      //   serverUrl: 'https://aqueous-hamlet-44959.herokuapp.com',
      // })

    this.uppy.on('upload-success', file => {
      console.log('File uploaded')
      console.log(file.name)
      this.fetchWithRetry('https://hrcws9cl96.execute-api.eu-north-1.amazonaws.com/development/status', file.name)
          .then(result => notification.success({ message: result }))
          .catch(err => {
            console.log(err)
            notification.fail({ message: 'Unkown error' })
          })
    })
  }

  /**
   * fetchWithRetry
   * Retry fetches until other answer than `No message` || 20 times
   *
   * @param url
   * @param filename
   * @returns {Promise}
   */
  fetchWithRetry (url, filename) {
    return new Promise((resolve, reject) => {
      const fetchRetry = (url, n) => {
        return fetch(url, {
          method: 'POST',
          body: JSON.stringify({ filename: filename })
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            console.log(n)
            if (n === 1) {
              resolve('No data')
            } else if (data.msg !== 'No message') {
              resolve(data.msg)
            } else {
              setTimeout(() => {
                fetchRetry(url, n - 1)
              }, 1000)
            }
          })
          .catch(e => reject(e))
      }
      return fetchRetry(url, 20)
    })
  }

  componentWillUnmount () {
    this.uppy.close()
  }

  render () {
    return (
      <div style={{ padding: '20px'}}>
        <Dashboard
          uppy={this.uppy}
          plugins={['GoogleDrive', 'Url']}
          metaFields={[
              { id: 'name', name: 'Name', placeholder: 'File name' }
          ]}
          note={'Only image files, max file size 14 mb'}
          showProgressDetails
          />
      </div>
    )
  }
}

export default App
