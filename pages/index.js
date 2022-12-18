import Head from 'next/head'
import styles from '../styles/Home.module.css';

import {InfluxDB, FluxTableMetaData} from '@influxdata/influxdb-client'

export default function Home({token, org,url}) {




  const queryApi = new InfluxDB({url, token}).getQueryApi(org)
  const fluxQuery = 'from(bucket:"SailData") |> range(start: -100d) |> filter(fn: (r) => r._measurement == "m1")'

  async function collectRows() {
    console.log('\n*** CollectRows ***')
    const data = await queryApi.collectRows(
      fluxQuery //, you can also specify a row mapper as a second argument
    )
    data.forEach((x) => console.log(JSON.stringify(x)))
    console.log('\nCollect ROWS SUCCESS')
  }
  collectRows();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          LETS TRY INFLUXDB WITH <a href="/first">first.js!</a>
        </h1>
        <h4>token:{token + "\n org:" + org} </h4>
      </main>

      <footer>
        
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}


export async function getServerSideProps(){
  const org1 = process.env.INFLUX_ORG;
  const token1 = process.env.INFLUX_TOKEN;
  const url1 = process.env.INFLUX_URL;


  return {
    props: {
      hello: 'world',
      org: org1,
      token: token1,
      url: url1
    }
  }
}