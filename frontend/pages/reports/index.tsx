import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import NavBar from "../../components/NavBar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {Line, Chart, Bar, Bubble, Pie, Doughnut, Scatter} from 'react-chartjs-2'
import {getSalesByDateReport} from "../api/Reports";
import useAuth from "../../hooks/useAuth";
import ActionButton from "../../components/ActionButton";
import Sale from "../../models/Sale";
import InputElement from "../../components/InputElement";
import SaleDescription from "../../models/SaleDescription";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function ReportsPage(): ReactElement {
  return (
    <div>
      <div className={"m-5 justify-between tablet:flex-col"}>
        <Header/>
        <div className={"flex"}>
          <ReportsPane/>
        </div>
      </div>
      <NavBar/>

    </div>
  )
}

function ReportsPane(): ReactElement {

  return (
    <>
      <ReportsContent/>
    </>
  )
}

function ReportButtons(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    setIsLoading(false);
  }
  return (
    <div className="">
      <h2>Reports</h2>
      <div>
        {/*<ActionButton onClick={handleOnClick} text={"Button 1"} dark={true} preventDefault={false}/>*/}
        {/*<ActionButton onClick={handleOnClick} text={"Button 2"} dark={true} preventDefault={false}/>*/}
        {/*<ActionButton onClick={handleOnClick} text={"Button 3"} dark={true} preventDefault={false}/>*/}

      </div>
    </div>
  )
}


function ReportsContent(): ReactElement {

  const [sales, setSales] = useState<Sale[]>([]);
  const [details, setDetails] = useState<SaleDescription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([...Array(31).keys()].map(i => 0));
  const [total, setTotal] = useState(0);

  const {token} = useAuth();

  const setCorrectData = () => {
    sales.map(sale => {
      sale.sale_id;
      sale.sale_date = getDay(sale.sale_date);
    })

    let newData = [...Array(31).keys()].map(i => 0);
    sales.forEach(sale => {
      // @ts-ignore
      newData[sale.sale_date as number - 1] += totalSale(sale.sale_id);
    })
    setData(newData);
  }

  useEffect(() => {
    setIsLoading(true);
    getSalesByDateReport(token?.access, month, year)
      .then(res => {
        setSales(res.sales);
        setDetails(res.details);
        setTotal(res.total_sales.total);
        setCorrectData();
        setIsLoading(false);
      }).catch(err => {
        setIsLoading(false);
      }
    )
  }, [token?.access, total]);

  const totalSale = (id: number | string | undefined) => {
    let total = 0;
    details.forEach(detail => {
      if (detail.sale_id === id) {
        detail.total ? total += detail.total : total += 0;
      }
    })
    return total;
  }

  const getDay = (date: string | undefined) => {
    if (date)
      return date.split("-")[2];
  }


  const searchSales = (): void => {
    setIsLoading(true);
    getSalesByDateReport(token?.access, month, year)
      .then(res => {
        setSales(res.sales);
        setDetails(res.details);
        setTotal(res.total_sales.total);
        setCorrectData();
        setIsLoading(false);
      }).catch(err => {
        setIsLoading(false);
      }
    )
  }

  const is30 = (): boolean => {
    return month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12;
  }

  return (
    <div className={"flex flex-col w-3/5 m-auto"}>
      <div className="flex flex-row">
        <InputElement type={"text"} name={"month"} placeHolder={"Mes"} value={String(month)}
                      required={true} onChange={
          (e: ChangeEvent<HTMLInputElement>) => setMonth(parseInt(e.target.value))
        }/>
        <InputElement type={"text"} name={"year"} placeHolder={"Año"} value={String(year)}
                      onChange={
                        (e: ChangeEvent<HTMLInputElement>) => setYear(parseInt(e.target.value))
                      }/>
        <button onClick={searchSales}
                className="w-full outline bg-dark-green text-black rounded-full p-1 pl-2 pr-2 text-center">
          {isLoading ? "Cargando..." : "Buscar"}
        </button>
      </div>
      <BarChart
        title={'Sales by Date'}
        total={total}
        labels={
          is30() ? [...Array(30).keys()].map(i => `${i + 1}`) : [...Array(31).keys()].map(i => `${i + 1}`)
        }
        datasets={[{
          label: 'Sales',
          data: data,
          backgroundColor: 'rgb(180,206,85)',
        }]
        }
      />

    </div>

  )
}


function Header(): ReactElement {
  return (
    <>
      <h1 className="font-bold text-2xl">Reportes</h1>
    </>
  )
}

interface BarChartProps {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
  total: number | string | undefined;
}

function BarChart(props: BarChartProps): ReactElement {
  return (
    <div className="w-full">
      <div className={"w-full flex flex-row place-content-between mt-5"}>
        <h2>{props.title}</h2>
        <h2>Total: ${props.total}</h2>
      </div>
      <Bar
        data={{
          labels: props.labels,
          datasets: props.datasets,
        }}
      />
    </div>
  )
}

interface DateReport {
  startDate: string;
  endDate: string;
}
