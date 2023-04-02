import Table from "../components/Table";

import "../styles/list.scss";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="wrapper">
      <Header/>
      <div className="list__wrap">
        <Table />
      </div>
    </div>
  );
};

export default Home;
