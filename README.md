<h2>
Sailing Web App with Next.js! </h2>
<div><img src="https://user-images.githubusercontent.com/72945457/218341883-77a7238a-916b-4569-815c-d64ece3bb52b.png" data-canonical-src="https://user-images.githubusercontent.com/72945457/218341883-77a7238a-916b-4569-815c-d64ece3bb52b.png" height="70" />
<img src="https://user-images.githubusercontent.com/72945457/218341884-54fc4232-9910-4958-9a67-6e5ad8757c69.png" data-canonical-src="https://user-images.githubusercontent.com/72945457/218341884-54fc4232-9910-4958-9a67-6e5ad8757c69.png" height="50" />
<img src="https://user-images.githubusercontent.com/72945457/218341828-3c991013-abda-4883-a186-810f5a9e5a5e.png" data-canonical-src="https://user-images.githubusercontent.com/72945457/218341828-3c991013-abda-4883-a186-810f5a9e5a5e.png" height="50" />
<img src="https://user-images.githubusercontent.com/72945457/218341881-68f9ad84-19e4-4407-87d9-670bb16dfc10.png" data-canonical-src="https://user-images.githubusercontent.com/72945457/218341881-68f9ad84-19e4-4407-87d9-670bb16dfc10.png" height="40" />
<img src="https://user-images.githubusercontent.com/72945457/218341983-98a9da5b-4a8b-4c3a-b954-fd029d2a49d3.png" data-canonical-src="https://user-images.githubusercontent.com/72945457/218341983-98a9da5b-4a8b-4c3a-b954-fd029d2a49d3.png" height="50" />
</div>
<br>
This is a university project web application using InfluxDB Cloud for its database Leaflet for React for visualizing data. <br>The purpose of this prototype was to show live data from devices with LoRaWAN connected to The Things Network as well as data from older sessions. There is page navigation through the bottom navbar to:  Sessions, Live, Setup. 
<br>
<h4>Data flow Architecture</h4>
From the ESP32 LoraWan Microcontroller, sensor data (such as GPS Longitude and Latitude) are sent to a The Things Network application. From there by running a Telgraf server, it takes the data from the ttn application and puts it in an InfluxDB Cloud bucket. Then using the influxdb javascript api, we can query the data we want from the database. The website is made with NextJS and we can use Leaflet for React to visualize data on a map.
<h2>More Info</h2>

<h4>Environment Variables</h4>
Getting data from InfluxDB requires sensitive data such as (influxdb host url, influxdb token and  influx organisation id). These are saved in a local file such as .env.local  (that is included in .gitignore) for local development. For online hosting , these environment variables are passed and encoded through the host's (e.g.  Vercel or Netlify) Environment Variables options. <br> <br>

If you want to connect to your InfluxDB bucket, create a  .env.local  file in the main directory and put: <br>
INFLUX_TOKEN= your_token_here <br>
INFLUX_ORG= your_org_here <br>
INFLUX_URL= your_url_here <br>
<br> After saving the environment variables locally or at your hosted website, you will have access to your influxdb buckets.

<h4>Live Data</h4>
Live data is not achieved by using webhooks or subscribing to the MQTT server but by repeatedly querying data from InfluxDB and then showing the most recent datapoint received (within the last 30 minutes). This is very inefficient but after trying to implement other methods I only succeeded this way.
<br>

<h4>Sessions Animation and Path Display</h4>
After querying the data of a session once, they are sorted alphabetically and by time and then added in a list. Leaflet's polyline is used to display the path passing all the points. For the animated object, a marker was used whose position is frequently updated after calculating it. It is calculated between two points using linear interpolation. In a one dimentional version where t is time and x the position, if we have a list of points [1, 2, 5, 6] and <br> t = 0 then x = lerp(1,2, 0) = 1 (whereas lerp is a linear interpolation function with start input,end input and a factor parameter) <br>
At t = 0.5,  x = lerp(1,2, 0.5) = 1.5 <br>
For t in (0,1) the points are [1,2], for t in (1,2) the points are [2,5], for t in (2,3) the points are [5,6]. For t > 3,  t is set to the remainder of the point list size - 1 (which is 3 for these 4 points). The factor arguement of linear interpolation is the remainder of 1. So for t = 5.5 ,  t will become <br> t = 2.5 which means x = lerp(5,6, 0.5). <br>By doing this for both longitude and latitude with small increments of t , the position of the marker is animated between all the points in the session.
<br>

<h4>Hosting</h4>
Hosting is done through Vercel using a purchased domain https://ullsail.com but also at the free custom domain vercel provides https://sailsyros.vercel.app

<h2>Screenshots</h2>
<div>
<img src="https://user-images.githubusercontent.com/72945457/216511287-cd796baf-a3a5-40ca-818c-ed4462c44dca.png" data-canonical-src="https://user-images.githubusercontent.com/72945457/216511287-cd796baf-a3a5-40ca-818c-ed4462c44dca.png" height="400" />
<!-- <img src="https://user-images.githubusercontent.com/72945457/216511674-2f4e798d-56c0-4bb8-9a4a-a32fe0ba0e55.png" data-canonical-src="https://user-images.githubusercontent.com/72945457/216511674-2f4e798d-56c0-4bb8-9a4a-a32fe0ba0e55.png"  height="400"/> -->

<img src="https://user-images.githubusercontent.com/72945457/217284180-fe4bcef5-fedd-4fb3-a3bc-fd4ff7d6dbdf.png" data-canonical-src="https://user-images.githubusercontent.com/72945457/217284180-fe4bcef5-fedd-4fb3-a3bc-fd4ff7d6dbdf.png"  height="400" />
<img src="https://user-images.githubusercontent.com/72945457/217284334-bceb5638-b782-4ef0-8bba-79b109ec7e0e.png" data-canonical-src="https://user-images.githubusercontent.com/72945457/217284334-bceb5638-b782-4ef0-8bba-79b109ec7e0e.png" height="400"/>
<img src="https://user-images.githubusercontent.com/72945457/217284365-3667252f-03bf-4ddd-8c23-5dd353e0a375.png" data-canonical-src="https://user-images.githubusercontent.com/72945457/217284334-bceb5638-b782-4ef0-8bba-79b109ec7e0e.png" height="400"/>


</div>
