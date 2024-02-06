import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BarChartsData from "../Component/BarChart";

const Label = styled("label")({
  display: "block",
});

const Input = styled("input")(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  color: theme.palette.mode === "light" ? "#000" : "#fff",
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

export default function Pokemon() {
  const [url, setUrl] = useState("");
  const [ability, setAbility] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [types, setTypes] = useState([]);
  const [image, setImage] = useState("");
  const [stats, setStats] = useState("");
  const [dataList, setDataList] = useState([]);
  const apiurl = "https://pokeapi.co/api/v2/pokemon/";

  const handleKeyUp = (event) => {
    axios.get(apiurl).then((response) => {
      let all = response.data.results.filter((e) =>
        e.name.includes(event.target.value)
      );
      setDataList(all);
    });
  };

  const handleOptionSelect = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = dataList.find((curr) => curr.name === selectedValue);

    if (selectedOption) {
      setUrl(selectedOption.url);
      setUpdateList(true);
    }
  };

  React.useEffect(() => {
    if (url !== "") {
      axios.get(url).then((response) => {
        console.log(response.data);
        setHeight(response.data.height);
        setWeight(response.data.weight);
        setTypes(response.data.types);
        setImage(response.data.sprites.other.dream_world.front_default);
        setAbility(response.data.abilities);
        const labels = [];
        let data = [];
        response.data.stats.map((curr, index) => {
          labels.push(curr.stat.name);
          data.push({
            name: curr.stat.name,
            alldata: curr.base_stat,
          });
        });
        console.log(data);
        // let series = {
        //   // labels: labels,
        //   datasets: data,
        //   options: {
        //     responsive: true,
        //     plugins: {
        //       legend: {
        //         position: "top",
        //       },
        //       title: {
        //         display: true,
        //         text: "Chart.js Bar Chart",
        //       },
        //     },
        //   },
        // };
        // console.log(series);
        setStats(data);
        setUrl("");
      });
    }
  }, [url]);

  // const fetchData = async (getUrl) => {
  //   try {
  //     const res = await axios.get(getUrl);
  //     const result = res.data.effect_entries.find(
  //       (lan) => lan.language.name === "en"
  //     );
  //     if (result) {
  //       return result.effect;
  //     } else {
  //       return "In English Language is not available";
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     throw error;
  //   }
  // };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="center container my-4">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 mt-4">
          <div className="input-group rounded">
            <input
              type="text"
              list="searched"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onKeyUp={(e) => handleKeyUp(e)}
              onChange={(e) => handleOptionSelect(e)}
            />

            <span className="input-group-text border-1" id="search-addon">
              Search
              <i className="fas fa-search"></i>
            </span>
            <datalist id="searched">
              {dataList.map((curr, index) => (
                <option key={index} value={curr.name} />
              ))}
            </datalist>
          </div>
        </div>
      </div>
      {stats && ( 
        <div className="row my-2">  
        <div className="col-md-2"></div> 
        <div className="col-md-8">
          <div className="card">
            <img
              className="card-img-top"
              src={image}
              alt="Card image cap"
              height={150}
            />
            <div className="card-body">
              <table>
            
                <tbody>
                  {ability.map((curr, index) => (
                    <tr key={index}>
                      <td>{curr.ability.name}</td>
                      <td>
                        <EffectFetcher url={curr.ability.url} />
                      </td>
                    </tr>
                  ))}
                 
                    <tr>
                      <td>Height</td>
                      <td>{height}</td>
                    </tr>
                 
                  
                    <tr>
                      <td>Weight</td>
                      <td>{weight}</td>
                    </tr>
                  
                  
                    <tr>
                      <td>Type</td>
                      <td key={0}>
                        {types.map((curr, i) => (
                          <span key={i}>
                            {curr.type.name}
                            {i < types.length - 1 && ", "}
                          </span>
                        ))}
                      </td>
                    </tr>
                    </tbody>
                
               
              </table>
            </div>
            {stats &&(
            <div className="barChartBox mt-5">
              <ResponsiveContainer width="100%" height="100%" fill="#00093ee6">
                <BarChart width={450} height={400} data={stats} fill="#00093ee6" >
                  <XAxis dataKey = "name" />
                  <YAxis />
                  <Bar dataKey = "alldata" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            )}
          </div>
        </div>
        </div>
        )}
    </div>
  );
}

function EffectFetcher({ url }) {
  const [effect, setEffect] = useState(null);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  const fetchData = async (getUrl) => {
    try {
      const res = await axios.get(getUrl);
      const result = res.data.effect_entries.find(
        (lan) => lan.language.name === "en"
      );
      if (result) {
        setEffect(result.effect);
      } else {
        setEffect("In English Language is not available");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (effect === null) {
    return <div>Loading...</div>;
  }

  return <div>{effect}</div>;
}
