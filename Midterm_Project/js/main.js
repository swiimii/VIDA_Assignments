/**
 * Load TopoJSON data of the world and the data of the world wonders
 */
let dropDown = document.getElementById('yearDropdown');
for(let i = 2021; i >= 1980; i--) {
  let item = document.createElement('a');
  item.onclick = () => { 
      ChoroplethMap.Singleton.updateVis(`${i}`,false);
    };
  item.text=`${i}`;
  dropDown.appendChild(item)
}

const datas = ['Max AQI', '90th Percentile AQI', 'Median AQI',]

let dropDown2 = document.getElementById('dataDropdown');
for(let i = 0; i < datas.length ; i++) {
  let item = document.createElement('a');
  item.onclick = () => {
    ChoroplethMap.Singleton.updateVis(false, datas[i]);
  }
  item.text = `${datas[i]}`;
  dropDown2.appendChild(item);
}

Promise.all([
  d3.json('data/counties-10m.json'),
  // d3.csv('data/fips.csv'),
  // d3.csv('data/annual_qui_by_county_all.csv')
  d3.csv('data/qui_data_and_fips.csv')
]).then(data => {
  const geoData = data[0];
  // const fipsData = data[1];
  const valueData = data[1]

  const valueDataByFips = d3.group(valueData, d=> d.cnty_fips);

  geoData.objects.counties.geometries.forEach(d => {
    if (valueDataByFips.has(d.id)) {
      d.properties.air_data = valueDataByFips.get(d.id);
      d.properties.air_data = d3.group(d.properties.air_data, d=>d.Year);
    }
  });

  const choroplethMap = new ChoroplethMap({
    parentElement: '.viz',
  }, geoData);

  // Start with Hamilton
  const myLine = new Line({
    parentElement: 'graph1',
  }, valueDataByFips, '39061', ['Max AQI', 'Median AQI', '90th Percentile AQI' ], 'legend1');

  // const myLine2 = new Line({
  //   parentElement: 'graph2',
  // }, valueDataByFips, '39061', []);

  // const myLine3 = new Line({
  //   parentElement: 'graph3',
  // }, valueDataByFips, '39061', []);

})
.catch(error => console.error(error));
