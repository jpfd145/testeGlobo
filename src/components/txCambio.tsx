import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";

class TxCambioNom extends React.Component<{}, { value: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: [],
    };
  }
  componentDidMount() {
    fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados?formato=json")
      .then((response) => response.json())
      .then((resultado) => resultado.slice(-100))
      .then((resultado) => this.setState({ value: resultado }));
  }

  render() {
    return (
      <div>
        <p>Taxa de Câmbio Nominal Diária R$/US$:</p>
        <ResponsiveContainer width="99%" height={320}>
          <LineChart data={this.state.value}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis domain={[3.3, 4.3]} />
            <Tooltip />
            <Legend />
            <Line dataKey="valor" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
export default TxCambioNom;
