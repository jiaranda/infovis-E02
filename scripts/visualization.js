const getData = async () => {
  const data = await d3.json(
    "https://raw.githubusercontent.com/jiaranda/infovis-E02/main/data/iris.json"
  );
  return data;
};

const getFlowerSpecies = async (data) => {
  return [...new Set(data.map((i) => i.species))];
};

const getFlowerMean = async (data, species) => {
  const filteredData = data.filter((flower) => flower.species == species);
  const n = filteredData.length;
  const sepalLength = filteredData.reduce((s, i) => s + i.sepalLength, 0) / n;
  const sepalWidth = filteredData.reduce((s, i) => s + i.sepalWidth, 0) / n;
  const petalLength = filteredData.reduce((s, i) => s + i.petalLength, 0) / n;
  const petalWidth = filteredData.reduce((s, i) => s + i.petalWidth, 0) / n;
  return { sepalLength, sepalWidth, petalLength, petalWidth };
};

const getAllFlowerMeans = async (data) => {
  const allSpecies = await getFlowerSpecies(data);
  const allMeans = [];
  allSpecies.forEach(async (species, index, arr) => {
    const meanData = await getFlowerMean(data, species);
    allMeans.push({
      id: index,
      species,
      meanData,
    });
  });
  return allMeans;
};

const main = async () => {
  const data = await getData();
  const allFlowerMeans = await getAllFlowerMeans(data);
  console.log(allFlowerMeans);
};

main();
